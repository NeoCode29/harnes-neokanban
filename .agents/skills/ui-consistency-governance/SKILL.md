---
name: ui-consistency-governance
description: "Gunakan saat merancang, membuat, atau memodifikasi fitur frontend untuk menegakkan konsistensi UI melalui tata kelola token design dan template komponen di NeoKanban."
---

# UI Consistency Governance Skill (Token Design & Component Registry)

Skill ini menegakkan konsistensi visual 100% pada seluruh antarmuka web dengan menjadikan **NeoKanban Living Context** sebagai pusat kebenaran (*Single Source of Truth*) untuk **Design Tokens (`token-design.json`)** dan **Standard Component Templates (`template-[namakomponen].html`)**.

---

## Alur Kerja Diagram Tata Kelola UI

```
[Mulai: Fitur Berhubungan dengan Frontend]
                    │
                    ▼
[Langkah 1: Cek Standar Token di NeoKanban]
   │                                      │
   ├── (Ada) ──► [Pull ke Lokal] ─────────┤
   │                                      │
   └── (Tidak Ada) ──► [Tanya User via ask_question]
                       └──► [Buat token-design.json & Push ke NeoKanban]
                                          │
                                          ▼
                         [Langkah 2: Cek Komponen di NeoKanban]
                            │                               │
                            ├── (Ada) ──► [Ambil & Gunakan Langsung]
                            │
                            └── (Tidak Ada) ──► [Bangun template-[nama].html sesuai Token]
                                                      │
                                                      ▼
                                            [Langkah 3: Review User]
                                               │               ▲
                                               ├── (Kurang) ───┘ (Revisi)
                                               │
                                               └── (Puas) ──► [Publish ke NeoKanban]
```

---

## Prosedur Eksekusi 4 Langkah

### Langkah 1: Verifikasi & Penyelarasan Design Token
Sebelum menulis kode komponen atau layout apapun:
1. Jalankan pengecekan token di NeoKanban:
   ```powershell
   npx tsx scripts/kanban.ts tokens:check
   ```
2. **Kondisi A (Jika Token Sudah Ada)**:
   - Ambil dan simpan ke direktori lokal:
     ```powershell
     npx tsx scripts/kanban.ts tokens:pull
     ```
   - Berkas akan tersimpan di `docs/ui-governance/token-design.json`.
3. **Kondisi B (Jika Token Belum Ada)**:
   - Tanyakan preferensi warna, tipografi, dan gaya desain kepada user menggunakan `ask_question`.
   - Susun berkas `token-design.json` mengikuti format standar W3C/Tailwind Tokens di `docs/templates/token-design-template.json`.
   - Unggah ke NeoKanban:
     ```powershell
     npx tsx scripts/kanban.ts tokens:push
     ```

---

### Langkah 2: Pengecekan Standar Komponen di NeoKanban
Sebelum membuat komponen UI baru (misal: Card, Modal, Filter Bar, Navbar, Button, Table):
1. Periksa apakah template komponen tersebut sudah pernah distandarisasi di NeoKanban:
   ```powershell
   npx tsx scripts/kanban.ts component:check <nama-komponen>
   ```
2. **Jika Komponen Ditemukan**:
   - CLI akan otomatis mengunduh berkas ke `docs/ui-governance/components/template-<nama-komponen>.html`.
   - **Gunakan langsung struktur dan styling tersebut** ke dalam kode aplikasi. Dilarang mendesain ulang komponen yang sudah ada!
3. **Jika Komponen Belum Ada**:
   - Lanjutkan ke Langkah 3 untuk membangun template baru.

---

### Langkah 3: Pembangunan Komponen Berdasarkan Token Design
1. Bangun berkas template visual mandiri di `docs/ui-governance/components/template-<nama-komponen>.html`.
2. **Ketentuan Wajib**:
   - Seluruh warna, padding, font, radius, dan shadow wajib mengambil nilai dari `token-design.json`.
   - Memenuhi standar [ux-ui-pro-max.md](file:///C:/Users/kresna/Documents/harnes/harnes-neokanban/.agents/specialists/ux-ui-pro-max.md) (WCAG AA, focus ring, target sentuh 44px, status loading/empty).

---

### Langkah 4: Review Pengguna & Publikasi ke NeoKanban
1. Sajikan template visual kepada user untuk direview.
2. **Review Loop**:
   - Jika pengguna kurang puas: Lakukan revisi pada `template-<nama-komponen>.html` dan ulangi review.
   - Jika pengguna puas: Daftarkan dan publikasikan komponen ke NeoKanban:
     ```powershell
     npx tsx scripts/kanban.ts component:publish docs/ui-governance/components/template-<nama-komponen>.html
     ```
3. Komponen kini resmi menjadi aset standar proyek di NeoKanban dan siap dipakai ulang oleh seluruh agen maupun developer lain.
