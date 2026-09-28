# Lean Agentic Harness (Antigravity + NeoKanban)

Selamat datang di **Lean Agentic Harness**. Sistem ini dirancang dari nol untuk asisten AI **Antigravity**, memberikan alur kerja pengembangan perangkat lunak yang berdisiplin tinggi, aman, dan efisien dengan integrasi **NeoKanban**, didukung **Superpowers Pipeline Lengkap**, spesialis desain **UX/UI Pro Max**, mekanisme kontinuitas sesi **Living Handoff Harian**, kebiasaan utama **Deep Pre-Understanding & Interactive Clarification**, serta **Sistem Pertahanan Konsistensi UI 3 Lapis**.

---

## 1. Filosofi Inti

1. **Konsistensi UI 3 Lapis & Strict Shared Primitives**:
   - Mencegah inkonsistensi visual saat multi-agent atau developer membangun antarmuka web.
   - **Lapis 1 (Registry Baku):** Wajib menggunakan shared primitives (`<PageHeader>`, `<FilterBar>`, `<DataTable>`, `<StatsCard>`, dll) dari folder terpusat (`components/ui/`). Dilarang membuat container/header ad-hoc dari nol.
   - **Lapis 2 (Gatekeeper Audit):** Setiap kartu tugas frontend wajib diaudit oleh `ux-ui-pro-max` dengan stempel `### 🎨 UI/UX Consistency Stamp: APPROVED` sebelum boleh masuk ke kolom `Review`.
   - **Lapis 3 (Living Design System):** Acuan warna, tipografi, dan pola kanonik tersimpan di berkas context NeoKanban (`design-system.md`).
2. **Pahami Dahulu & Bertanya Interaktif (Zero Information Gaps)**:
   - Setiap kali pengguna meminta suatu topik atau fitur, asisten wajib **memahami arsitektur dan kode secara mendalam terlebih dahulu**.
   - Sebelum menyusun solusi, asisten wajib mengajukan pertanyaan interaktif terstruktur (`ask_question`) untuk menutup seluruh celah asumsi, memastikan scope, validasi, dan edge cases disepakati bersama.
3. **Zero Heavy RAG**: Tidak ada database vektor lokal (ChromaDB), script embedding, atau index chunks yang memakan memori. Pemahaman sistem mengandalkan pembacaan langsung codebase dan **Living Context** pada NeoKanban (`architecture.md`, `guidelines.md`, `design-system.md`).
4. **Living Session Handoff Harian (`docs/handoffs/YYYY-MM-DD/`)**:
   - **Start of Session**: Agen otomatis membaca `docs/HANDOFF.md` untuk mengetahui konteks terakhir, branch aktif, dan task yang siap dieksekusi tanpa perlu bertanya ulang ke pengguna.
   - **Continuous Periodic Sync**: Setiap aktivitas penting (`publish`, `start`, `review`, atau penutupan sesi) otomatis memperbarui berkas harian lokal dan Living Context di papan NeoKanban.
5. **Superpowers Discipline**: Mengadopsi prinsip proses Superpowers (triage kesadaran awal, spesifikasi terverifikasi, task bite-sized, isolasi worktree, review 2-tahap, TDD, hingga whole-branch verification).
6. **NeoKanban sebagai Living Source of Truth**:
   - Papan proyek mencatat status pekerjaan secara visual.
   - Langkah TDD dipetakan menjadi subtask checklist interaktif yang dicentang secara real-time.
7. **Safe Review Gate (Larangan Auto-Done)**: Agen dilarang keras memindahkan kartu langsung ke `Done`. Setiap penyelesaian tugas wajib diverifikasi manusia setelah melewati kolom `Review` dengan laporan verifikasi terstruktur.
8. **Spesialisasi Domain Tingkat Lanjut**: Dilengkapi peran spesialis komprehensif, termasuk **UX/UI Pro Max** sebagai desainer dan auditor visual.

---

## 2. Tabel Domain & Peran Spesialis

Setiap task di dalam rencana kerja wajib ditugaskan ke salah satu spesialis berikut:

| Peran Spesialis | Lingkup Keahlian | File Definisi |
| :--- | :--- | :--- |
| `ux-ui-pro-max` | Gatekeeper audit visual, WCAG AA Accessibility, sistem tipografi, palet semantik, animasi micro-interaction 150–300ms, shadcn/ui | `.agents/specialists/ux-ui-pro-max.md` |
| `frontend-specialist` | React, Next.js, Tailwind CSS, Component State, Integrasi Form | `.agents/specialists/frontend-specialist.md` |
| `backend-specialist` | REST API, Node.js (Express/Fastify), Python (FastAPI), Routing, Auth | `.agents/specialists/backend-specialist.md` |
| `database-specialist`| PostgreSQL, Prisma ORM, SQLite, Migration, Query Optimization, RLS | `.agents/specialists/database-specialist.md` |
| `debugger-specialist`| Error Tracing, Stack Analysis, Root-Cause Diagnosis, Bug Reproduksi | `.agents/specialists/debugger-specialist.md` |
| `qa-tester`          | Unit Testing, Integration Testing, Edge Case, Test Suite Hardening | `.agents/specialists/qa-tester.md` |

---

## 3. Siklus Hidup Permintaan & Pengembangan (Request & Development Lifecycle)

```
[User Request] 
      │
      ▼
[Langkah 0: Deep Pre-Understanding] ──► Telusuri kode & arsitektur hingga paham 100%
      │
      ▼
[Langkah 1: Interactive Clarification] ──► ask_question (Opsi konkret, tanpa celah)
      │
      ▼
[Langkah 2: Brainstorming Spec] ──► Susun spesifikasi terstruktur di docs/specs/
      │
      ▼
[Langkah 3: Writing Plans] ──► Pecah task bite-sized + TDD checklist di docs/plans/
      │
      ▼
[Langkah 4: Kanban Sync] ──► Publish ke NeoKanban ('To Do' + checklist)
      │
      ▼
[Langkah 5: TDD & SDD Execution] ──► Branch terisolasi ('In Progress' -> check step)
      │
      ▼
[Langkah 6: UI Audit & Review Gate] ──► Audit ux-ui-pro-max + Pindah ke 'Review' (Human -> 'Done')
      │
      ▼
[Otomasi Handoff Berkala] ──► Auto-update ke docs/handoffs/YYYY-MM-DD/ & NeoKanban
```

---

## 4. Perintah CLI `scripts/kanban.ts`

```powershell
# 1. Publish rencana markdown ke papan NeoKanban
npx tsx scripts/kanban.ts publish docs/plans/2026-09-20-fitur.md

# 2. Ubah status kartu menjadi In Progress (auto-update handoff)
npx tsx scripts/kanban.ts start <cardId>

# 3. Centang subtask checklist pada kartu
npx tsx scripts/kanban.ts check <cardId> "Step 1"

# 4. Pindahkan kartu ke kolom Review dengan laporan pengujian & stempel UI (auto-update handoff)
npx tsx scripts/kanban.ts review <cardId> --report "Ringkasan pengujian lolos 100%`n### 🎨 UI/UX Consistency Stamp: APPROVED"

# 5. Catat handoff sesi manual ke folder harian & sync ke NeoKanban
npx tsx scripts/kanban.ts handoff <nama-sesi> --summary "Ringkasan..."
```
