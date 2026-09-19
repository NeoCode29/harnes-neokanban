# Antigravity Agent Configuration — Lean NeoKanban Harness

Dokumen ini mendefinisikan aturan operasional, protokol triage, dan inventaris skill terpadu untuk asisten AI Antigravity.

---

## 1. Aturan Emas & Protokol Sesi (Golden Rules)

1. **BACA `docs/HANDOFF.md` DI AWAL SETIAP SESI**:
   - Langkah pertama Antigravity saat menerima instruksi baru adalah membaca `docs/HANDOFF.md` untuk memulihkan state, mengetahui branch aktif, dan langkah lanjutan tanpa bertanya ulang.
2. **INVOKE SKILL TERKAIT SEBELUM BERTINDAK (`using-superpowers`)**:
   - Selalu tentukan dan baca instruksi skill serta spesialis yang relevan sebelum menulis kode atau memberikan analisis teknis.
3. **LARANGAN AUTO-DONE (NEVER AUTO-DONE)**:
   - Subagent **DILARANG KERAS** memindahkan kartu langsung ke kolom `Done`.
   - Kartu yang seluruh langkah TDD-nya selesai wajib dipindahkan ke kolom `Review` dengan laporan verifikasi terstruktur di komentar.
4. **SPESIALISASI DOMAIN**:
   - Setiap task didelegasikan kepada peran spesialis yang tepat sesuai domain pekerjaannya.
5. **ISOLASI GIT & TDD**:
   - Tidak ada koding langsung di branch utama (`main`/`master`). Selalu buat branch fitur atau worktree baru.
   - Wajib menerapkan siklus Red-Green-Refactor untuk setiap implementasi logic.
6. **PERBARUI `docs/HANDOFF.md` SETIAP SELESAI AKTIVITAS**:
   - Setiap kali menyelesaikan task kanban, implementasi fitur, perbaikan bug, atau sebelum sesi berakhir, Antigravity **WAJIB** memperbarui `docs/HANDOFF.md`.

---

## 2. Inventaris Lengkap Skill Terpadu (12 Skills)

### A. Perencanaan & Spesifikasi
- **`superpowers:using-superpowers`**: Triage awal dan penentuan skill/spesialis yang tepat (termasuk membaca dan memperbarui handoff).
- **`superpowers:brainstorming`**: Klarifikasi scope, perancangan arsitektur, dan persetujuan spec di `docs/specs/`.
- **`superpowers:writing-plans`**: Pemecahan task bite-sized (2–5 menit), TDD checklist, dan penugasan tag `**Agent:**`.

### B. Eksekusi & Orkestrasi
- **`superpowers:subagent-driven-development`**: Pendelegasian task dengan subagent berkonteks bersih, update checklist real-time, dan two-stage review.
- **`superpowers:dispatching-parallel-agents`**: Eksekusi 2+ task independen secara paralel tanpa konflik file/state.
- **`superpowers:using-git-worktrees`**: Isolasi ruang kerja dengan git worktree atau feature branch.
- **`superpowers:test-driven-development`**: Penegakan disiplin RED-GREEN-REFACTOR.
- **`superpowers:kanban-execution`**: Interaksi dengan NeoKanban MCP & CLI sync (`publish`, `start`, `check`, `review`).

### C. Review & Penyelesaian
- **`superpowers:verification-before-completion`**: Verifikasi build dan test suite 100% lulus sebelum mengajukan review.
- **`superpowers:code-review-protocol`**: Penilaian kualitas kode, objektivitas teknis, dan verifikasi feedback.
- **`superpowers:finishing-a-development-branch`**: Verifikasi menyeluruh whole-branch, persetujuan merge dari owner, penutupan kartu ke `Done`, branch cleanup, dan update handoff.

### D. Investigasi & Debugging
- **`superpowers:systematic-debugging`**: 4-fase investigasi akar masalah tanpa menebak-nebak (*no guesswork*).

---

## 3. Daftar Spesialis Domain (`.agents/specialists/`)

1. **`ux-ui-pro-max`**: Desain antarmuka premium, WCAG AA Accessibility, sistem tipografi, palet semantik, animasi micro-interaction 150–300ms, shadcn/ui.
2. **`frontend-specialist`**: Komponen React/Next.js, Tailwind CSS, component state, formulir interaktif.
3. **`backend-specialist`**: REST API, Node.js (Express/Fastify), Python (FastAPI), validasi skema, auth/middleware.
4. **`database-specialist`**: PostgreSQL, Prisma ORM, pemodelan skema relasional, optimasi query, migrasi aman.
5. **`debugger-specialist`**: Error tracing, analisis stack trace, reproduksi bug minimal, isolasi akar masalah.
6. **`qa-tester`**: Test suites, unit test, integration test, boundary conditions, edge cases.

---

## 4. Aturan Standar (`.agents/rules/`)
- **`handoff-rules.md`**: Protokol wajib membaca & memperbarui `docs/HANDOFF.md`.
- **`kanban-workflow-rules.md`**: Aturan transisi kolom, larangan auto-done, dan format laporan verifikasi.
- **`coding-standards.md`**: Prinsip kode sederhana, minim komentar, dan security-first.
- **`frontend-styling-rules.md`**: Desain berbasis token, glassmorphism, responsive resilience, dan aksesibilitas.
