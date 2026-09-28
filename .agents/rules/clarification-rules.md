# Aturan Klarifikasi Interaktif & Pemahaman Mendalam (Interactive Clarification & Pre-Understanding Protocol)

Aturan ini adalah kebiasaan operasional utama (*primary operating habit*) bagi Antigravity setiap kali menerima permintaan (*request*) dari pengguna.

---

## 1. Prinsip Inti: "Pahami Dulu, Klarifikasi Tanpa Celah"

Setiap kali pengguna meminta suatu fitur, perubahan, atau topik baru, asisten **DILARANG LANGSUNG MEMBUAT ASUMSI ATAU LANGSUNG CODING**. Alur kerja wajib mengikuti 2 tahap:

```
[User Request] 
      │
      ▼
[Tahap 1: Deep Pre-Understanding] ──► Eksplorasi kode, arsitektur & domain hingga paham 100%
      │
      ▼
[Tahap 2: Interactive Clarification] ──► Bertanya interaktif (ask_question) tanpa celah informasi
      │
      ▼
[Tahap 3: Eksekusi Disiplin] ──► Brainstorming Spec -> Writing Plans -> Kanban Sync -> TDD
```

---

## 2. Tahap 1: Deep Pre-Understanding (Pahami Terlebih Dahulu)
Sebelum mengajukan pertanyaan atau membuat solusi:
1. **Baca Kode & Konteks Relevan**: Selalu periksa file, skema, antarmuka, dan dependensi yang terkait dengan topik yang diminta.
2. **Identifikasi Titik Kritis**: Pahami alur data, komponen yang terpengaruh, potensi efek samping (*side-effects*), dan kendala sistem yang ada.
3. **Kesiapan Mental**: Jangan bertanya hal-hal dasar yang sudah jelas terjawab di dalam codebase. Pertanyaan harus berbobot dan terarah pada keputusan desain/preferensi bisnis.

---

## 3. Tahap 2: Interactive Clarification (Pertanyaan Interaktif Tanpa Celah)
Gunakan tool interaktif bawaan (`ask_question`) untuk memvalidasi kebutuhan pengguna:
1. **Gunakan Opsi Terstruktur**: Format opsi jawaban secara konkret, jangan memberikan pertanyaan mengambang. Berikan rekomendasi yang jelas dengan awalan `(Recommended)`.
2. **Cakupan Validasi Tanpa Celah**:
   - **Scope & Boundaries**: Apa saja yang termasuk dan yang tidak termasuk dalam scope ini?
   - **UX & Flow**: Bagaimana alur interaksi pengguna (state loading, error, empty state)?
   - **Data & Logika Bisnis**: Validasi input, batasan kuota, format data, dan aturan izin/akses.
   - **Edge Cases**: Apa yang harus terjadi jika kondisi ekstrem atau kegagalan jaringan terjadi?
3. **Eksekusi Setelah Konfirmasi**: Rencana kerja (*implementation plan*) hanya boleh ditulis setelah seluruh opsi interaktif dijawab dan disepakati oleh pengguna.
