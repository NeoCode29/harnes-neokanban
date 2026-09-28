# Aturan Konsistensi Antarmuka (UI Consistency & Primitive Rules)

Aturan ini mencegah inkonsistensi visual, duplikasi styling (*style drift*), dan pembuatan komponen ad-hoc saat multi-agent atau developer membangun antarmuka web.

---

## 1. Arsitektur Pertahanan 3 Lapis (The 3-Layer Defense)

```
┌────────────────────────────────────────────────────────────────────────┐
│ LAPIS 1: Registry Komponen Primitif Terpusat (Strict Shared UI Kit)     │
│ - Wajib pakai komponen baku: PageHeader, FilterBar, DataTable, Modal   │
│ - Dilarang keras membuat kontainer/header custom ad-hoc di page        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ LAPIS 2: Gatekeeper Review Khusus oleh `ux-ui-pro-max`                 │
│ - Audit visual wajib sebelum kartu kanban pindah ke kolom 'Review'     │
│ - Checklist 5 poin: No double-header, glassmorphism, 6-state, A11y     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ LAPIS 3: Living Design System di NeoKanban (`design-system.md`)         │
│ - Living Context terpusat: Color tokens, spacing, typography, radius   │
│ - Single source of truth yang dibaca seluruh agen sebelum mendesain    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Lapis 1: Registry Komponen Primitif Wajib (Strict Shared Primitives)

Setiap proyek wajib menyediakan dan mengonsumsi komponen dasar dari folder terpusat (`components/ui/` atau `components/shared/`):

| Komponen Primitif | Fungsi Standar | Aturan Penggunaan |
| :--- | :--- | :--- |
| `<PageHeader />` | Judul halaman, subtitle, breadcrumb, tombol aksi utama | **Hanya 1 per halaman**. Dilarang membuat sub-header redundan (*anti-double header*). |
| `<FilterBar />` | Pencarian, dropdown filter status, tombol reset | Wajib bergaya glassmorphism terpadu (`backdrop-blur-md border rounded-2xl`). |
| `<DataTable />` | Tabel data terstandarisasi dengan pagination & sorting | Wajib memiliki overflow wrapper horizontal dan checkbox seragam. |
| `<StatsCard />` | Kartu KPI / statistik ringkasan dashboard | Format angka, ikon aksen, dan tren persentase seragam. |
| `<StatusBadge />` | Pill penanda status entitas (Aktif, Non-aktif, Pending) | Menggunakan warna semantik: hijau (success), kuning (warning), merah (destructive), abu-abu (muted). |
| `<EmptyState />` | Tampilan saat data kosong | Ikon ramah, teks penjelas, tombol aksi baru (CTA). |
| `<LoadingSkeleton />` | Shimmer saat data memuat | Wajib mempertahankan dimensi/layout asli data (bukan spinner layar penuh). |

> [!CAUTION]
> **Larangan Ad-Hoc:** Agen **DILARANG KERAS** menyusun utility classes panjang dari nol di dalam file page (`pages/` atau `app/`) untuk membuat card, header, atau filter bar baru jika komponen primitifnya sudah ada.

---

## 3. Lapis 2: Gatekeeper Review Khusus oleh `ux-ui-pro-max`

Setiap kartu tugas di papan NeoKanban yang memodifikasi berkas UI (`.tsx`, `.jsx`, `.css`, folder `components/` atau `pages/`) wajib melewati **Visual Consistency Audit** oleh spesialis `ux-ui-pro-max`:

### Checklist Audit Wajib (5 Poin):
1. **Single Header Check**: Memastikan tidak ada *double header* atau redundansi judul dan pill informal.
2. **Glassmorphism & Surface**: Memastikan filter bar, card, dan panel menggunakan styling surface dan shadow yang selaras.
3. **6-State Completeness**: Komponen harus memiliki penanganan visual lengkap: *empty*, *loading skeleton*, *error alert*, *success toast*, *hover/active*, dan *focus-visible ring*.
4. **Accessibility (WCAG AA)**: Rasio kontras teks min 4.5:1, touch target min 44×44px, dan `aria-label` pada tombol icon-only.
5. **Zero Arbitrary Values**: Bebas dari nilai acak seperti `p-[19px]` atau warna hex liar `#3a5b2c` (wajib gunakan token Tailwind / CSS variable resmi).

> **Hard Rule**: Kartu tugas antarmuka **DILARANG PINDAH KE KOLOM REVIEW** jika belum mencantumkan stempel kelulusan visual `### 🎨 UI/UX Consistency Stamp: APPROVED` di dalam laporan verifikasinya.

---

## 4. Lapis 3: Living Design System di NeoKanban (`design-system.md`)
- Setiap papan proyek di NeoKanban menyimpan berkas konteks **`design-system.md`**.
- Dokumen ini mendefinisikan palet warna resmi (`primary`, `secondary`, `accent`, `muted`, `background`), skala tipografi, border-radius, dan konvensi layout proyek yang aktif.
- Agen wajib membaca konteks ini sebelum mulai mendesain tampilan baru.
