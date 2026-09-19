---
name: verification-before-completion
description: "Gunakan sebelum menyatakan task selesai atau meminta review - mewajibkan eksekusi build dan test lengkap (evidence before assertions)."
---

# Verification Before Completion Skill

Prinsip **"Evidence Before Assertions"** — tidak ada klaim sukses tanpa bukti output eksekusi perintah verifikasi.

## Langkah Verifikasi Wajib
1. **Lakukan Build**: Jalankan kompilasi proyek (misal `npm run build` atau `tsc --noEmit`).
   - Hasil harus: Exit code 0, tanpa error kompilasi atau peringatan kritis.
2. **Jalankan Test Suite**: Jalankan seluruh pengujian unit/integrasi (misal `npm test`).
   - Hasil harus: 100% Passed.
3. **Cek Lint & Formatting**: Pastikan tidak ada pelanggaran tipe data atau format kode.
4. **Dokumentasikan Bukti**:
   - Sertakan cuplikan output terminal ke dalam laporan review kartu kanban sebelum memindahkan kartu ke kolom `Review`.
