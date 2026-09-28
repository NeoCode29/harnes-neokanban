import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("🧪 Testing UI Template Components...");

const componentsDir = path.resolve(process.cwd(), "docs/ui-governance/components");

const metricCardPath = path.join(componentsDir, "template-metric-card.html");
const timelinePath = path.join(componentsDir, "template-activity-timeline.html");
const boardPreviewPath = path.join(componentsDir, "template-kanban-board-preview.html");

// 1. Metric Card Template
assert.ok(fs.existsSync(metricCardPath), "template-metric-card.html must exist");
const metricCardContent = fs.readFileSync(metricCardPath, "utf-8");
assert.ok(metricCardContent.includes("data-component=\"metric-card\""), "Should have data-component attribute");
assert.ok(metricCardContent.includes("aria-label"), "Should include aria-label for accessibility (WCAG AA)");
assert.ok(metricCardContent.includes("metric-value"), "Should have a placeholder or container for metric value");

// 2. Activity Timeline Template
assert.ok(fs.existsSync(timelinePath), "template-activity-timeline.html must exist");
const timelineContent = fs.readFileSync(timelinePath, "utf-8");
assert.ok(timelineContent.includes("data-component=\"activity-timeline\""), "Should have data-component attribute");
assert.ok(timelineContent.includes("<time"), "Should use semantic <time> tag for dates");
assert.ok(timelineContent.includes("timeline-item"), "Should have timeline-item class or structure");

// 3. Kanban Board Preview Template
assert.ok(fs.existsSync(boardPreviewPath), "template-kanban-board-preview.html must exist");
const boardContent = fs.readFileSync(boardPreviewPath, "utf-8");
assert.ok(boardContent.includes("data-component=\"kanban-board-preview\""), "Should have data-component attribute");
assert.ok(boardContent.includes("To Do") || boardContent.includes("column-todo"), "Should have To Do column");
assert.ok(boardContent.includes("Review") || boardContent.includes("column-review"), "Should have Review column");

console.log("✅ All UI component template tests passed!");
