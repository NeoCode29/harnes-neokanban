# Lean Agentic Harness (Antigravity + NeoKanban)

Selamat datang di **Lean Agentic Harness**. Sistem ini dirancang dari nol untuk asisten AI **Antigravity**, memberikan alur kerja pengembangan perangkat lunak yang berdisiplin tinggi, aman, dan efisien dengan integrasi **NeoKanban**, didukung **Superpowers Pipeline Lengkap**, spesialis desain **UX/UI Pro Max**, serta mekanisme kontinuitas sesi otomatis **Living Handoff**, tanpa dependensi berat RAG atau database vektor.

---

## 1. Filosofi Inti

1. **Zero Heavy RAG**: Tidak ada database vektor lokal (ChromaDB), script embedding, atau index chunks yang memakan memori. Pemahaman sistem mengandalkan pembacaan langsung codebase dan **Living Context** pada NeoKanban (`architecture.md`, `guidelines.md`).
2. **Living Session Handoff (`docs/HANDOFF.md`)**:
   - **Start of Session**: Agen otomatis membaca `docs/HANDOFF.md` untuk mengetahui konteks terakhir, branch aktif, dan task yang siap dieksekusi tanpa perlu bertanya ulang ke pengguna.
   - **End of Activity**: Setiap kali aktivitas penting selesai (fitur, bug fix, sprint task), agen wajib memperbarui `docs/HANDOFF.md`.
3. **Superpowers Discipline**: Mengadopsi prinsip proses Superpowers (triage kesadaran awal, spesifikasi terverifikasi, task bite-sized, isolasi worktree, review 2-tahap, TDD, hingga whole-branch verification).
4. **NeoKanban sebagai Living Source of Truth**:
   - Papan proyek mencatat status pekerjaan secara visual.
   - Langkah TDD dipetakan menjadi subtask checklist interaktif yang dicentang secara real-time.
5. **Safe Review Gate (Larangan Auto-Done)**: Agen dilarang keras memindahkan kartu langsung ke `Done`. Setiap penyelesaian tugas wajib diverifikasi manusia setelah melewati kolom `Review` dengan laporan verifikasi terstruktur.
6. **Spesialisasi Domain Tingkat Lanjut**: Dilengkapi peran spesialis komprehensif, termasuk **UX/UI Pro Max** dengan standar aksesibilitas WCAG AA dan token desain modern.

---

## 2. Tabel Domain & Peran Spesialis

Setiap task di dalam rencana kerja wajib ditugaskan ke salah satu spesialis berikut:

| Peran Spesialis | Lingkup Keahlian | File Definisi |
| :--- | :--- | :--- |
| `ux-ui-pro-max` | Desain antarmuka premium, WCAG AA Accessibility, sistem tipografi, palet semantik, animasi micro-interaction 150–300ms, shadcn/ui | `.agents/specialists/ux-ui-pro-max.md` |
| `frontend-specialist` | React, Next.js, Tailwind CSS, Component State, Integrasi Form | `.agents/specialists/frontend-specialist.md` |
| `backend-specialist` | REST API, Node.js (Express/Fastify), Python (FastAPI), Routing, Auth | `.agents/specialists/backend-specialist.md` |
| `database-specialist`| PostgreSQL, Prisma ORM, SQLite, Migration, Query Optimization, RLS | `.agents/specialists/database-specialist.md` |
| `debugger-specialist`| Error Tracing, Stack Analysis, Root-Cause Diagnosis, Bug Reproduksi | `.agents/specialists/debugger-specialist.md` |
| `qa-tester`          | Unit Testing, Integration Testing, Edge Case, Test Suite Hardening | `.agents/specialists/qa-tester.md` |

---

## 3. Siklus Hidup Sesi & Pengembangan (Session & Development Lifecycle)

```
[Buka Sesi Baru] ──► Baca docs/HANDOFF.md ──► [Triage using-superpowers]
                                                    │
      ┌─────────────────────────────────────────────┘
      ▼
[1. Brainstorming] ──► [2. Plan Writing] ──► [3. Kanban Sync] ──► [4. TDD & SDD] ──► [5. Safe Review Gate]
   Spec disetujui        Task bite-sized        Publish ke 'To Do'    Branch terisolasi      Pindah ke 'Review'
   di docs/specs/        + checklist TDD        di NeoKanban          Checklist real-time    + Bukti Verifikasi
                                                                                               (Human -> 'Done')
      │
      ▼
[Selesai Aktivitas] ──► Perbarui docs/HANDOFF.md (Status, Bukti Test, & Next Steps)
```

### Protokol Awal Sesi (Session Start)
1. Baca `docs/HANDOFF.md`.
2. Periksa branch aktif dan status kartu di papan NeoKanban.
3. Tentukan langkah kerja selanjutnya tanpa perlu menanyakan "kemarin sampai mana?" kepada user.

### Protokol Akhir Aktivitas (Activity End)
1. Jalankan verifikasi test (`npm test`) dan build.
2. Perbarui `docs/HANDOFF.md` dengan ringkasan perubahan, status kartu terkini, dan langkah berikutnya.

---

## 4. Perintah CLI `scripts/kanban.ts`

```powershell
# 1. Publish rencana markdown ke papan NeoKanban
npx tsx scripts/kanban.ts publish docs/plans/2026-09-20-fitur.md

# 2. Ubah status kartu menjadi In Progress
npx tsx scripts/kanban.ts start <cardId>

# 3. Centang subtask checklist pada kartu
npx tsx scripts/kanban.ts check <cardId> "Step 1"

# 4. Pindahkan kartu ke kolom Review dengan laporan pengujian
npx tsx scripts/kanban.ts review <cardId> --report "Ringkasan pengujian lolos 100%"
```
