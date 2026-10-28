# Workflow & Kanban Rules

## 1. Deep Pre-Understanding & Interactive Clarification
- **Pahami Dahulu (Zero Assumption)**: Sebelum menyusun solusi atau rencana, telusuri kode dan arsitektur terlebih dahulu secara menyeluruh.
- **Klarifikasi Interaktif (`ask_question`)**: Ajukan pertanyaan berstruktur via `ask_question` untuk memastikan cakupan fitur, alur pengguna, dan batasan teknis disepakati bersama pengguna.

## 2. Mandatory Feature Context Construction (`FEATURE_*.md`)
- **Wajib Bangun Konteks Fitur Fungsional**: Setelah memahami kebutuhan dan menyelesaikan klarifikasi awal, agen **WAJIB** menyusun dokumen spesifikasi fitur per modul (`docs/context/FEATURE_[NAMA_FITUR].md`) menggunakan acuan `docs/context/FEATURE_TEMPLATE.md`.
- **Kelengkapan Dokumen Fitur**: Setiap berkas konteks fitur wajib memuat:
  1. Ikhtisar & Tujuan Fitur (domain bisnis & target peran/role).
  2. Kebutuhan Fungsional & Acceptance Criteria (checklist terukur).
  3. Skema Data & Model Terkait (tabel basis, atribut kunci, status).
  4. Kontrak API & Endpoints Terkait (method, route, payload, response).
  5. Halaman UI, Komponen, dan Hook Terkait.
  6. Alur Interaksi Pengguna (User Journey step-by-step).
- **Larangan Melompat ke Plan**: Agen **DILARANG KERAS** membuat implementation plan (`docs/plans/`) atau menulis kode sebelum seluruh konteks fitur fungsional terdokumentasi dan didaftarkan pada matriks `docs/context/INDEX.md`.

## 3. Siklus Kartu NeoKanban & Safe Review Gate
- **Papan sebagai Source of Truth**: Setiap task development harus terdaftar di kartu NeoKanban / `.kanban-map.json`.
- **Transisi Kolom**:
  1. `To Do`: Kartu yang telah dipublikasikan dan siap dikerjakan.
  2. `In Progress`: Mulai dikerjakan (`npm run kanban start <cardId>`) di branch terisolasi.
  3. `Review`: Setelah seluruh checklist dan pengujian lulus (`npm run kanban review <cardId> --report "..."`).
  4. `Done`: **HANYA boleh dipindahkan oleh pengguna/human developer**. Agen dilarang keras melakukan auto-done.

## 3. Living Handoff Protocol
- **Baca di Awal Sesi**: Asisten wajib membaca `docs/HANDOFF.md` di awal sesi untuk mengidentifikasi branch aktif, fokus terakhir, dan langkah berikutnya.
- **Update Bounded**: Pembaruan handoff dicatat langsung ke `docs/HANDOFF.md` dan disinkronkan ke Living Context NeoKanban tanpa menghasilkan tumpukan file log harian baru.
