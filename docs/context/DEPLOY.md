# Deployment & Infrastructure Context

---

## 1. Lingkungan (Environments)

- **Development**: Lokal (`localhost`), hot-reload, database lokal/docker.
- **Staging**: Lingkungan pengujian terintegrasi sebelum rilis publik.
- **Production**: Lingkungan langsung pengguna dengan optimasi penuh dan monitoring.

---

## 2. Environment Variables yang Dibutuhkan

```bash
# App Configuration
NODE_ENV=production
PORT=3000
APP_URL=https://app.example.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require

# Auth & Secrets
JWT_SECRET=super-secret-random-string
API_SECRET_KEY=secret-key-value
```

---

## 3. Checklist Sebelum Deploy (Pre-flight)

- [ ] Seluruh unit test & integration test lulus 100% (`npm test`).
- [ ] Build production selesai tanpa error/type error (`npm run build`).
- [ ] Migrasi database diterapkan dengan sukses pada target staging/prod.
- [ ] Seluruh environment variables telah dikonfigurasi di platform hosting (e.g. Vercel, Railway, Docker, AWS).
- [ ] Header keamanan dasar (CORS, CSP, Helmet) telah terpasang.
