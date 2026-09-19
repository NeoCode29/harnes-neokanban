---
name: using-superpowers
description: "Gunakan pada awal setiap sesi atau task baru untuk menentukan skill dan peran spesialis yang tepat sebelum mengambil tindakan atau menulis kode."
---

# Using Superpowers — Bootstrap & Triage Protocol

Skill ini adalah protokol kesadaran awal (*meta-skill*) yang dieksekusi sebelum melakukan aksi apapun terhadap permintaan pengguna.

## 1. Aturan Emas (The Golden Rule)
> **Tentukan dan aktifkan skill yang relevan SEBELUM merespons atau menyentuh kode.**

## 2. Matriks Keputusan & Triage

| Jenis Permintaan / Situasi | Skill yang Wajib Diaktifkan | Spesialis yang Ditugaskan |
| :--- | :--- | :--- |
| Fitur baru, modul baru, perombakan UX besar | `brainstorming` → `writing-plans` | Sesuai domain fitur (`frontend`, `backend`, dll.) |
| Desain antarmuka, layout, styling, palet, audit A11y | `ux-ui-pro-max` (Spesialis) | `ux-ui-pro-max` |
| Rencana implementasi sudah disetujui | `subagent-driven-development` + `kanban-execution` | Spesialis yang tertera di field `**Agent:**` task |
| Bug, failure pada unit test, perilaku tidak terduga | `systematic-debugging` | `debugger-specialist` |
| Menulis kode fitur/fungsi baru | `test-driven-development` (RED-GREEN-REFACTOR) | Spesialis domain terkait |
| Persiapan menyatakan selesai / merge cabang | `verification-before-completion` → `finishing-a-development-branch` | `qa-tester` / Reviewer |
| Review kode antar agen / masukan reviewer | `code-review-protocol` | Spesialis domain terkait |

## 3. Alur Eksekusi
1. Evaluasi bobot task (fitur besar vs perbaikan minor).
2. Baca file panduan skill dan spesialis yang relevan.
3. Tetapkan isolasi lingkungan (branch / worktree terpisah).
4. Lakukan pengerjaan secara berurutan sesuai alur 5-tahap harness.
