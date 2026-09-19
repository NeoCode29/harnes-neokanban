---
name: finishing-a-development-branch
description: "Gunakan saat seluruh implementasi kartu selesai dan seluruh test lulus - memandu verifikasi akhir whole-branch, merge ke branch utama, transisi kartu ke Done, dan cleanup."
---

# Finishing a Development Branch

Skill tahap akhir untuk mengintegrasikan cabang kerja yang telah diverifikasi ke dalam branch utama (`main`/`master`).

## 1. Verifikasi Menyeluruh (Whole-Branch Verification)
Sebelum meminta persetujuan akhir merge:
1. Jalankan test suite penuh di root proyek: `npm test` atau `pytest`.
2. Jalankan build kompilasi produksi: `npm run build`.
3. Pastikan tidak ada uncommitted changes: `git status --porcelain`.

## 2. Persetujuan Pemilik Proyek (Human Approval Gate)
- Pindahkan kartu ke kolom `Review` (jika belum).
- Presentasikan ringkasan akhir kepada pemilik proyek (user):
  - Fitur yang selesai dan nomor kartu terkait.
  - Hasil test suite dan status build.
  - Rekomendasi merge.

## 3. Merge & Penutupan Kartu (Transisi ke Done)
Setelah disetujui oleh pengguna:
```powershell
# 1. Checkout ke branch utama
git checkout master

# 2. Merge branch fitur
git merge feat/<nama-fitur>-<card-id> --no-ff -m "feat: integrate <nama-fitur> (Card #<cardId>)"

# 3. Pindahkan kartu dari Review ke Done pada papan NeoKanban
# (Hanya diizinkan di tahap ini setelah merge selesai)
```
4. Bersihkan branch lokal fitur yang sudah tidak terpakai (`git branch -d feat/...`).
