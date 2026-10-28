# System Architecture & Technical Specifications

---

## 1. Tech Stack Overview

- **Frontend**: [e.g., React 19 / Next.js 15 / Vite, Vanilla CSS / Tailwind CSS]
- **Backend / Runtime**: [e.g., Node.js / Bun / Python FastAPI]
- **Database / ORM**: [e.g., PostgreSQL / SQLite via Prisma ORM]
- **State Management**: [e.g., Zustand / React Query / Context API]
- **Testing Framework**: [e.g., Vitest / Jest / Playwright]

---

## 2. Struktur Direktori Proyek

```
project-root/
├── .agents/              # Aturan, skill, dan spesialis Antigravity
├── docs/
│   ├── context/          # Living Context sistem terintegrasi NeoKanban
│   ├── plans/            # Rencana implementasi task terurai
│   └── ui-governance/    # Token desain dan template komponen
├── src/                  # Kode sumber aplikasi utama
│   ├── components/       # Komponen antarmuka yang dapat digunakan ulang
│   ├── features/         # Modul fitur berbasis domain
│   ├── lib/              # Utilitas, helper, dan konfigurasi klien
│   └── services/         # Integrasi API atau akses data
├── tests/                # Unit test dan integration test
└── scripts/              # Script otomatisasi dan CLI harness
```

---

## 3. Diagram Alur Data (Data Flow)

```
[Pengguna / Klien]
        │  (HTTP / UI Event)
        ▼
[Routing & Komponen UI]
        │  (Validasi Input & State)
        ▼
[Service Layer / Business Logic]
        │  (Query / Mutasi)
        ▼
[Database / Storage Layer]
```

---

## 4. Pola Desain & Standar Teknis

1. **Prinsip Modularity**: Kode harus terisolasi per fitur (feature-first architecture) untuk meminimalkan ketergantungan antar modul.
2. **Keterbacaan & Kesederhanaan**: Mengutamakan kode deklaratif yang bersih, hindari over-abstraksi (YAGNI).
