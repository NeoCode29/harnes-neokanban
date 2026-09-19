# Kanban Workflow & Review Gate Rules

Aturan operasional untuk interaksi agen AI dengan papan NeoKanban.

## 1. Siklus Hidup Kartu (Card Lifecycle)

```
[To Do] ───────────────► [In Progress] ───────────────► [Review] ───────────────► [Done]
Diterbitkan dari plan     Mulai pengerjaan TDD           Seluruh test 100% lulus   Merge disetujui
(via kanban.ts publish)   di branch terisolasi           (Dilarang langsung Done)  oleh Developer/Owner
```

## 2. Aturan Keamanan Mutlak (Hard Rules)

1. **LARANGAN AUTO-DONE**:
   - Agen dilarang memindahkan kartu langsung ke `Done`.
   - Transisi ke `Done` hanya boleh dilakukan oleh manusia setelah kode di-review dan di-merge ke branch utama.
   - Status akhir yang boleh disentuh oleh agen hanyalah `Review`.

2. **ISOLASI GIT**:
   - Dilarang mengedit atau menulis kode fitur langsung di branch `main` atau `master`.
   - Selalu buat branch fitur baru berformat: `feat/<nama-fitur>-<card-id>` atau `fix/<nama-bug>-<card-id>`.

3. **REAL-TIME TDD CHECKLIST**:
   - Subtask checklist pada kartu NeoKanban merepresentasikan langkah-langkah TDD.
   - Segera setelah satu langkah pengujian lulus, subagent wajib mencentang subtask tersebut menggunakan script CLI:
     `npx tsx scripts/kanban.ts check <cardId> "<nama-step>"`

4. **LAPORAN VERIFIKASI WAJIB**:
   - Saat memindahkan kartu ke `Review`, agen wajib melampirkan komentar berformat terstruktur:
     ```markdown
     ### 🧪 Verification & Review Report
     - **Specialist:** `<nama-spesialis>`
     - **Branch:** `feat/<nama-fitur>-<card-id>`
     - **Test Status:** ✅ 100% Passed
     - **Files Modified:** [daftar file yang dibuat/diubah]
     - **Verification Command:** `npm test` atau `pytest`
     - **Commit Hash:** `<hash>`
     ```

5. **ANTI-KEBOCORAN KREDENSIAL (Zero Secret Leaks)**:
   - Dilarang keras menaruh isi `.env`, token API, atau password database ke dalam kartu kanban, komentar, maupun commit git.
