import fs from "node:fs";
import path from "node:path";
import type { KanbanMappingLedger } from "../scripts/kanban.js";

export interface ProjectMetrics {
  totalTasks: number;
  todoCount: number;
  inProgressCount: number;
  reviewCount: number;
  doneCount: number;
  completionRate: number; // percentage 0 - 100
}

export interface ActivityItem {
  id: string;
  date: string;
  sessionName: string;
  summary: string;
  branch?: string;
  filePath: string;
}

export interface TokenSummary {
  version: string;
  colorsCount: number;
  fontSans: string;
  fontMono: string;
}

/**
 * Calculates real-time task metrics from mapping ledger
 */
export function getProjectMetrics(ledger?: KanbanMappingLedger): ProjectMetrics {
  let targetLedger = ledger;

  if (!targetLedger) {
    const mapPath = path.resolve(process.cwd(), ".kanban-map.json");
    if (fs.existsSync(mapPath)) {
      try {
        targetLedger = JSON.parse(fs.readFileSync(mapPath, "utf-8"));
      } catch {}
    }
  }

  const tasks = targetLedger?.tasks || {};
  const taskList = Object.values(tasks);
  const totalTasks = taskList.length;

  let todoCount = 0;
  let inProgressCount = 0;
  let reviewCount = 0;
  let doneCount = 0;

  for (const t of taskList) {
    const status = (t.status || "").toLowerCase().trim();
    if (status === "done" || status === "completed") {
      doneCount++;
    } else if (status === "review" || status === "in review") {
      reviewCount++;
    } else if (status === "in progress" || status === "doing") {
      inProgressCount++;
    } else {
      todoCount++;
    }
  }

  const completionRate = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  return {
    totalTasks,
    todoCount,
    inProgressCount,
    reviewCount,
    doneCount,
    completionRate,
  };
}

/**
 * Retrieves recent living handoff activities from docs/handoffs/
 */
export function getRecentActivities(maxCount = 5): ActivityItem[] {
  const handoffsDir = path.resolve(process.cwd(), "docs/handoffs");
  const activities: ActivityItem[] = [];

  if (!fs.existsSync(handoffsDir)) {
    return activities;
  }

  const dateDirs = fs
    .readdirSync(handoffsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map((d) => d.name)
    .sort()
    .reverse();

  for (const dateDir of dateDirs) {
    const fullDateDir = path.join(handoffsDir, dateDir);
    const files = fs
      .readdirSync(fullDateDir)
      .filter((f) => f.startsWith("handoff-") && f.endsWith(".md"))
      .sort()
      .reverse();

    for (const file of files) {
      const filePath = path.join(fullDateDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      // Extract session name
      const sessionMatch = content.match(/SESI:\s*([^\n\r]+)/i);
      const sessionName = sessionMatch ? sessionMatch[1].trim() : file.replace(/^handoff-|\.md$/g, "");

      // Extract branch
      const branchMatch = content.match(/\*\*Branch\s+Aktif:\*\*\s*`?([^\n\r`]+)`?/i);
      const branch = branchMatch ? branchMatch[1].trim() : undefined;

      // Extract summary
      const summaryMatch = content.match(/###\s+1\.\s+Ringkasan\s+Aktivitas[\s\S]*?\n\n([^\n\r#]+)/i);
      let summary = summaryMatch ? summaryMatch[1].trim() : "Aktivitas sesi tercatat pada sistem.";
      if (summary.startsWith(">")) summary = summary.replace(/^>\s*/, "");

      activities.push({
        id: `${dateDir}-${file}`,
        date: dateDir,
        sessionName,
        summary,
        branch,
        filePath,
      });

      if (activities.length >= maxCount) {
        return activities;
      }
    }
  }

  return activities;
}

/**
 * Retrieves summary of design tokens from docs/ui-governance/token-design.json
 */
export function getTokenOverview(): TokenSummary {
  const tokenPath = path.resolve(process.cwd(), "docs/ui-governance/token-design.json");
  if (!fs.existsSync(tokenPath)) {
    return {
      version: "1.0.0",
      colorsCount: 0,
      fontSans: "Inter, sans-serif",
      fontMono: "monospace",
    };
  }

  try {
    const content = fs.readFileSync(tokenPath, "utf-8").replace(/^\uFEFF/, "");
    const parsed = JSON.parse(content);

    const colors = parsed.colors || {};
    let colorsCount = 0;
    for (const key of Object.keys(colors)) {
      if (typeof colors[key] === "object") {
        colorsCount += Object.keys(colors[key]).length;
      } else {
        colorsCount++;
      }
    }

    return {
      version: parsed.version || "1.0.0",
      colorsCount,
      fontSans: parsed.typography?.fontFamily?.sans?.value || "Inter, sans-serif",
      fontMono: parsed.typography?.fontFamily?.mono?.value || "JetBrains Mono, monospace",
    };
  } catch {
    return {
      version: "1.0.0",
      colorsCount: 0,
      fontSans: "Inter, sans-serif",
      fontMono: "monospace",
    };
  }
}
