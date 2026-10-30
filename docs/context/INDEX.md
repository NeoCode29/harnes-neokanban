# Project Context Index

> **Living Source of Truth**: Dokumen ini adalah peta navigasi utama untuk asisten AI dan tim pengembang. Seluruh arsitektur, aturan, dan keputusan desain dirujuk dari direktori `docs/context/`.

---

## 1. Ringkasan Proyek

- **Nama Proyek**: [Nama Proyek Anda]
- **Deskripsi**: [Deskripsi singkat tujuan dan ruang lingkup aplikasi]
- **Target Pengguna**: [Sasaran pengguna utama]
- **Status Saat Ini**: Inisialisasi / Pengembangan Aktif

---

## 2. Peta Dokumen Konteks (Context Matrix)

| Nama File | Kategori | Status | Deskripsi Singkat |
| :--- | :--- | :--- | :--- |
| **[`INDEX.md`](./INDEX.md)** | Navigasi | Wajib | Peta indeks dan daftar isi utama seluruh konteks proyek |
| **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** | Teknis | Wajib | Tech stack, arsitektur sistem, struktur direktori, data flow |
| **[`DATABASE.md`](./DATABASE.md)** | Data | Kondisional | Skema entitas, relasi tabel, model data, dan panduan migrasi |
| **[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)** | Visual | Wajib | Standar token desain (warna, tipografi, spasi) dan komponen |
| **[`AGENTS.md`](./AGENTS.md)** | AI Ops | Wajib | Peran spesialis domain dan matriks delegasi tugas |
| **[`BEHAVIOR.md`](./BEHAVIOR.md)** | AI Ops | Wajib | Aturan perilaku AI (klarifikasi interaktif, larangan auto-done) |
| **[`SECURITY.md`](./SECURITY.md)** | Keamanan | Wajib | Penanganan rahasia/secrets, sanitasi input, dan otorisasi |
| **[`REPOSITORY.md`](./REPOSITORY.md)** | Rekayasa | Wajib | Konvensi Git, strategi branching, disiplin TDD, dan testing |
| **[`HANDOFF.md`](./HANDOFF.md)** | Riwayat | Wajib | Status aktif saat ini, fokus pengerjaan, dan langkah berikutnya |
| **[`ROLE_PERMISSION.md`](./ROLE_PERMISSION.md)** | Akses | Opsional | Matriks RBAC (Role-Based Access Control) dan perizinan pengguna |
| **[`DEPLOY.md`](./DEPLOY.md)** | Operasional | Opsional | Konfigurasi environment, CI/CD pipeline, target deployment |
| **[`FEATURE_NEOKANBAN_INTEGRATION.md`](./FEATURE_NEOKANBAN_INTEGRATION.md)** | Integrasi | Aktif | Penyelarasan penuh UI/UX Studio, Skill Library, Context Hub, dan Review Annotations |
| **`FEATURE_<nama>.md`** | Fungsional | Kondisional | Dokumen spesifikasi per modul/fitur spesifik |

---

## 3. Protokol Pembaruan Konteks

1. **Sinkronisasi Otomatis ke NeoKanban**:
   Jalankan `npm run kanban -- context:push` untuk memperbarui seluruh dokumen konteks ke papan kerja NeoKanban.
2. **Kepatuhan Asisten AI**:
   Sebelum mengeksekusi fitur baru, asisten wajib membaca `INDEX.md` dan dokumen terkait untuk menjamin pemahaman holistik (*zero information gaps*).
