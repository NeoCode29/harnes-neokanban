import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("🧪 Testing Integrated Dashboard Page...");

const htmlPath = path.resolve(process.cwd(), "public/index.html");

assert.ok(fs.existsSync(htmlPath), "public/index.html must exist");
const content = fs.readFileSync(htmlPath, "utf-8");

// Basic HTML5 Structure
assert.ok(content.includes("<!DOCTYPE html>"), "Must be HTML5 document");
assert.ok(content.includes("viewport"), "Must have viewport meta tag for mobile responsiveness");
assert.ok(content.includes("<title>NeoKanban"), "Must have descriptive title");

// Navigation & Brand
assert.ok(content.includes("@kresna"), "Must display active user mention tag @kresna");
assert.ok(content.includes("NeoKanban"), "Must display project branding");

// Metric Cards Section
assert.ok(content.includes("data-metric=\"total\""), "Must contain Total Tasks metric card");
assert.ok(content.includes("data-metric=\"in-progress\""), "Must contain In Progress metric card");
assert.ok(content.includes("data-metric=\"review\""), "Must contain Review metric card");
assert.ok(content.includes("data-metric=\"done\""), "Must contain Done metric card");

// Main Sections
assert.ok(content.includes("data-section=\"timeline\""), "Must contain timeline section");
assert.ok(content.includes("data-section=\"kanban-preview\""), "Must contain kanban preview section");

// Theme Support
assert.ok(content.includes("id=\"theme-toggle\""), "Must contain theme toggle button");

console.log("✅ All dashboard page integration tests passed!");
