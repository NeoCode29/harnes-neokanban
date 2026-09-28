# Interactive Project Dashboard UI Specification

**Tanggal:** 2026-09-28  
**Status:** APPROVED  
**Author:** Antigravity (Spesialis UX/UI Pro Max & Frontend)  

---

## 1. Latar Belakang & Tujuan
Menyediakan antarmuka dashboard visual yang elegan, cepat, dan responsif untuk memantau progres pengembangan proyek, metrik task NeoKanban (To Do, In Progress, Review, Done), riwayat aktivitas sesi (Living Handoff), dan status token desain antarmuka tanpa dependensi berat (Zero RAG & Zero Heavy Frameworks).

---

## 2. User Journey & Alur Kerja
1. **Pemeriksaan Metrik Proyek:** Pengguna membuka antarmuka dashboard dan langsung melihat 4 kartu statistik utama:
   - Total Task & Completion Rate (%)
   - Task Sedang Dikerjakan (In Progress)
   - Task Menunggu Review (Review Gate)
   - Status Living Handoff Terakhir
2. **Visualisasi Kolom Kanban:** Pengguna dapat meninjau ringkasan kartu per kolom kanban dengan tag spesialis domain (`ux-ui-pro-max`, `frontend`, `backend`, dll).
3. **Timeline Riwayat Sesi:** Pengguna dapat melihat daftar linimasa aktivitas terkini dari berkas `docs/handoffs/YYYY-MM-DD/`.
4. **Resilience & Responsivitas:** Desain responsif (Mobile, Tablet, Desktop) dengan palet warna semantik dan glassmorphism sesuai `token-design.json`.

---

## 3. Arsitektur Komponen & UI Governance
Sesuai aturan **UI Consistency Governance**, antarmuka dibangun dengan komponen modular template HTML mandiri:

1. **`template-metric-card.html`**:
   - Komponen kartu statistik reusable dengan ikon SVG, judul metrik, nilai angka besar, badge perubahan status, dan latar belakang glass surface.
2. **`template-activity-timeline.html`**:
   - Komponen feed riwayat aktivitas yang menampilkan timestamp, nama sesi handoff, ringkasan aktivitas, dan tag branch.
3. **`template-kanban-board-preview.html`**:
   - Komponen visualisasi ringkas 4 kolom (To Do, In Progress, Review, Done) yang merefleksikan status kartu aktif.
4. **Halaman Utuh `public/index.html`**:
   - Merakit ketiga template komponen ke dalam antarmuka dashboard utuh yang interaktif dengan navigasi header dan user profile `@kresna`.

---

## 4. Standar Desain & Aksesibilitas (UX/UI Pro Max)
- **Token Design:** Menggunakan nilai dari `docs/ui-governance/token-design.json` (Font: Inter, JetBrains Mono; Surface: `surface.glass`, Border: `border.DEFAULT`, Status: `status.success`, `status.warning`, dll).
- **Aksesibilitas (WCAG AA):** Rasio kontras teks terhadap background minimal 4.5:1, penggunaan semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`), serta ARIA attributes.
- **Micro-interactions:** Transisi hover dan focus halus pada tombol/kartu (durasi 150ms–200ms, `cubic-bezier(0.4, 0, 0.2, 1)`).

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
- [ ] Template `template-metric-card.html` selesai dan lolos verifikasi visual.
- [ ] Template `template-activity-timeline.html` selesai dan lolos verifikasi visual.
- [ ] Template `template-kanban-board-preview.html` selesai dan lolos verifikasi visual.
- [ ] File dashboard `public/index.html` dapat dibuka langsung di browser dengan tampilan bersih dan modern.
- [ ] Data provider sederhana di TypeScript (`src/dashboard-data.ts`) dapat mengagregasi status task dan handoff dengan unit test 100% lulus.
- [ ] Seluruh komponen template didaftarkan dan lolos uji CLI `kanban component:publish`.
