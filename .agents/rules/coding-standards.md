# Standar Penulisan Kode (Coding Standards)

Aturan teknis implementasi kode di seluruh proyek yang menggunakan harness ini.

## 1. Prinsip Umum
- **Solusi Paling Sederhana**: Jangan menambahkan lapisan abstraksi atau fitur antisipatif yang belum dibutuhkan.
- **Komentar Kode Minimal**: Jangan menulis komentar yang hanya mengulang fungsi kode. Tulis komentar HANYA jika alasan (*WHY*) tidak jelas dari kode itu sendiri.
- **Strict Typing**: Pada TypeScript, hindari penggunaan `any`. Selalu definisikan tipe data atau interface dengan jelas.

## 2. Struktur Proyek
- Setiap proyek diletakkan pada direktori mandiri.
- Menggunakan konvensi penamaan standar:
  - Folder & file non-komponen: `kebab-case`
  - Komponen React: `PascalCase.tsx`
  - Variabel & fungsi (JS/TS): `camelCase`
  - Variabel & fungsi (Python): `snake_case`

## 3. Keamanan (Security-First)
- Selalu sanitasi input pengguna untuk mencegah SQL Injection dan XSS.
- Gunakan parameterized queries atau ORM yang aman (misalnya Prisma ORM).
- Jangan pernah menyimpan rahasia (secrets), private key, atau kredensial API secara hardcoded di dalam kode program.
