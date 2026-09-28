# Aturan Living Handoff Harian & Pembaruan Berkala (Periodic Handoff Protocol)

Dokumen `docs/HANDOFF.md` dan arsip harian `docs/handoffs/YYYY-MM-DD/handoff-[nama-sendiri].md` adalah jembatan memori aktif bagi asisten AI Antigravity. Sistem ini menjamin kontinuitas pengerjaan secara berkala tanpa kehilangan jejak progres sedikit pun.

---

## 1. Penyimpanan Lokal Terstruktur Per Hari (Daily Folder Archive)
- Setiap berkas sesi mandiri disimpan di direktori bertanggal sesuai hari eksekusi:
  📂 **`docs/handoffs/YYYY-MM-DD/handoff-<nama-sendiri>.md`**
  *(Contoh: `docs/handoffs/2026-09-28/handoff-init-harness.md`, `docs/handoffs/2026-09-28/handoff-auth-jwt.md`)*.
- Berkas utama **`docs/HANDOFF.md`** di root folder `docs/` selalu menyimpan blok konteks sesi paling mutakhir di posisi paling atas dengan pembatas visual yang tegas (`═════════════════════`).

---

## 2. Pembaruan Berkala pada Setiap Aktivitas (Continuous Periodic Updates)
Antigravity dan CLI helper **WAJIB** memperbarui handoff secara berkala pada setiap siklus aktivitas:
1. **Saat Menerbitkan Plan (`publish`)**:
   - Catat task baru yang masuk ke kolom `To Do`.
2. **Saat Memulai Task (`start`)**:
   - Catat branch fitur yang dibuat dan kartu yang berpindah ke `In Progress`.
3. **Saat Verifikasi Selesai (`review`)**:
   - Catat bukti eksekusi test (100% PASS), commit git, dan perpindahan kartu ke kolom `Review`.
4. **Saat Penutupan Sesi / Selesai Sprint**:
   - Perbarui ringkasan keseluruhan dan siapkan poin *Next Actionable Steps*.

---

## 3. Penyelarasan Ganda (Dual-Sync: Lokal + NeoKanban)
Setiap kali handoff diperbarui:
1. **Di Lokal**: Berkas harian `docs/handoffs/YYYY-MM-DD/handoff-<nama-sendiri>.md` dan `docs/HANDOFF.md` diperbarui.
2. **Di NeoKanban**: Berkas diunggah/diperbarui langsung ke **Living Context** papan proyek aktif sebagai **`handoff-<nama-sendiri>.md`** (via API atau tool MCP `update_board_context`).

---

## 4. Protokol Membaca Saat Sesi Baru Dimulai (Session Start Rule)
- Di awal setiap sesi, Antigravity **WAJIB** membaca blok sesi paling atas di `docs/HANDOFF.md` atau berkas context di NeoKanban.
- Pahami konteks terakhir, branch aktif, dan langsung eksekusi *Next Actionable Steps* tanpa perlu menanyakan "kemarin sampai mana?" kepada pengguna.
