---
name: brainstorming
description: "Gunakan sebelum memulai pengerjaan fitur baru untuk mengeksplorasi kebutuhan, merancang spesifikasi, dan mendapatkan persetujuan pengguna."
---

# Brainstorming Skill

Skill ini dijalankan di tahap awal sebelum penulisan rencana dan kode dimulai.

## Langkah Wajib (Prinsip Pahami Dulu & Tanya Interaktif)

1. **Tahap 1: Deep Pre-Understanding (Pahami Sistem Dahulu)**:
   - Telusuri codebase, antarmuka komponen, skema database, atau route API yang bersinggungan dengan permintaan pengguna.
   - Pahami secara mendalam batas-batas sistem, alur data saat ini, dan potensi kendala teknis sebelum merespons.
   - Jangan menanyakan hal yang sudah jelas terdokumentasi di dalam kode.

2. **Tahap 2: Interactive Clarification (`ask_question`)**:
   - Gunakan tool interaktif `ask_question` untuk menyajikan pertanyaan beropsi pilihan ganda terstruktur.
   - Tutup semua celah informasi:
     - Scope & batasan fungsionalitas.
     - Detail alur UX (empty state, loading feedback, error handling).
     - Aturan validasi data dan hak akses.
     - Skenario edge cases & kegagalan.
   - Selalu sertakan rekomendasi terbaik dengan awalan `(Recommended)`.

3. **Tahap 3: Penyusunan Desain Bertahap**:
   - Setelah semua jawaban interaktif disepakati, sajikan rancangan spesifikasi terstruktur:
     - Ringkasan Solusi & User Journey
     - Arsitektur Komponen & Alur Data
     - Perubahan Skema / File
     - Rencana Pengujian
   - Simpan dokumen spesifikasi final yang disetujui di `docs/specs/YYYY-MM-DD-<nama-fitur>.md`.
