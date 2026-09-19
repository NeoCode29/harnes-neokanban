---
name: subagent-driven-development
description: "Gunakan saat mengeksekusi rencana implementasi task-by-task dengan subagent spesialis berkonteks terisolasi, TDD checklist, dan dua tahap review (spesifikasi + kualitas)."
---

# Subagent-Driven Development (SDD) Terintegrasi NeoKanban

Skill ini mengorkestrasi eksekusi rencana kerja yang telah diterbitkan ke NeoKanban, mempekerjakan subagent spesialis terfokus untuk setiap task dengan dua gerbang verifikasi.

## 1. Prinsip Utama
- **Konteks Terisolasi (Clean Slate)**: Setiap task dikerjakan oleh subagent yang diberi konteks spesifik sesuai task-nya saja (menggunakan `invoke_subagent`), bukan mewarisi seluruh riwayat chat yang berpotensi membingungkan.
- **Eksekusi Kontinu**: Jalankan task berurutan tanpa berhenti menanyakan "apakah saya harus lanjut?", kecuali terblokir oleh kendala kritis.
- **Integrasi Penuh NeoKanban**: Setiap pergantian status dan centang checklist disinkronkan real-time.

## 2. Alur Eksekusi Per Task

```
1. Baca Task di Plan & Mapping (.kanban-map.json)
      │
      ▼
2. Transisi Kartu ke 'In Progress' (kanban.ts start <cardId>)
      │
      ▼
3. Dispatch Subagent Spesialis (invoke_subagent dengan prompt spesialis terkait)
      │
      ▼
4. Siklus TDD: RED -> GREEN -> REFACTOR
      │
      ▼
5. Centang Checklist Real-Time (kanban.ts check <cardId> "<stepTitle>")
      │
      ▼
6. Review 2-Tahap (Spec Compliance & Code Quality)
      │
      ├── Jika Ada Temuan: Perbaiki hingga tuntas
      └── Jika Lolos 100%:
            │
            ▼
7. Pindah ke 'Review' + Lampirkan Bukti (kanban.ts review <cardId> --report "...")
   (DILARANG KERAS langsung memindahkan ke Done!)
```

## 3. Format Review Dua Tahap (Two-Stage Review)
Sebelum memindahkan kartu ke kolom `Review`, agen koordinator memvalidasi:
1. **Spec Compliance**: Apakah seluruh kriteria dan file yang diminta dalam task telah terpenuhi secara presisi?
2. **Quality & Test Rigor**: Apakah kode bersih dari duplicate logic, tipe data TypeScript ketat tanpa `any`, dan unit test 100% lulus tanpa regresi?

Setelah kedua tahap lulus, kartu dipindahkan ke kolom **`Review`** dan menunggu persetujuan developer/owner untuk digabungkan ke master.
