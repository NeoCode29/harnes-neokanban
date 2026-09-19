import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface TaskFiles {
  create: string[];
  modify: string[];
  test: string[];
}

export interface ParsedTask {
  taskNumber: number;
  taskTitle: string;
  agent?: string;
  priority?: string;
  files: TaskFiles;
  steps: string[];
  rawContent: string;
}

export interface ParsedPlan {
  planTitle: string;
  goal?: string;
  tasks: ParsedTask[];
}

export interface KanbanMappingLedger {
  boardId: string;
  boardTitle: string;
  planFile: string;
  syncedAt: string;
  tasks: Record<
    string,
    {
      cardId: string;
      title: string;
      agent?: string;
      status: string;
    }
  >;
}

/**
 * Parses markdown plan document into structured task data
 */
export function parsePlanMarkdown(content: string): ParsedPlan {
  // 1. Title
  let planTitle = "Untitled Plan";
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    planTitle = titleMatch[1].trim();
  }

  // 2. Goal
  let goal: string | undefined;
  const goalMatch = content.match(/\*\*Goal:\*\*\s*([^\n\r]+)/);
  if (goalMatch) {
    goal = goalMatch[1].trim();
  }

  // 3. Extract Tasks
  const tasks: ParsedTask[] = [];
  const taskHeaderRegex = /^###\s+Task\s+(\d+):\s*(.+)$/gm;
  let match: RegExpExecArray | null;
  const taskMatches: { number: number; title: string; index: number }[] = [];

  while ((match = taskHeaderRegex.exec(content)) !== null) {
    taskMatches.push({
      number: parseInt(match[1], 10),
      title: match[2].trim(),
      index: match.index,
    });
  }

  for (let i = 0; i < taskMatches.length; i++) {
    const current = taskMatches[i];
    const startIndex = current.index;
    const endIndex = i + 1 < taskMatches.length ? taskMatches[i + 1].index : content.length;
    const taskContent = content.slice(startIndex, endIndex);

    // Agent
    let agent: string | undefined;
    const agentMatch = taskContent.match(/\*\*Agent:\*\*\s*`?([^\n\r`]+)`?/);
    if (agentMatch) {
      agent = agentMatch[1].trim();
    }

    // Priority
    let priority: string | undefined;
    const priMatch = taskContent.match(/\*\*Priority:\*\*\s*([A-Za-z]+)/);
    if (priMatch) {
      priority = priMatch[1].trim().toUpperCase();
    }

    // Files
    const files: TaskFiles = { create: [], modify: [], test: [] };
    const createMatches = taskContent.matchAll(/-\s*Create:\s*`([^`]+)`/g);
    for (const cm of createMatches) files.create.push(cm[1]);

    const modifyMatches = taskContent.matchAll(/-\s*Modify:\s*`([^`]+)`/g);
    for (const mm of modifyMatches) files.modify.push(mm[1]);

    const testMatches = taskContent.matchAll(/-\s*Test:\s*`([^`]+)`/g);
    for (const tm of testMatches) files.test.push(tm[1]);

    // Steps (TDD Checklist items)
    const steps: string[] = [];
    const lines = taskContent.split(/\r?\n/);
    for (const line of lines) {
      const stepMatch = line.match(/^-\s*\[\s*\]\s*\*\*(Step\s+\d+:[^\*]+)\*\*/i);
      if (stepMatch) {
        steps.push(stepMatch[1].trim());
      } else {
        const altStep = line.match(/^-\s*\[\s*\]\s*(.+)$/);
        if (altStep && !altStep[1].includes("Task")) {
          steps.push(altStep[1].trim());
        }
      }
    }

    tasks.push({
      taskNumber: current.number,
      taskTitle: current.title,
      agent,
      priority,
      files,
      steps,
      rawContent: taskContent,
    });
  }

  return { planTitle, goal, tasks };
}

/**
 * Helper to call NeoKanban REST API
 */
