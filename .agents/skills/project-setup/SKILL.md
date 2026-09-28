---
name: project-setup
description: "Gunakan saat setup pertama kali untuk menghubungkan project ke NeoKanban, memverifikasi koneksi (ping), mapping role collaborator/mention, dan inisialisasi context."
---

# Project Setup Skill (NeoKanban Connection & Context Initialization)

Skill ini menuntun inisialisasi awal proyek agar terhubung secara aman dan sinkron dengan **NeoKanban**, memetakan peran kolaborator untuk sistem mention, serta mempersiapkan dokumen arsitektur dan design token.

---

## Alur Prosedur Setup Awal

```
[Mulai: Setup Awal Proyek]
           │
           ▼
[Langkah 1: Healthcheck & Uji Koneksi NeoKanban]
   │
   ├── (Server Aktif) ──► Lanjut ke Konfigurasi
   └── (Server Offline) ──► Tampilkan panduan start server / Opsi Lanjut Offline
           │
           ▼
[Langkah 2: Simpan Konfigurasi di .neokanban.json] (Level Proyek, Bukan Root)
           │
           ▼
[Langkah 3: Pemilihan & Verifikasi Board NeoKanban]
   │
   ├── [Board Sudah Ada di NeoKanban]
   │      │
   │      ▼
   │   Ambil Living Context (architecture.md, guidelines.md, token-design.json)
   │   + Verifikasi Status Git Repo Lokal
   │      │
   │      ▼
   │   Mapping Role & Username Pengguna (@username untuk sistem mention)
   │
   └── [Board Baru / Belum Ada Context]
          │
          ▼
       Buat Board Baru di NeoKanban
       + Inisialisasi Git Repository (`git init` & `.gitignore`)
       + Pandu Perancangan Arsitektur Awal
       + Inisialisasi Standar `token-design.json` dari Template
       + Daftarkan Role & Tag Mention Pengguna
           │
           ▼
[Langkah 4: Finalisasi & Catat Living Handoff Perdana]
   └── Otomatis memicu `docs/handoffs/YYYY-MM-DD/handoff-setup-awal.md`
```

---

## Panduan Perintah Eksekusi

### 1. Wizard Setup Otomatis (Direkomendasikan)
Jalankan wizard interaktif melalui CLI:
```powershell
# Setup interaktif lengkap:
npx tsx scripts/kanban.ts init --url http://localhost:3000 --username kresna --role all-roles

# Mode offline jika server NeoKanban belum berjalan:
npx tsx scripts/kanban.ts init --offline --username kresna --role all-roles
```

### 2. Uji Koneksi Mandiri
```powershell
npx tsx scripts/kanban.ts ping
```

### 3. File Konfigurasi Tingkat Proyek (`.neokanban.json`)
Konfigurasi disimpan di root direktori proyek (bukan global root):
```json
{
  "apiUrl": "http://localhost:3000",
  "boardId": "board_12345",
  "boardTitle": "Nama Proyek",
  "user": {
    "name": "Kresna",
    "username": "kresna",
    "role": "all-roles",
    "mentionTag": "@kresna"
  },
  "initializedAt": "2026-09-28T..."
}
```
*Catatan Keamanan:* Berkas `.neokanban.json` otomatis dimasukkan ke `.gitignore` untuk mencegah kebocoran kredensial ke repository Git publik.
