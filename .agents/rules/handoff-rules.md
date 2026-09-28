# Aturan Living Handoff & Pembatas Sesi (Handoff Protocol Rules)

Dokumen `docs/HANDOFF.md` dan arsip `docs/handoffs/handoff-[nama-sendiri].md` adalah jembatan memori antar-sesi bagi asisten AI Antigravity. Sistem ini menjamin kontinuitas pengerjaan tanpa kehilangan jejak progres.

---

## 1. Aturan Pembatas Sesi (Explicit Session Boundary)
Setiap pencatatan sesi **WAJIB** dipisahkan oleh pembatas visual yang jelas dan terstandarisasi:

```markdown
═══════════════════════════════════════════════════════════════════════════
## 🏁 SESI: [YYYY-MM-DD HH:mm] — <nama-sesi>
═══════════════════════════════════════════════════════════════════════════
- **Operator / Agent:** Antigravity (<spesialis>)
- **Branch Aktif:** `<branch>`
- **Waktu Pencatatan:** YYYY-MM-DD HH:mm

### 📌 Ringkasan Aktivitas Terakhir
[Poin-poin spesifik apa yang telah diselesaikan]

### 📋 Status Kartu & NeoKanban
- **To Do:** ...
- **In Progress:** ...
- **Review:** ...
- **Done:** ...

### 🧪 Verifikasi Kualitas & Test
- Unit tests: [X/X passed]
- Build status: [Exit 0]

### 🚀 Langkah Kerja Berikutnya (Next Actionable Steps)
1. [Langkah konkret pertama saat sesi baru dimulai]
2. [Langkah kedua]
═══════════════════════════════════════════════════════════════════════════
```

---

## 2. Penyimpanan `handoff-[nama-sendiri]` di NeoKanban & Lokal
Setiap kali sesi diselesaikan:
1. **Penyimpanan Lokal Mandiri**:
   - Berkas disimpan di `docs/handoffs/handoff-<nama-sendiri>.md` (misal: `handoff-auth-jwt.md`, `handoff-checkout-feature.md`).
2. **Penyimpanan di NeoKanban (Living Context)**:
   - Berkas handoff disinkronkan langsung ke papan NeoKanban aktif menggunakan MCP tool `update_board_context` atau CLI helper:
     ```powershell
     npx tsx scripts/kanban.ts handoff <nama-sendiri> --summary "..."
     ```
   - Di papan NeoKanban, berkas akan tersimpan sebagai context document bernama **`handoff-<nama-sendiri>.md`**, sehingga dapat langsung dibaca dan diakses oleh agen maupun pemilik proyek di antarmuka kanban.

---

## 3. Protokol Membaca Saat Sesi Baru Dimulai (Session Start Rule)
- Di awal setiap sesi, Antigravity **WAJIB** membaca blok sesi paling atas di `docs/HANDOFF.md` atau berkas context di NeoKanban.
- Pahami konteks terakhir, branch aktif, dan langsung eksekusi *Next Actionable Steps* tanpa perlu menanyakan "kemarin sampai mana?" kepada pengguna.
