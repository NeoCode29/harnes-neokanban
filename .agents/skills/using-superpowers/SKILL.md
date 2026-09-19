---
name: using-superpowers
description: "Gunakan pada awal setiap sesi atau task baru untuk menentukan skill dan peran spesialis yang tepat sebelum mengambil tindakan atau menulis kode."
---

# Using Superpowers — Bootstrap & Triage Protocol

Skill ini adalah protokol kesadaran awal (*meta-skill*) yang dieksekusi sebelum melakukan aksi apapun terhadap permintaan pengguna.

## 1. Langkah 0: Pulihkan State Sesi (Restore Context)
- **Selalu baca `docs/HANDOFF.md` di awal setiap percakapan.**
- Pahami konteks terakhir, branch aktif, dan kartu yang sedang berjalan tanpa perlu bertanya ulang kepada pengguna.

## 2. Aturan Emas (The Golden Rule)
> **Tentukan dan aktifkan skill yang relevan SEBELUM merespons atau menyentuh kode.**

## 3. Matriks Keputusan & Triage

| Jenis Permintaan / Situasi | Skill yang Wajib Diaktifkan | Spesialis yang Ditugaskan |
| :--- | :--- | :--- |
| Fitur baru, modul baru, perombakan UX besar | `brainstorming` → `writing-plans` | Sesuai domain fitur (`frontend`, `backend`, dll.) |
| Desain antarmuka, layout, styling, palet, audit A11y | `ux-ui-pro-max` (Spesialis) | `ux-ui-pro-max` |
| Rencana implementasi sudah disetujui | `subagent-driven-development` + `kanban-execution` | Spesialis yang tertera di field `**Agent:**` task |
| Bug, failure pada unit test, perilaku tidak terduga | `systematic-debugging` | `debugger-specialist` |
| Menulis kode fitur/fungsi baru | `test-driven-development` (RED-GREEN-REFACTOR) | Spesialis domain terkait |
| Persiapan menyatakan selesai / merge cabang | `verification-before-completion` → `finishing-a-development-branch` | `qa-tester` / Reviewer |
| Review kode antar agen / masukan reviewer | `code-review-protocol` | Spesialis domain terkait |

## 4. Langkah Akhir: Perbarui State Sesi
- **Selalu perbarui `docs/HANDOFF.md`** setelah menyelesaikan aktivitas penting atau sebelum menutup interaksi.
