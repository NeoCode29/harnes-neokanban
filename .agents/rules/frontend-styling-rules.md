# Aturan Desain & Styling Frontend (Frontend Styling Rules)

Aturan ini mengikat seluruh pengembangan antarmuka pengguna pada proyek-proyek di dalam harness ini.

---

## 1. Desain Berbasis Token (Token-Based Design)
- **Warna Semantik**: Selalu gunakan token kelas warna semantik atau variabel CSS (misalnya `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`).
- **Hindari Arbitrary Values**: Jangan gunakan arbitrary values seperti `w-[327px]` atau `text-[#234567]` kecuali ada kebutuhan grafis khusus yang mutlak. Gunakan skala Tailwind resmi (`w-80`, `text-sm`, `p-4`, `gap-3`).
- **Border Radius Terpadu**: Pertahankan konsistensi lengkung sudut:
  - Kartu/Modal: `rounded-2xl` atau `rounded-xl`
  - Input/Button: `rounded-lg` atau `rounded-md`
  - Badge/Pill: `rounded-full`

---

## 2. Standar Glassmorphism & Surface Elevation
Untuk komponen dashboard dan filter bar modern:
- Gunakan surface semi-transparan yang elegan:
  `bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-sm`
- Hindari shadow yang terlalu pekat/kotor. Gunakan shadow multi-lapisan halus (`shadow-sm`, `shadow-md`).

---

## 3. Ketahanan Responsif (Responsive Resilience)
- **Mobile First**: Awali desain dari viewport kecil (`w-full`), lalu tambahkan responsivitas bertahap (`sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
- **Cegah Overflow**:
  - Teks panjang harus memiliki perlindungan: `truncate` atau `line-clamp-2`.
  - Tabel harus dibungkus dalam container: `overflow-x-auto`.
  - Kontainer utama tidak boleh memicu horizontal scrollbar pada layar 360px–1920px.

---

## 4. Aksesibilitas & Micro-Interactions
- Tombol tanpa teks wajib memiliki atribut `aria-label="Deskripsi fungsi"`.
- Setiap tombol harus memiliki transisi halus: `transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none`.
- Selalu sediakan status visual saat proses async berlangsung: `isLoading ? <Loader2 className="animate-spin" /> : <Icon />`.
