# NeoKanban Ecosystem Alignment Implementation Plan

> Mengadopsi prinsip TELOS (Target, Execution, Loop, Output, Standards) dan alur 3-Stage Agent Crew (Planner → Worker → Checker).

**Goal:** Menyelaraskan seluruh kapabilitas Harnes dengan ekosistem NeoKanban terbaru (UI/UX Studio, Visual Annotations Review, AI Skill Library, dan Living Context Hub).  
**Specialists Involved:** `backend-specialist`, `frontend-specialist`, `ux-ui-pro-max`, `qa-tester`  
**Target Branch:** `feat/neokanban-ecosystem-alignment`  

---

## 1. TELOS Intent Alignment

- **Current State (Kondisi Saat Ini):**
  - `kanban.ts` hanya mendukung sinkronisasi context generik dan publikasi komponen sebagai berkas context markdown/html.
  - Belum terintegrasi dengan entitas kelas satu `UiComponent` & `UiPage` di UI/UX Studio NeoKanban.
  - Tidak ada mekanisme bagi agen untuk membaca anotasi review visual (pin & bounding box) dari canvas UI Studio.
  - Belum ada integrasi untuk mengunduh skill dari NeoKanban AI Skill Library ke `.agents/skills/`.
- **Ideal State (Target Selesai):**
  - CLI `kanban.ts` memiliki perintah kelas satu untuk UI/UX Studio (`studio:components:push`, `studio:components:pull`, `studio:pages:push`, `studio:pages:pull`).
  - Tersedia perintah `ui:annotations` untuk mengambil feedback review visual langsung dari canvas UI Studio.
  - Tersedia perintah `skills:list` dan `skills:pull` untuk sinkronisasi katalog Skill NeoKanban.
  - Seluruh fungsi diuji dengan TDD di `scripts/test-kanban.ts` dan lulus 100%.
- **Falsifiable Verification Criteria (Bukti Bebas Asumsi):**
  - [ ] 100% unit tests passing di `scripts/test-kanban.ts` via `npm test`.
  - [ ] TypeScript check zero errors (`npx tsc --noEmit`).
  - [ ] Eksekusi CLI help dan mock endpoint berjalan mulus tanpa runtime exception.

---

## 2. Global Constraints & Guardrails
- **Isolasi Git:** Seluruh pengerjaan wajib di branch `feat/neokanban-ecosystem-alignment`.
- **TDD Disiplin:** Siklus Red-Green-Refactor untuk setiap unit fungsi.
- **Pre-Flight Test Gatekeeper:** Wajib lulus test suite sebelum `npx tsx scripts/kanban.ts review <cardId>`.
- **Safe Review Gate:** Larangan Auto-Done. Perpindahan ke `Done` hanya oleh Human Reviewer.

---

## 3. Tasks Breakdown

### Task 1: UI/UX Studio Components & Pages Integration

**Agent:** `backend-specialist` (Worker) | **Checker:** `qa-tester`  
**Priority:** HIGH  

**Files:**
- Modify: `scripts/kanban.ts`
- Test: `scripts/test-kanban.ts`

**Steps:**
- [ ] **Step 1: Write failing unit test for UI Studio components and pages helpers (RED)**
- [ ] **Step 2: Implement publishUiComponent, pullUiComponents, pushUiPage, pullUiPages (GREEN)**
- [ ] **Step 3: Refactor error handling, upsert logic, and clean naming (REFACTOR)**
- [ ] **Step 4: Independent Checker verification & pre-flight test**

---

### Task 2: UI/UX Studio Visual Review Annotations Feed

**Agent:** `frontend-specialist` (Worker) | **Checker:** `ux-ui-pro-max`  
**Priority:** HIGH  

**Files:**
- Modify: `scripts/kanban.ts`
- Test: `scripts/test-kanban.ts`

**Steps:**
- [ ] **Step 1: Write failing unit test for formatAnnotationItem and fetchUiAnnotations (RED)**
- [ ] **Step 2: Implement fetchUiAnnotations & CLI command ui:annotations (GREEN)**
- [ ] **Step 3: Refactor output formatting with emojis, coordinates, and status filters (REFACTOR)**
- [ ] **Step 4: Independent Checker verification & pre-flight test**

---

### Task 3: NeoKanban AI Skill Library Integration

**Agent:** `backend-specialist` (Worker) | **Checker:** `qa-tester`  
**Priority:** MEDIUM  

**Files:**
- Modify: `scripts/kanban.ts`
- Test: `scripts/test-kanban.ts`

**Steps:**
- [ ] **Step 1: Write failing unit test for listSkills and pullSkill (RED)**
- [ ] **Step 2: Implement listRemoteSkills and pullRemoteSkill into .agents/skills/ (GREEN)**
- [ ] **Step 3: Refactor disk writing, zip unpack support, and permissions (REFACTOR)**
- [ ] **Step 4: Independent Checker verification & pre-flight test**

---

### Task 4: System Integration, CLI Help & Documentation Updates

**Agent:** `agent-orchestration` (Worker) | **Checker:** `qa-tester`  
**Priority:** HIGH  

**Files:**
- Modify: `scripts/kanban.ts`
- Modify: `HARNESS.md`
- Modify: `AGENTS.md`
- Modify: `docs/HANDOFF.md`

**Steps:**
- [ ] **Step 1: Update CLI command switch & help menu in kanban.ts**
- [ ] **Step 2: Update HARNESS.md and AGENTS.md documentation**
- [ ] **Step 3: Run full ATLAS Pre-Flight test suite (100% PASS)**
- [ ] **Step 4: Record milestone handoff in docs/HANDOFF.md**
