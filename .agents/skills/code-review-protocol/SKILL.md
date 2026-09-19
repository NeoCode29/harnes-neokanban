---
name: code-review-protocol
description: "Gunakan saat meminta, melakukan, atau menanggapi review kode - menegakkan ketelitian teknis, objektivitas, dan verifikasi sebelum menyetujui perubahan."
---

# Code Review Protocol (Requesting & Receiving)

Protokol dua arah untuk memastikan kualitas kode tetap premium, stabil, dan aman dari regresi.

## 1. Protokol Meminta Review (Requesting Review)
Saat menyelesaikan implementasi dan hendak memindahkan kartu ke `Review`:
1. Pastikan build bersih (`Exit 0`) dan test suite 100% lulus.
2. Siapkan ringkasan perubahan yang mencakup:
   - File baru / diubah / dihapus.
   - Keputusan arsitektural penting dan trade-off yang diambil.
   - Bukti terminal verifikasi.
3. Lampirkan ringkasan ini ke dalam komentar kartu NeoKanban.

## 2. Protokol Menanggapi Review (Receiving Review)
Jika reviewer (baik manusia maupun agen lain) memberikan feedback:
- **Ketelitian Teknis**: Jangan menyetujui masukan secara membabi-buta (*no blind agreement*). Uji terlebih dahulu apakah saran tersebut valid secara teknis.
- **Verifikasi Perbaikan**: Jika masukan valid, buat failing test yang mendemonstrasikan kelemahan tersebut, terapkan perbaikan, dan pastikan test lulus.
- **Respons Konstruktif**: Berikan penjelasan singkat mengenai perbaikan yang telah diterapkan beserta bukti test-nya.
