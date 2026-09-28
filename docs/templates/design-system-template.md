# Living Design System Specification

Dokumen ini adalah **Single Source of Truth** untuk konsistensi desain antarmuka proyek. Simpan dan sinkronkan file ini ke papan NeoKanban sebagai berkas context `design-system.md`.

---

## 1. Color Palette Tokens

| Token Semantik | Tailwind Class | Nilai HEX / Variable | Peruntukan |
| :--- | :--- | :--- | :--- |
| `primary` | `bg-primary`, `text-primary` | `var(--primary)` | Aksi utama, tombol submit, link aktif |
| `secondary` | `bg-secondary`, `text-secondary` | `var(--secondary)` | Aksi sekunder, pill filter pasif |
| `accent` | `bg-accent`, `text-accent` | `var(--accent)` | Sorotan KPI, badge notifikasi |
| `muted` | `bg-muted`, `text-muted-foreground` | `var(--muted)` | Teks deskripsi, latar belakang subtle |
| `destructive` | `bg-destructive`, `text-destructive` | `var(--destructive)` | Tombol hapus, alert error kritis |
| `background` | `bg-background`, `text-foreground` | `var(--background)` | Kanvas utama halaman |
| `surface` | `bg-surface` / glassmorphism | `bg-white/80 dark:bg-slate-900/80` | Card, panel, dialog, filter bar |
| `border` | `border-border` | `var(--border)` | Garis pemisah, outline input |

---

## 2. Tipografi & Skala Spasi

- **Font Family:** Inter / Plus Jakarta Sans / System sans-serif.
- **Teks Dasar (Body):** `16px` (`text-base`), line-height: `1.5` (`leading-relaxed`).
- **Heading Hierarchy:**
  - `H1 (Page Title):` `text-2xl font-bold tracking-tight` (desktop: `text-3xl`)
  - `H2 (Section Title):` `text-xl font-semibold tracking-tight`
  - `H3 (Card Title):` `text-lg font-medium`
  - `Subtitle / Caption:` `text-sm text-muted-foreground`
  - `Micro / Badge text:` `text-xs font-medium` (Dilarang menggunakan teks < 11px)

---

## 3. Border Radius & Surface Elevation

- **Modal & Container Utama:** `rounded-2xl shadow-xl`
- **Filter Bar & Surface Cards:** `rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-md`
- **Form Input & Button:** `rounded-xl` atau `rounded-lg`
- **Status Badges / Pills:** `rounded-full px-3 py-1 text-xs font-semibold`

---

## 4. Pola Kanonik Komponen (Canonical UI Patterns)

### A. Pola Filter Bar Terpadu (Hardware Logs Pattern)
```tsx
<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
  <div className="flex flex-wrap items-center gap-3">
    <SearchInput placeholder="Cari..." />
    <SelectFilter options={statusOptions} />
  </div>
  <Button variant="ghost" onClick={handleReset}>Reset Filter</Button>
</div>
```

### B. Pola Page Header Tunggal (Anti-Double Header)
```tsx
<PageHeader
  title="Manajemen Pengguna"
  description="Kelola akun sivitas akademika, role, dan hak akses sistem."
  action={<Button variant="primary">+ Tambah Pengguna</Button>}
/>
```
