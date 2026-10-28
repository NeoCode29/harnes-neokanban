---
name: agent-orchestration
description: Multi-agent coordination, subagent task delegation with clean context, two-stage reviews, and safe parallel execution.
---

# Agent Orchestration Skill

Gunakan skill ini untuk mengatur delegasi pekerjaan ke subagent, mengelola eksekusi paralel untuk task-task independen, dan menjalankan protokol review dua tahap.

---

## 1. Pendelegasian Task ke Subagent (Clean Context)

- **One Task, One Subagent**: Setiap task dari kartu NeoKanban harus didelegasikan kepada satu subagent dengan instruksi yang spesifik, berkas target terdefinisi, dan ekspektasi hasil yang jelas.
- **Batasan Konteks**: Hindari memasukkan seluruh riwayat percakapan panjang ke prompt subagent. Berikan hanya konteks yang relevan:
  1. Spesifikasi task & kriteria penerimaan (acceptance criteria).
  2. Daftar file yang boleh dibuat/diedit (`Files:` section).
  3. Perintah verifikasi/test yang harus dijalankan (`npm test`).

---

## 2. Review Dua Tahap (Two-Stage Review)

Sebelum subagent menyelesaikan tugas:
1. **Tahap 1: Verifikasi Spesifikasi**:
   - Apakah implementasi memenuhi seluruh checklist TDD pada kartu?
   - Apakah ada ruang lingkup yang terlewat atau menyimpang?
2. **Tahap 2: Kualitas Kode & Regresi**:
   - Apakah kode mematuhi standar kebersihan, keamanan, dan efisiensi?
   - Apakah seluruh test suite lulus 100% tanpa regresi?

---

## 3. Eksekusi Agen Paralel (Parallel Dispatching)

Jika terdapat 2 atau lebih task independen:
- **Syarat Paralelisasi**:
  - Task tidak menyentuh file yang sama (zero overlap).
  - Task tidak memiliki dependensi data atau urutan eksekusi.
  - Setiap task memiliki file pengujian terpisah.
- **Pencegahan Konflik**: Jika ada potensi sentuhan file bersama (misal `package.json`, skema database, router utama), jalankan task secara **sekuensial** demi integritas kode.
