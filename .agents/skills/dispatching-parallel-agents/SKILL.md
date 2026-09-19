---
name: dispatching-parallel-agents
description: "Gunakan ketika memiliki 2 atau lebih task independen yang dapat dikerjakan bersamaan tanpa dependensi data atau file yang saling bentrok."
---

# Dispatching Parallel Agents Skill

Skill untuk mempercepat pengembangan dengan mendelegasikan beberapa task independen secara konkuren.

## 1. Kriteria Wajib Paralelisasi
Hanya jalankan task secara paralel jika memenuhi SEMUA syarat berikut:
1. **Tidak Ada Dependensi Data**: Output dari Task A tidak dibutuhkan sebagai input Task B.
2. **File Terpisah Penuh**: Task A dan Task B memodifikasi kumpulan file yang 100% berbeda (mencegah merge conflict).
3. **Branch/Worktree Terpisah**: Setiap subagent bekerja pada direktori kerja atau branch fitur tersendiri.

## 2. Alur Kerja Paralel
1. Identifikasi task independen pada file plan markdown.
2. Pindahkan kedua kartu kanban terkait ke status `In Progress`.
3. Panggil subagent paralel menggunakan `invoke_subagent` dengan instruksi spesifik untuk masing-masing task.
4. Tunggu hingga semua subagent menyelesaikan tugasnya.
5. Verifikasi pengujian masing-masing task.
6. Pindahkan masing-masing kartu ke kolom `Review` disertai bukti laporan verifikasi individual.
