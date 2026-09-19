---
name: test-driven-development
description: "Gunakan untuk menegakkan siklus TDD (Red-Green-Refactor) pada setiap penambahan fitur atau perbaikan kode."
---

# Test-Driven Development (TDD) Skill

Disiplin penulisan kode berbasis pengujian untuk menjamin stabilitas dan mencegah regresi.

## Siklus 3 Langkah (RED - GREEN - REFACTOR)

1. **RED (Tulis Tes yang Gagal)**:
   - Tulis unit test untuk kasus yang diinginkan sebelum mengimplementasikan fungsinya.
   - Jalankan test runner dan konfirmasi bahwa test GAGAL dengan alasan yang tepat (*expected failure*).

2. **GREEN (Tulis Kode Minimal)**:
   - Tulis baris kode sesederhana mungkin hanya untuk membuat test tersebut lulus.
   - Jangan menambahkan fungsionalitas tambahan yang belum diuji.
   - Jalankan test runner dan pastikan test BERHASIL.

3. **REFACTOR (Rapikan & Standarisasi)**:
   - Bersihkan struktur kode, hilangkan duplikasi, dan rapikan penamaan variabel tanpa mengubah fungsionalitas.
   - Jalankan kembali test runner untuk memastikan tidak ada yang rusak.
