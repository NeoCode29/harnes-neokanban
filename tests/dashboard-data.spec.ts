import assert from "node:assert";
import { getProjectMetrics, getRecentActivities, getTokenOverview } from "../src/dashboard-data.js";

console.log("🧪 Testing getProjectMetrics()...");

const sampleLedger = {
  boardId: "board-abc",
  boardTitle: "Test Project Board",
  planFile: "docs/plans/sample-plan.md",
  syncedAt: new Date().toISOString(),
  tasks: {
    "task-1": { cardId: "c1", title: "Task 1", status: "Done" },
    "task-2": { cardId: "c2", title: "Task 2", status: "Review" },
    "task-3": { cardId: "c3", title: "Task 3", status: "In Progress" },
    "task-4": { cardId: "c4", title: "Task 4", status: "To Do" },
  },
};

const metrics = getProjectMetrics(sampleLedger as any);
assert.strictEqual(metrics.totalTasks, 4);
assert.strictEqual(metrics.doneCount, 1);
assert.strictEqual(metrics.reviewCount, 1);
assert.strictEqual(metrics.inProgressCount, 1);
assert.strictEqual(metrics.todoCount, 1);
assert.strictEqual(metrics.completionRate, 25);

console.log("🧪 Testing empty ledger handling in getProjectMetrics()...");
const emptyMetrics = getProjectMetrics({ boardId: "b", boardTitle: "T", planFile: "p", syncedAt: "", tasks: {} });
assert.strictEqual(emptyMetrics.totalTasks, 0);
assert.strictEqual(emptyMetrics.completionRate, 0);

console.log("🧪 Testing getRecentActivities()...");
const activities = getRecentActivities(5);
assert.ok(Array.isArray(activities), "Activities should return an array");
assert.ok(activities.length > 0, "Should find at least 1 recent handoff activity from today");
const first = activities[0];
assert.ok(first.sessionName, "Activity should have a sessionName");
assert.ok(first.date, "Activity should have a date string");
assert.ok(first.summary, "Activity should have a summary");

console.log("🧪 Testing getTokenOverview()...");
const tokenOverview = getTokenOverview();
assert.ok(tokenOverview.version, "Token overview should include version");
assert.ok(tokenOverview.colorsCount > 0, "Token overview should count colors");
assert.ok(tokenOverview.fontSans.includes("Inter"), "Should recognize sans font family");

console.log("✅ All dashboard data tests passed!");
