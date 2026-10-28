# Living Handoff Context

> **Catatan**: Status pengerjaan aktif proyek ini dipelihara secara real-time di [`docs/HANDOFF.md`](../HANDOFF.md) dan disinkronkan ke Living Context NeoKanban.

---

## 1. Peran Living Handoff

Living Handoff menjamin kontinuitas pengerjaan lintas sesi dan subagent tanpa *information loss*:
- **Start of Session**: Asisten otomatis membaca dokumen ini untuk mengetahui branch aktif, pekerjaan terakhir, dan langkah berikutnya.
- **Continuous Periodic Sync**: Setiap penyelesaian task atau penutupan sesi dicatat menggunakan perintah:
  ```powershell
  npm run kanban -- handoff "<nama-sesi>" --summary "<ringkasan>"
  ```

---

## 2. Struktur Data Handoff Terstandar

Setiap blok sesi memuat:
1. **Header Sesi**: Tanggal, waktu, nama sesi, dan pembatas visual yang tegas.
2. **Metadata**: Operator/Agent, branch aktif.
3. **Ringkasan Aktivitas**: Apa yang baru saja diselesaikan.
4. **Status Kartu**: To Do, In Progress, Review, Done.
5. **Status Pengujian**: Hasil kelulusan unit test (e.g. 100% Passed).
6. **Next Actionable Steps**: Daftar 2–3 langkah berikutnya yang siap dieksekusi.
