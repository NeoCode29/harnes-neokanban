# Lean Agentic Harness (Antigravity + NeoKanban)

Selamat datang di **Lean Agentic Harness**. Sistem ini dirancang dari nol untuk asisten AI **Antigravity**, memberikan alur kerja pengembangan perangkat lunak yang berdisiplin tinggi, aman, dan efisien dengan integrasi **NeoKanban**, didukung **Superpowers Pipeline Lengkap** dan spesialis desain **UX/UI Pro Max**, tanpa dependensi berat RAG atau database vektor.

---

## 1. Filosofi Inti

1. **Zero Heavy RAG**: Tidak ada database vektor lokal (ChromaDB), script embedding, atau index chunks yang memakan memori. Pemahaman sistem mengandalkan pembacaan langsung codebase dan **Living Context** pada NeoKanban (`architecture.md`, `guidelines.md`).
2. **Superpowers Discipline**: Mengadopsi prinsip proses Superpowers (triage kesadaran awal, spesifikasi terverifikasi, task bite-sized, isolasi worktree, review 2-tahap, TDD, hingga whole-branch verification).
3. **NeoKanban sebagai Living Source of Truth**:
   - Papan proyek mencatat status pekerjaan secara visual.
   - Langkah TDD dipetakan menjadi subtask checklist interaktif yang dicentang secara real-time.
4. **Safe Review Gate (Larangan Auto-Done)**: Agen dilarang keras memindahkan kartu langsung ke `Done`. Setiap penyelesaian tugas wajib diverifikasi manusia setelah melewati kolom `Review` dengan laporan verifikasi terstruktur.
5. **Spesialisasi Domain Tingkat Lanjut**: Dilengkapi peran spesialis komprehensif, termasuk **UX/UI Pro Max** dengan standar aksesibilitas WCAG AA dan token desain modern.

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

## 3. Lima Tahapan Pengembangan (The 5-Stage Pipeline)

```
[1. Brainstorming] ──► [2. Plan Writing] ──► [3. Kanban Sync] ──► [4. TDD & SDD] ──► [5. Safe Review Gate]
   Spec disetujui        Task bite-sized        Publish ke 'To Do'    Branch terisolasi      Pindah ke 'Review'
   di docs/specs/        + checklist TDD        di NeoKanban          Checklist real-time    + Bukti Verifikasi
                                                                                               (Human -> 'Done')
```

### Tahap 1: Brainstorming & Desain Spesifikasi
- **Skill**: `superpowers:brainstorming`
- Menggali kebutuhan user, batasan arsitektur, dan membandingkan alternatif solusi.
- Hasil akhir: File spesifikasi disetujui di `docs/specs/YYYY-MM-DD-<nama-fitur>.md`.

### Tahap 2: Pembuatan Rencana Kerja (Writing Plans)
- **Skill**: `superpowers:writing-plans`
- Memecah spesifikasi menjadi task-task kecil (2–5 menit per langkah).
- Format setiap task wajib memuat:
  - File target: `Create:`, `Modify:`, `Test:`
  - Penetapan agen: `**Agent:** <nama-spesialis>` (misal: `ux-ui-pro-max` atau `backend-specialist`)
  - Langkah TDD bertingkat: `- [ ] **Step 1:...**`
- Hasil akhir: File rencana di `docs/plans/YYYY-MM-DD-<nama-fitur>.md`.

### Tahap 3: Penerbitan ke NeoKanban (Kanban Sync)
- Menjalankan perintah sinkronisasi:
  ```powershell
  npx tsx scripts/kanban.ts publish docs/plans/YYYY-MM-DD-<nama-fitur>.md [board-id]
  ```
- Rencana otomatis terbit menjadi kartu-kartu di kolom **`To Do`** dengan deskripsi lengkap dan checklist TDD.
- Pemetaan tersimpan di `.kanban-map.json`.

### Tahap 4: Eksekusi TDD & Subagent-Driven Development
- **Skill**: `superpowers:subagent-driven-development`, `superpowers:using-git-worktrees`, `superpowers:test-driven-development`
- Buat branch fitur baru (`git checkout -b feat/<fitur>-<card-id>`).
- Ubah status kartu ke **`In Progress`**:
  ```powershell
  npx tsx scripts/kanban.ts start <card-id>
  ```
- Subagent spesialis mengeksekusi TDD:
  - RED: Tulis unit test yang gagal terlebih dahulu.
  - GREEN: Tulis kode implementasi minimal hingga test lolos.
  - REFACTOR: Rapikan kode tanpa merusak test.
- Setiap langkah lolos, centang checklist kartu secara real-time:
  ```powershell
  npx tsx scripts/kanban.ts check <card-id> "Step 1"
  ```
- Jalankan Two-Stage Review (Spec Compliance & Code Quality).

### Tahap 5: Gerbang Review Aman & Penyelesaian
- **HARD RULE: DILARANG AUTO-DONE**. Agen **TIDAK BOLEH** memindahkan kartu langsung ke kolom `Done`.
- Setelah seluruh test suite lolos (100% PASS) dan build bersih (`verification-before-completion`), pindahkan kartu ke **`Review`**:
  ```powershell
  npx tsx scripts/kanban.ts review <card-id> --report "### 🧪 Verification Report`n- 10/10 tests pass`n- Build: Exit 0`n- Branch: feat/..."
  ```
- Pemilik proyek/manusia mereview branch (`finishing-a-development-branch`), menyetujui merge ke branch utama (`main`/`master`), lalu memindahkan kartu ke **`Done`**.

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
