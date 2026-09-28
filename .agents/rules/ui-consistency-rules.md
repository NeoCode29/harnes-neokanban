# Aturan Tata Kelola Konsistensi UI (UI Consistency Rules)

Aturan ini mengikat seluruh agen dan developer saat menyentuh bagian antarmuka pengguna (Frontend UI).

---

## 1. Larangan Redundansi Komponen (No Reinventing the Wheel)
- Dilarang membuat komponen UI baru tanpa memeriksa ketersediaan komponen tersebut di NeoKanban (`npx tsx scripts/kanban.ts component:check <nama>`).
- Jika komponen standar sudah ada di NeoKanban, wajib digunakan secara langsung.

## 2. Kepatuhan Mutlak Terhadap Design Token
- Seluruh properti visual (warna, ukuran font, spasi, border radius, shadow) wajib mengacu pada `token-design.json` proyek.
- Dilarang keras menggunakan warna ad-hoc atau padding acak di luar token.

## 3. Gerbang Persetujuan Visual (Template Review Gate)
- Setiap komponen baru yang dibangun wajib dibuat dalam bentuk template HTML mandiri (`template-[namakomponen].html`) dan disetujui pengguna sebelum didaftarkan ke NeoKanban (`component:publish`).
