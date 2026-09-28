import assert from "node:assert";
import { parsePlanMarkdown, formatHandoffSession } from "./kanban.js";

const sampleMarkdown = `
# Authentication & Session Module Implementation Plan

**Goal:** Implement secure session handling and JWT validation.
**Specialists Involved:** backend-specialist, qa-tester

---

### Task 1: Setup JWT Token Service

**Agent:** backend-specialist
**Priority:** HIGH

**Files:**
- Create: \`src/services/jwt.service.ts\`
- Modify: \`src/config/app.ts\`
- Test: \`tests/services/jwt.service.spec.ts\`

**Steps:**
- [ ] **Step 1: Write failing unit test for token issuance**
- [ ] **Step 2: Implement sign and verify functions**
- [ ] **Step 3: Refactor token expiration handling**
- [ ] **Step 4: Verify test suite passes**

---

### Task 2: Implement Protected Route Middleware

**Agent:** backend-specialist
**Priority:** MEDIUM

**Files:**
- Create: \`src/middleware/auth.middleware.ts\`
- Test: \`tests/middleware/auth.middleware.spec.ts\`

**Steps:**
- [ ] **Step 1: Write test for 401 unauthorized header**
- [ ] **Step 2: Implement token extraction logic**
- [ ] **Step 3: Verify middleware integration**
`;

console.log("🧪 Testing parsePlanMarkdown()...");

const parsed = parsePlanMarkdown(sampleMarkdown);

assert.strictEqual(parsed.planTitle, "Authentication & Session Module Implementation Plan");
assert.strictEqual(parsed.goal, "Implement secure session handling and JWT validation.");
assert.strictEqual(parsed.tasks.length, 2, "Should parse exactly 2 tasks");

// Verify Task 1
const task1 = parsed.tasks[0];
assert.strictEqual(task1.taskNumber, 1);
assert.strictEqual(task1.taskTitle, "Setup JWT Token Service");
assert.strictEqual(task1.agent, "backend-specialist");
assert.strictEqual(task1.priority, "HIGH");
assert.deepStrictEqual(task1.files.create, ["src/services/jwt.service.ts"]);
assert.deepStrictEqual(task1.files.modify, ["src/config/app.ts"]);
assert.deepStrictEqual(task1.files.test, ["tests/services/jwt.service.spec.ts"]);
assert.strictEqual(task1.steps.length, 4);
assert.ok(task1.steps[0].includes("Step 1: Write failing unit test"));

// Verify Task 2
const task2 = parsed.tasks[1];
assert.strictEqual(task2.taskNumber, 2);
assert.strictEqual(task2.taskTitle, "Implement Protected Route Middleware");
assert.strictEqual(task2.priority, "MEDIUM");
assert.strictEqual(task2.steps.length, 3);

console.log("🧪 Testing formatHandoffSession()...");
const formattedHandoff = formatHandoffSession({
  sessionName: "setup-auth-module",
  summary: "Berhasil mengimplementasikan JWT token service dan middleware auth.",
  branch: "feat/auth-module",
  tasksStatus: {
    todo: ["Task 3"],
    inProgress: ["Task 2"],
    review: ["Task 1"],
    done: ["Task 0"],
  },
  testsStatus: "8/8 unit tests pass (100%)",
  nextSteps: ["Lanjutkan pengujian integration test route.", "Submit PR untuk review."],
});

assert.ok(formattedHandoff.includes("SESI:"), "Should include session header");
assert.ok(formattedHandoff.includes("setup-auth-module"), "Should include session name");
assert.ok(formattedHandoff.includes("feat/auth-module"), "Should include branch name");
assert.ok(formattedHandoff.includes("═════"), "Should include clear visual session dividers");
assert.ok(formattedHandoff.includes("8/8 unit tests pass"), "Should include test status");

console.log("✅ All test assertions passed successfully!");
