---
name: using-git-worktrees
description: "Gunakan untuk membuat lingkungan kerja dan branch terisolasi saat mulai mengerjakan fitur atau kartu kanban baru agar tidak mengotori branch utama."
---

# Using Git Worktrees & Branch Isolation

Skill isolasi ruang kerja menggunakan Git Worktree atau branch terpisah untuk menjamin kebersihan branch utama (`main`/`master`).

## 1. Aturan Mutlak
- **Jangan pernah menulis kode fitur langsung di branch `main` atau `master`.**
- Setiap kartu kanban atau rangkaian task wajib memiliki branch kerja tersendiri:
  `feat/<nama-fitur>-<card-id>` atau `fix/<nama-bug>-<card-id>`.

## 2. Praktik Eksekusi

### Opsi A: Standar Feature Branch (Direktori Sama)
```powershell
# Buat dan pindah ke branch fitur baru
git checkout -b feat/user-auth-card-101
```

### Opsi B: Git Worktree (Direktori Terpisah untuk Subagent Paralel)
Jika menjalankan pekerjaan paralel yang membutuhkan folder fisik terpisah:
```powershell
# Buat worktree terpisah di folder ../worktrees/user-auth
git worktree add ../worktrees/user-auth -b feat/user-auth-card-101

# Setelah selesai dan dimerge, hapus worktree:
git worktree remove ../worktrees/user-auth
```
