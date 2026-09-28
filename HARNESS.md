# Lean Agentic Harness (Antigravity + NeoKanban)

Selamat datang di **Lean Agentic Harness**. Sistem ini dirancang dari nol untuk asisten AI **Antigravity**, memberikan alur kerja pengembangan perangkat lunak yang berdisiplin tinggi, aman, dan efisien dengan integrasi **NeoKanban**, didukung **Superpowers Pipeline Lengkap**, spesialis desain **UX/UI Pro Max**, tata kelola **UI Consistency Governance (Design Tokens & Component Registry)**, kontinuitas sesi **Living Handoff Harian**, serta kebiasaan utama **Deep Pre-Understanding & Interactive Clarification**.

---

## 1. Filosofi Inti

1. **Tata Kelola Konsistensi UI (Design Tokens & Component Registry)**:
   - Menghindari inkonsistensi antarmuka saat tim atau agen membangun UI.
   - Papan NeoKanban menyimpan acuan tunggal `token-design.json` (warna, font, spasi) dan repositori template komponen `template-[namakomponen].html`.
   - Agen wajib memeriksa ketersediaan token & komponen di NeoKanban sebelum membangun UI (`superpowers:ui-consistency-governance`).
2. **Pahami Dahulu & Bertanya Interaktif (Zero Information Gaps)**:
   - Setiap kali pengguna meminta suatu topik atau fitur, asisten wajib **memahami arsitektur dan kode secara mendalam terlebih dahulu**.
   - Sebelum menyusun solusi, asisten wajib mengajukan pertanyaan interaktif terstruktur (`ask_question`) untuk menutup seluruh celah asumsi.
3. **Zero Heavy RAG**: Tidak ada database vektor lokal (ChromaDB), script embedding, atau index chunks yang memakan memori. Pemahaman sistem mengandalkan pembacaan langsung codebase dan **Living Context** pada NeoKanban (`architecture.md`, `guidelines.md`, `token-design.json`).
4. **Living Session Handoff Harian (`docs/handoffs/YYYY-MM-DD/`)**:
   - **Start of Session**: Agen otomatis membaca `docs/HANDOFF.md` untuk mengetahui konteks terakhir, branch aktif, dan task yang siap dieksekusi tanpa perlu bertanya ulang ke pengguna.
   - **Continuous Periodic Sync**: Setiap aktivitas penting (`publish`, `start`, `review`, atau penutupan sesi) otomatis memperbarui berkas harian lokal dan Living Context di papan NeoKanban.
5. **Superpowers Discipline**: Mengadopsi prinsip proses Superpowers (triage kesadaran awal, spesifikasi terverifikasi, task bite-sized, isolasi worktree, review 2-tahap, TDD, hingga whole-branch verification).
6. **NeoKanban sebagai Living Source of Truth**:
   - Papan proyek mencatat status pekerjaan secara visual.
   - Langkah TDD dipetakan menjadi subtask checklist interaktif yang dicentang secara real-time.
7. **Safe Review Gate (Larangan Auto-Done)**: Agen dilarang keras memindahkan kartu langsung ke `Done`. Setiap penyelesaian tugas wajib diverifikasi manusia setelah melewati kolom `Review` dengan laporan verifikasi terstruktur.
8. **Spesialisasi Domain Tingkat Lanjut**: Dilengkapi peran spesialis komprehensif, termasuk **UX/UI Pro Max** dengan standar aksesibilitas WCAG AA dan token desain modern.

---

## 2. Alur Tata Kelola Konsistensi UI (UI Governance Flow)

