---
name: kanban-execution
description: "Gunakan saat mengeksekusi kartu NeoKanban: sinkronisasi rencana, transisi status kartu, update checklist TDD real-time, dan penegakan Review Gate."
---

# Kanban Execution Skill

Skill operasional untuk menghubungkan rencana kerja dengan papan visual NeoKanban.

## 1. Aturan Mutlak
1. **Larangan Auto-Done**: Dilarang memindahkan kartu langsung ke kolom `Done`. Kartu yang selesai wajib dipindahkan ke kolom `Review`.
2. **Real-time Checklist**: Centang subtask checklist pada kartu setiap kali satu langkah TDD lolos.
3. **Laporan Bukti**: Saat memindahkan kartu ke `Review`, lampirkan bukti pengujian di komentar.

## 2. Operasi CLI `scripts/kanban.ts`
```powershell
# Publish plan ke papan NeoKanban
npx tsx scripts/kanban.ts publish docs/plans/<nama-plan>.md

# Mulai pengerjaan kartu di branch fitur
npx tsx scripts/kanban.ts start <card-id>

# Centang checklist langkah selesai
npx tsx scripts/kanban.ts check <card-id> "Step 1"

# Pindahkan kartu ke Review setelah tes lolos
npx tsx scripts/kanban.ts review <card-id> --report "### 🧪 Verification Report`n- 10/10 tests pass"
```
