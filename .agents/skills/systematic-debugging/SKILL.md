---
name: systematic-debugging
description: "Gunakan saat menghadapi bug, error test, atau anomali perilaku sebelum mencoba menerapkan perbaikan kode."
---

# Systematic Debugging Skill

Skill investigasi terstruktur untuk membedah akar masalah tanpa menebak-nebak (*no guesswork*).

## 4 Fase Investigasi
1. **Fase 1: Rekonstruksi & Reproduksi**
   - Baca pesan error dan call stack dengan teliti.
   - Buat skenario pengujian reproduksi minimal yang memicu error secara deterministik.
2. **Fase 2: Isolasi Sumber Masalah**
   - Telusuri alur eksekusi dari titik kegagalan ke input awal.
   - Identifikasi asumsi atau variabel yang nilainya menyimpang dari ekspektasi.
3. **Fase 3: Perbaikan Terfokus**
   - Terapkan perbaikan tepat pada akar masalah.
   - Jangan melakukan *shotgun debugging* (mengubah banyak hal sekaligus).
4. **Fase 4: Verifikasi & Proteksi Regresi**
   - Jalankan test reproduksi untuk membuktikan bug telah teratasi.
   - Jalankan keseluruhan test suite proyek untuk memastikan tidak ada fitur lain yang terganggu.