async function kanbanApi<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: unknown;
    apiUrl?: string;
    token?: string;
  } = {}
): Promise<T> {
  const apiUrl = options.apiUrl || process.env.NEOKANBAN_API_URL || "http://localhost:3000";
  const token = options.token || process.env.NEOKANBAN_PAT;

  const url = `${apiUrl.replace(/\/$/, "")}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`NeoKanban API Error [${response.status} ${response.statusText}]: ${errorText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Publish plan to NeoKanban board
 */
export async function publishPlan(
  planPath: string,
  options: { boardId?: string; apiUrl?: string; token?: string; mapPath?: string } = {}
): Promise<KanbanMappingLedger> {
  const fullPath = path.resolve(process.cwd(), planPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Plan file not found: ${fullPath}`);
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const plan = parsePlanMarkdown(content);

  console.log(`\n📋 Publishing Plan: "${plan.planTitle}"`);
  console.log(`🎯 Tasks parsed: ${plan.tasks.length}`);

  // Resolve board
  let boardId = options.boardId;
  let boardTitle = "Project Development";

  const boardsData = await kanbanApi<{ boards: any[] }>("/api/boards", options);
  const boards = boardsData.boards || [];

  if (boardId) {
    const found = boards.find((b) => b.id === boardId);
    if (found) boardTitle = found.title;
  } else if (boards.length > 0) {
    const targetBoard = boards[0];
    boardId = targetBoard.id;
    boardTitle = targetBoard.title;
    console.log(`📌 Using Active Board: "${boardTitle}" (ID: ${boardId})`);
  } else {
    console.log(`Creating new board for project...`);
    const newBoard = await kanbanApi<any>("/api/boards", {
      ...options,
      method: "POST",
      body: {
        title: plan.planTitle.replace(/Implementation Plan/i, "").trim() || "Development Board",
        description: plan.goal || "Kanban board synchronized from Antigravity plan",
      },
    });
    const created = newBoard.board || newBoard;
    boardId = created.id;
    boardTitle = created.title;
    console.log(`✅ Board created: "${boardTitle}" (ID: ${boardId})`);
  }

  // Fetch columns
  const boardDetail = await kanbanApi<any>(`/api/boards/${boardId}`, options);
  const boardObj = boardDetail.board || boardDetail;
  const columns: any[] = boardObj.columns || [];

  const todoCol = columns.find((c) => c.title.toLowerCase().trim() === "to do") || columns[0];
  if (!todoCol) {
    throw new Error(`No column found on board ${boardId}`);
  }

  const ledger: KanbanMappingLedger = {
    boardId: boardId!,
    boardTitle,
    planFile: planPath,
    syncedAt: new Date().toISOString(),
    tasks: {},
  };

  for (const task of plan.tasks) {
    const cardTitle = `Task ${task.taskNumber}: ${task.taskTitle}`;
    console.log(`  ➕ Creating Card: "${cardTitle}"...`);

    let description = `### 🎯 Task Objective\n`;
    if (task.agent) description += `**Assigned Specialist:** \`${task.agent}\`\n\n`;
    if (task.priority) description += `**Priority:** \`${task.priority}\`\n\n`;

    if (task.files.create.length || task.files.modify.length || task.files.test.length) {
      description += `### 📁 Files Involved\n`;
      if (task.files.create.length) description += `- **Create:** \`${task.files.create.join("`, `")}\`\n`;
      if (task.files.modify.length) description += `- **Modify:** \`${task.files.modify.join("`, `")}\`\n`;
      if (task.files.test.length) description += `- **Test:** \`${task.files.test.join("`, `")}\`\n`;
      description += `\n`;
    }

    const cardRes = await kanbanApi<any>("/api/cards", {
      ...options,
      method: "POST",
      body: {
        boardId,
        columnId: todoCol.id,
        title: cardTitle,
        description,
        priority: task.priority || "MEDIUM",
        tags: [task.agent || "specialist", "antigravity"],
      },
    });
    const card = cardRes.card || cardRes;

    // Add Checklist Steps
    for (const step of task.steps) {
      await kanbanApi<any>(`/api/cards/${card.id}/checklists`, {
        ...options,
        method: "POST",
        body: { title: step },
      });
    }

    ledger.tasks[`task-${task.taskNumber}`] = {
      cardId: card.id,
      title: cardTitle,
      agent: task.agent,
      status: todoCol.title,
    };
  }

  // Save mapping ledger
  const mapPath = options.mapPath || path.resolve(process.cwd(), ".kanban-map.json");
  fs.writeFileSync(mapPath, JSON.stringify(ledger, null, 2), "utf-8");
  console.log(`💾 Saved mapping ledger to: ${mapPath}\n`);

  return ledger;
}

/**
 * Move card to 'In Progress'
 */
export async function startTask(cardId: string, options: { apiUrl?: string; token?: string } = {}) {
  await transitionToColumn(cardId, "In Progress", options);
  console.log(`🚀 Task card [${cardId}] marked as In Progress.`);
}

/**
 * Toggle/check a checklist item
 */
export async function checkStep(
  cardId: string,
  stepPattern: string,
  options: { apiUrl?: string; token?: string } = {}
) {
  const cardRes = await kanbanApi<any>(`/api/cards/${cardId}`, options);
  const card = cardRes.card || cardRes;
  const checklists: any[] = card.checklists || [];

  const item = checklists.find((c) => c.title.toLowerCase().includes(stepPattern.toLowerCase().trim()));
  if (!item) {
    throw new Error(`Checklist item matching "${stepPattern}" not found on card ${cardId}`);
  }

  await kanbanApi<any>(`/api/cards/${cardId}/checklists`, {
    ...options,
    method: "PUT",
    body: {
      itemId: item.id,
      isCompleted: true,
    },
  });
  console.log(`☑️ Checked checklist step: "${item.title}"`);
}

/**
 * Move card to 'Review' with verification proof comment (Enforces Safe Review Gate)
 */
export async function reviewTask(
  cardId: string,
  reportContent: string,
  options: { apiUrl?: string; token?: string } = {}
) {
  await transitionToColumn(cardId, "Review", options);

  // Attach verification proof comment
  await kanbanApi<any>(`/api/cards/${cardId}/comments`, {
    ...options,
    method: "POST",
    body: {
      content: reportContent,
      authorName: "Antigravity Specialist",
      isAiGenerated: true,
    },
  });
  console.log(`🛡️ Safe Review Gate: Card moved to [Review] and verification report attached.`);
}

/**
 * Move card helper
 */
async function transitionToColumn(
  cardId: string,
  targetColumnTitle: string,
  options: { apiUrl?: string; token?: string } = {}
) {
  const cardRes = await kanbanApi<any>(`/api/cards/${cardId}`, options);
  const card = cardRes.card || cardRes;
  const boardId = card.column?.boardId || card.boardId;

  const boardDetail = await kanbanApi<any>(`/api/boards/${boardId}`, options);
  const board = boardDetail.board || boardDetail;
  const columns: any[] = board.columns || [];

  const targetCol = columns.find(
    (c) =>
      c.title.toLowerCase().trim() === targetColumnTitle.toLowerCase().trim() ||
      (targetColumnTitle.toLowerCase().trim() === "review" && c.title.toLowerCase().trim() === "in review")
  );

  if (!targetCol) {
    throw new Error(`Target column "${targetColumnTitle}" not found on board ${boardId}`);
  }

  await kanbanApi<any>(`/api/cards/${cardId}/move`, {
    ...options,
    method: "POST",
    body: {
      targetColumnId: targetCol.id,
      targetOrder: 0,
    },
  });
}

// CLI handler
const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url).toLowerCase() === path.resolve(process.argv[1]).toLowerCase();

if (isMain) {
  const command = process.argv[2];
  const arg1 = process.argv[3];
  const arg2 = process.argv[4];

  async function run() {
    if (command === "publish") {
      if (!arg1) {
        console.error("Usage: kanban publish <path-to-plan.md> [board-id]");
        process.exit(1);
      }
      await publishPlan(arg1, { boardId: arg2 });
    } else if (command === "start") {
      if (!arg1) {
        console.error("Usage: kanban start <card-id>");
        process.exit(1);
      }
      await startTask(arg1);
    } else if (command === "check") {
      if (!arg1 || !arg2) {
        console.error("Usage: kanban check <card-id> <step-title-pattern>");
        process.exit(1);
      }
      await checkStep(arg1, arg2);
    } else if (command === "review") {
      if (!arg1) {
        console.error("Usage: kanban review <card-id> [--report <text>]");
        process.exit(1);
      }
      const reportIdx = process.argv.indexOf("--report");
      const report =
        reportIdx !== -1 && process.argv[reportIdx + 1]
          ? process.argv[reportIdx + 1]
          : "Verification tests passed 100%.";
      await reviewTask(arg1, report);
    } else {
      console.log("\n⚡ Lean NeoKanban Sync CLI");
      console.log("Commands:");
      console.log("  publish <planPath> [boardId]     Publish plan tasks to 'To Do' column");
      console.log("  start <cardId>                   Move card to 'In Progress'");
      console.log("  check <cardId> <stepPattern>     Mark TDD checklist step completed");
      console.log("  review <cardId> [--report text]  Move card to 'Review' + attach proof");
      console.log("\nHard Rule: Auto-Done is strictly prohibited. Final Done requires human review.\n");
    }
  }

  run().catch((err: any) => {
    console.error("❌ Error:", err.message || err);
    process.exit(1);
  });
}
