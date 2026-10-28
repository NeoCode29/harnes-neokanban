# Security Context & Guidelines

---

## 1. Perlindungan Rahasia (Secret Management)

1. **Larangan Keras Hardcoding**: Dilarang menuliskan secret, token, API key, JWT secret, atau connection string database langsung di dalam kode sumber.
2. **Environment Variables**: Gunakan berkas `.env` untuk konfigurasi sensitif. Pastikan `.env` terdaftar di `.gitignore`.
3. **Penyimpanan Lokal NeoKanban**: Berkas konfigurasi lokal `.neokanban.json` berisi token PAT dan wajib diabaikan oleh Git.

---

## 2. Sanitasi & Validasi Input

1. **Validasi Skema**: Seluruh input eksternal dari form atau endpoint API wajib divalidasi menggunakan skema deklaratif (misal: Zod, Valibot, atau Yup).
2. **Pencegahan Injection**:
   - **SQL Injection**: Selalu gunakan parameterized query atau ORM/Query Builder.
   - **XSS**: Gunakan escaping bawaan template framework; hindari `dangerouslySetInnerHTML` tanpa pustaka sanitasi (DOMPurify).

---

## 3. Otorisasi & Akses Data

1. **Prinsip Least Privilege**: Pengguna atau peran sistem hanya boleh memiliki hak akses minimum yang diperlukan untuk menyelesaikan tugasnya.
2. **Validasi Sisi Server**: Jangan pernah mengandalkan validasi di browser/klien saja. Seluruh aturan otorisasi wajib diverifikasi ulang di backend.

---

## 4. Audit Keamanan Otomatis (Trail of Bits Rigor)

Gunakan skill [`security-audit`](../../.agents/skills/security-audit/SKILL.md) dan CLI harness untuk memindai kerentanan sebelum merge atau deployment:
```powershell
npm run kanban -- security:audit
```
Pemeriksaan mencakup:
1. **Git Hygiene & Secret Hunting**: Memastikan tidak ada berkas `.env` atau kredensial yang lolos ke Git.
2. **Supply Chain Audit**: Memindai seluruh dependensi paket pihak ketiga (`npm audit`) dari CVE berisiko tinggi.
3. **AST Static Analysis (SAST)**: Pemindaian pola kode rentan dengan Semgrep (telemetri dinonaktifkan: `--metrics=off`).

