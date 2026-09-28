# Antigravity Agent Configuration — Lean NeoKanban Harness

Dokumen ini mendefinisikan aturan operasional, protokol triage, dan inventaris skill terpadu untuk asisten AI Antigravity.

---

## 1. Aturan Emas & Kebiasaan Utama (Golden Rules & Primary Habits)

1. **BACA `docs/HANDOFF.md` DI AWAL SETIAP SESI**:
   - Langkah pertama Antigravity saat menerima instruksi baru adalah membaca `docs/HANDOFF.md` untuk memulihkan state, mengetahui branch aktif, dan langkah lanjutan tanpa bertanya ulang.
2. **PAHAMI DULU & BERTANYA INTERAKTIF PADA SETIAP REQUEST (`ask_question`)**:
   - **Deep Pre-Understanding**: Wajib memahami topik/fitur yang diminta secara mendalam terlebih dahulu (telusuri codebase, skema, dan alur sistem) sebelum mengusulkan solusi.
   - **Zero Information Gaps**: Gunakan tool interaktif `ask_question` dengan opsi-opsi terstruktur untuk mengklarifikasi scope, UX flow, validasi data, dan edge cases sehingga tidak ada celah asumsi.
3. **KONSISTENSI UI VIA TOKEN & KOMPONEN REGISTRY**:
   - Pada task frontend, wajib memeriksa `token-design.json` dan `template-[nama].html` di NeoKanban sebelum membangun UI (`ui-consistency-governance`).
4. **INVOKE SKILL TERKAIT SEBELUM BERTINDAK (`using-superpowers`)**:
   - Selalu tentukan dan baca instruksi skill serta spesialis yang relevan sebelum menulis kode atau memberikan analisis teknis.
5. **LARANGAN AUTO-DONE (NEVER AUTO-DONE)**:
   - Subagent **DILARANG KERAS** memindahkan kartu langsung ke kolom `Done`.
   - Kartu yang seluruh langkah TDD-nya selesai wajib dipindahkan ke kolom `Review` dengan laporan verifikasi terstruktur di komentar.
6. **SPESIALISASI DOMAIN**:
   - Setiap task didelegasikan kepada peran spesialis yang tepat sesuai domain pekerjaannya.
7. **ISOLASI GIT & TDD**:
   - Tidak ada koding langsung di branch utama (`main`/`master`). Selalu buat branch fitur atau worktree baru.
   - Wajib menerapkan siklus Red-Green-Refactor untuk setiap implementasi logic.
8. **PERBARUI HANDOFF SECARA BERKALA PADA SETIAP AKTIVITAS**:
   - Setiap kali terjadi aktivitas (`publish`, `start`, `review`, atau penutupan sesi), perbarui berkas lokal per hari di `docs/handoffs/YYYY-MM-DD/handoff-<nama>.md`, `docs/HANDOFF.md`, dan Living Context di NeoKanban.

---

## 2. Inventaris Lengkap Skill Terpadu (14 Skills)

### A. Perencanaan & Spesifikasi
- **`superpowers:project-setup`**: Inisialisasi awal koneksi NeoKanban, healthcheck/ping test, mapping role & username mention, inisialisasi context awal, dan pembuatan `.neokanban.json`.
- **`superpowers:using-superpowers`**: Triage awal dan penentuan skill/spesialis yang tepat (termasuk membaca dan memperbarui handoff).
- **`superpowers:brainstorming`**: Eksplorasi kebutuhan, pra-pemahaman sistem, klarifikasi interaktif, dan persetujuan spec di `docs/specs/`.
- **`superpowers:writing-plans`**: Pemecahan task bite-sized (2–5 menit), TDD checklist, dan penugasan tag `**Agent:**`.

### B. Tata Kelola Antarmuka (UI Governance)
- **`superpowers:ui-consistency-governance`**: Pengecekan token design dan registry komponen di NeoKanban sebelum membangun UI untuk mencegah inkonsistensi.

### C. Eksekusi & Orkestrasi
- **`superpowers:subagent-driven-development`**: Pendelegasian task dengan subagent berkonteks bersih, update checklist real-time, dan two-stage review.
- **`superpowers:dispatching-parallel-agents`**: Eksekusi 2+ task independen secara paralel tanpa konflik file/state.
- **`superpowers:using-git-worktrees`**: Isolasi ruang kerja dengan git worktree atau feature branch.
- **`superpowers:test-driven-development`**: Penegakan disiplin RED-GREEN-REFACTOR.
- **`superpowers:kanban-execution`**: Interaksi dengan NeoKanban MCP & CLI sync (`publish`, `start`, `check`, `review`, `handoff`).

### D. Review & Penyelesaian
- **`superpowers:verification-before-completion`**: Verifikasi build dan test suite 100% lulus sebelum mengajukan review.
- **`superpowers:code-review-protocol`**: Penilaian kualitas kode, objektivitas teknis, dan verifikasi feedback.
- **`superpowers:finishing-a-development-branch`**: Verifikasi menyeluruh whole-branch, persetujuan merge dari owner, penutupan kartu ke `Done`, branch cleanup, dan update handoff.

### E. Investigasi & Debugging
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
- **`ui-consistency-rules.md`**: Protokol wajib token design dan pengecekan komponen NeoKanban.
- **`clarification-rules.md`**: Kebiasaan wajib pemahaman mendalam & pertanyaan interaktif (`ask_question`).
- **`handoff-rules.md`**: Protokol wajib membaca & memperbarui handoff berkala per tanggal dan ke NeoKanban.
- **`kanban-workflow-rules.md`**: Aturan transisi kolom, larangan auto-done, dan format laporan verifikasi.
- **`coding-standards.md`**: Prinsip kode sederhana, minim komentar, dan security-first.
- **`frontend-styling-rules.md`**: Desain berbasis token, glassmorphism, responsive resilience, dan aksesibilitas.
