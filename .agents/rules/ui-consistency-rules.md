# Aturan Tata Kelola Konsistensi UI (UI Consistency Rules)

Aturan ini mengikat seluruh agen dan developer saat merancang, membangun, atau memodifikasi antarmuka pengguna (Frontend UI).

---

## 1. Prinsip Generatif Mandiri (Autonomous Synthesis without Starter Templates)
Agen AI **DILARANG MENGELUH ATAU TERGANTUNG PADA BERKAS BOILERPLATE/STARTER TEMPLATE**. Agen wajib mampu membuat komponen baru dan halaman pratinjaunya secara mandiri dari nol dengan mengikuti formula berikut:

### A. Formula Pemetaan Token ke Komponen (Token Mapping Recipe)
Selalu baca `docs/ui-governance/token-design.json` sebagai DNA generatif:
1. **Container / Surface**:
   - Class dasar: `bg-white dark:bg-stone-900 border border-[#EAE6DF] dark:border-[#2E2B27] rounded-3xl p-6 shadow-sm`
2. **Primary Action Button**:
   - Class dasar: `px-7 py-2.5 rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-semibold tracking-wide transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2`
3. **Secondary / Neutral Pill**:
   - Class dasar: `px-7 py-2.5 rounded-full bg-[#EFECE6] dark:bg-[#262320] text-stone-900 dark:text-stone-100 text-xs font-semibold tracking-wide hover:bg-[#E5E1D9] transition-transform active:scale-95`
4. **Accent & Status**:
   - Terracotta: `#E25822` (badge aktif, tautan sorot, progress line).
   - Gold: `#EAB308` (tier badge, star rating).
5. **Tipografi Wajib**:
   - Judul & Heading: `font-serif` (Playfair Display / Cormorant) + `font-semibold`.
   - Antarmuka & Label: `font-sans` (Plus Jakarta Sans / Inter) + `text-xs` atau `text-sm`.
   - Kode & Angka Finansial: `font-mono` (JetBrains Mono).

---

## 2. Standar 6 State Wajib Komponen
Setiap komponen interaktif yang disintesis wajib memiliki penanganan 6 status:
1. **Default**: Tampilan tenang, kontras rasio minimal 4.5:1 (WCAG AA).
2. **Hover**: Transisi posisi mikro (`hover:-translate-y-0.5` atau `hover:scale-105`) dengan durasi 150–200ms `ease-out`.
3. **Focus-Visible**: Cincin fokus yang jelas (`focus:ring-2 focus:ring-offset-2`) untuk navigasi keyboard (TAB).
4. **Active**: Efek sentuh mikro saat ditekan (`active:scale-95`).
5. **Disabled**: Opasitas redup (`opacity-50 cursor-not-allowed`) dan nonaktif secara fungsional.
6. **Loading**: Indikator spinner circular stroke atau pulse state.

---

## 3. Resep Perakitan Halaman Pratinjau (Preview Assembler Recipe)
Saat diminta membuat atau memperbarui `preview.html` tanpa template acuan, AI wajib mengikuti struktur:
1. **Skeleton**: HTML5 modern + CDN Tailwind CSS + Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`).
2. **Outer Frame**: Kanvas bernuansa hangat `#FAF8F5` (mode gelap: `#141312`) dengan kontainer utama `rounded-4xl` atau `rounded-5xl` bertepi tipis `#EAE6DF`.
3. **Header Editorial**: Judul besar font serif `"Design System"`, subtitle monospace pelacak versi, dan tombol pengalih tema (*Dark/Light Mode Switcher*).
4. **Bento Grid**: Grid responsif (1 kolom di layar kecil, 2-3 kolom di desktop) mengemas kartu-kartu komponen putih (`rounded-3xl`).
5. **Skrip Interaktif Ringan**: JavaScript murni tanpa framework untuk mengaktifkan toggle mode gelap, interaksi checkbox/radio, dropdown, slider, dan accordion.

---

## 4. Larangan Redundansi Komponen (No Reinventing the Wheel)
- Sebelum membangun fitur antarmuka baru, selalu periksa apakah template komponen sudah terdaftar:
  ```powershell
  npx tsx scripts/kanban.ts component:check <nama-komponen>
  ```
- Jika sudah ada di `docs/ui-governance/components/`, gunakan langsung template tersebut.
- Jika belum ada, sintesis komponen baru mengikuti aturan di atas, simpan ke `docs/ui-governance/components/template-[nama].html`, sajikan kepada pengguna untuk ditinjau, lalu publikasikan ke NeoKanban (`component:publish`).
