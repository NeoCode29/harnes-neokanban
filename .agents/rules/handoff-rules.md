# Aturan Living Handoff (Handoff Protocol Rules)

Dokumen `docs/HANDOFF.md` adalah jembatan memori antar-sesi bagi asisten AI Antigravity. Dokumen ini menjamin bahwa setiap sesi baru dapat langsung melanjutkan pekerjaan tanpa kehilangan konteks.

---

## 1. Aturan Membaca Saat Sesi Dimulai (Session Start Rule)
- **Kewajiban**: Di awal setiap sesi atau ketika pengguna memberikan instruksi baru, Antigravity **WAJIB** membaca `docs/HANDOFF.md` terlebih dahulu.
- **Tujuan**:
  1. Mengetahui di mana posisi pengerjaan terakhir ditinggalkan.
  2. Mengetahui kartu kanban mana yang sedang aktif atau menunggu review.
  3. Mengetahui langkah berikutnya (*Next Actionable Steps*) tanpa perlu bertanya ulang ke pengguna.

---

## 2. Aturan Memperbarui Saat Aktivitas Berlangsung (Activity Update Rule)
Antigravity **WAJIB** memperbarui `docs/HANDOFF.md` pada momen-momen kritis berikut:
1. **Setelah Menerbitkan Plan**: Catat plan baru dan kartu-kartu yang telah diterbitkan ke NeoKanban.
2. **Saat Transisi Kartu**: Ketika kartu mulai dikerjakan (`In Progress`), dipindahkan ke `Review`, atau disetujui ke `Done`.
3. **Setelah Eksekusi Pengujian / Build**: Catat bukti verifikasi terbaru (apakah tes lulus 100%, apakah build berhasil).
4. **Sebelum Sesi Berakhir / Menutup Aktivitas**: Tuliskan ringkasan apa yang telah diselesaikan dan apa langkah spesifik berikutnya (*Next Actionable Steps*) untuk sesi selanjutnya.

---

## 3. Struktur Standar `docs/HANDOFF.md`
Setiap pembaruan wajib mempertahankan struktur berikut:
1. **Metadata Sesi**: Tanggal, waktu, branch git aktif, status keseluruhan.
2. **Ringkasan Aktivitas Terakhir**: Poin-poin konkret pekerjaan yang telah selesai.
3. **Status Kartu & NeoKanban**: Daftar task pada kolom To Do, In Progress, Review, dan Done.
4. **Status Verifikasi Kualitas & Build**: Hasil eksekusi `npm test`, `npm run build`, linting, dll.
5. **Langkah Kerja Berikutnya**: 2–3 tindakan langsung yang harus diambil saat sesi baru dibuka.