```
[Fitur Frontend Baru] 
       │
       ▼
1. Pengecekan Design Token di NeoKanban (`kanban tokens:check`)
   ├── [Ada] ──► Pull ke lokal (`kanban tokens:pull` -> docs/ui-governance/token-design.json)
   └── [Belum Ada] ──► Tanya user via ask_question -> Buat token -> Push ke NeoKanban (`kanban tokens:push`)
       │
       ▼
2. Pengecekan Standar Komponen di NeoKanban (`kanban component:check <nama>`)
   ├── [Ada] ──► Unduh template-[nama].html -> Gunakan langsung (Cegah reinventing the wheel)
   └── [Belum Ada] ──► Bangun template-[nama].html mandiri sesuai token design
       │
       ▼
3. Review Interaktif Pengguna (Visual Preview)
   ├── [Kurang Puas] ──► Revisi template komponen
   └── [Puas] ──► Publikasikan ke NeoKanban (`kanban component:publish <path>`)
```

---

## 3. Tabel Domain & Peran Spesialis

| Peran Spesialis | Lingkup Keahlian | File Definisi |
| :--- | :--- | :--- |
| `ux-ui-pro-max` | Desain antarmuka premium, WCAG AA Accessibility, sistem tipografi, palet semantik, animasi micro-interaction 150–300ms, shadcn/ui | `.agents/specialists/ux-ui-pro-max.md` |
| `frontend-specialist` | React, Next.js, Tailwind CSS, Component State, Integrasi Form | `.agents/specialists/frontend-specialist.md` |
| `backend-specialist` | REST API, Node.js (Express/Fastify), Python (FastAPI), Routing, Auth | `.agents/specialists/backend-specialist.md` |
| `database-specialist`| PostgreSQL, Prisma ORM, SQLite, Migration, Query Optimization, RLS | `.agents/specialists/database-specialist.md` |
| `debugger-specialist`| Error Tracing, Stack Analysis, Root-Cause Diagnosis, Bug Reproduksi | `.agents/specialists/debugger-specialist.md` |
| `qa-tester`          | Unit Testing, Integration Testing, Edge Case, Test Suite Hardening | `.agents/specialists/qa-tester.md` |

---

## 4. Perintah CLI `scripts/kanban.ts`

```powershell
# --- Alur Setup Pertama Kali & Healthcheck ---
# 0. Uji koneksi ke NeoKanban
npx tsx scripts/kanban.ts ping

# Inisialisasi proyek dan konfigurasi .neokanban.json
npx tsx scripts/kanban.ts init --url http://localhost:3000 --username kresna --role all-roles
# (Atau mode offline jika server NeoKanban belum dinyalakan):
# npx tsx scripts/kanban.ts init --offline --username kresna --role all-roles

# --- Alur Papan & Task Kanban ---
# 1. Publish rencana markdown ke papan NeoKanban
npx tsx scripts/kanban.ts publish docs/plans/2026-09-20-fitur.md

# 2. Ubah status kartu menjadi In Progress (auto-update handoff)
npx tsx scripts/kanban.ts start <cardId>

# 3. Centang subtask checklist pada kartu
npx tsx scripts/kanban.ts check <cardId> "Step 1"

# 4. Pindahkan kartu ke kolom Review dengan laporan pengujian (auto-update handoff)
npx tsx scripts/kanban.ts review <cardId> --report "Ringkasan pengujian lolos 100%"

# --- Alur Tata Kelola Token & Komponen UI ---
# 5. Cek ketersediaan token design di NeoKanban
npx tsx scripts/kanban.ts tokens:check

# 6. Tarik token design dari NeoKanban ke lokal (docs/ui-governance/token-design.json)
npx tsx scripts/kanban.ts tokens:pull

# 7. Unggah token design lokal ke NeoKanban
npx tsx scripts/kanban.ts tokens:push

# 8. Cek apakah template komponen sudah ada di NeoKanban
npx tsx scripts/kanban.ts component:check <nama-komponen>

# 9. Publikasikan template komponen yang disetujui user ke NeoKanban
npx tsx scripts/kanban.ts component:publish docs/ui-governance/components/template-<nama>.html

# --- Alur Living Handoff Sesi ---
# 10. Catat handoff sesi manual ke folder harian & sync ke NeoKanban
npx tsx scripts/kanban.ts handoff <nama-sesi> --summary "Ringkasan..."
```
