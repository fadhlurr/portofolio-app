# Product Requirements Document
## Portfolio Website — bbbyfadhlur.com

**Owner:** Fadhlur Selian
**Status:** Live (Production)
**Terakhir diupdate:** 18 Agustus 2026

---

## 1. Latar Belakang & Tujuan

Portfolio pribadi berbasis full-stack web app, dibuat untuk menampilkan profil, project, skill, dan tulisan (journal) milik Fadhlur Selian ke calon klien, recruiter, atau kolaborator. Berbeda dari portfolio statis kebanyakan, project ini dibangun dengan arsitektur full-stack (backend + database) supaya kontennya bisa dikelola secara dinamis tanpa perlu edit kode setiap update.

**Tujuan utama:**
- Menampilkan identitas profesional yang khas, bukan template generik
- Menunjukkan kemampuan full-stack (bukan cuma frontend) sebagai bagian dari portfolio itu sendiri
- Memudahkan pengelolaan konten (project, skill, journal) lewat API tanpa redeploy kode

---

## 2. Target Pengguna

| Peran | Kebutuhan |
|---|---|
| Recruiter / HR | Cepat menilai kompetensi & melihat contoh kerja nyata |
| Calon klien | Memahami value proposition dan cara menghubungi |
| Sesama developer | Melihat detail teknis project (tech stack, tantangan) |
| Pemilik (admin) | Mengelola konten tanpa harus coding ulang |

---

## 3. Ruang Lingkup Fitur

### 3.1 Halaman Publik
- **Hero** — perkenalan singkat, CTA, status availability, social links
- **About** — deskripsi diri dan fokus kerja
- **Values** — 4 nilai/keunggulan utama
- **Projects** — daftar project (dari database), tiap project punya halaman detail terpisah (`/projects/:slug`) berisi overview, tech stack, tantangan, dan link demo/repo
- **Skills** — daftar skill per kategori dengan progress bar (dari database)
- **Journal** — daftar tulisan (dari database), tiap tulisan punya halaman detail (`/journal/:slug`)
- **Contact** — form kontak yang tersimpan ke database
- **Dark mode** — toggle tema terang/gelap

### 3.2 Admin / Pengelolaan Konten
- CRUD Projects, Journal Posts, Skills lewat REST API (protected by admin key)
- Contact messages bisa dilihat lewat API (admin only)
- *(Belum ada UI admin — pengelolaan saat ini masih lewat API call langsung/curl)*

---

## 4. Arsitektur & Tech Stack

```
┌─────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│  Frontend        │  HTTP  │  Backend          │  SQL   │  Database        │
│  React + Vite    │◄──────►│  Express + MVC    │◄──────►│  PostgreSQL      │
│  (Vercel)        │        │  (Railway)        │        │  (Supabase)      │
└─────────────────┘        └──────────────────┘        └─────────────────┘
```

**Frontend**
- React 18 + Vite
- React Router (routing multi-halaman: Home, Project Detail, Journal Detail)
- CSS custom (design tokens: warna cream/beige, aksen terracotta, tipografi Fraunces + Inter)
- Hosting: **Vercel**

**Backend**
- Node.js + Express (arsitektur MVC: Model – Controller – Route)
- Sequelize ORM
- Middleware: admin auth (API key), central error handler
- Hosting: **Railway**

**Database**
- PostgreSQL
- Hosting: **Supabase** (managed Postgres)
- Tabel: `projects`, `journal_posts`, `skills`, `contact_messages`

**Repository & CI**
- Version control: GitHub (`fadhlurr/portofolio-app`)
- Auto-deploy: push ke `main` trigger redeploy otomatis di Railway & Vercel

---

## 5. Model Data (Ringkas)

**Project**
`id, title, slug, category, description, content, techStack[], thumbnailUrl, demoUrl, repoUrl, featured, order`

**JournalPost**
`id, title, slug, excerpt, content, publishedAt`

**Skill**
`id, category, name, proficiency, order`

**ContactMessage**
`id, name, email, message, read, createdAt`

---

## 6. API Endpoints (Ringkas)

| Method | Endpoint | Akses |
|---|---|---|
| GET | `/api/projects` | Publik |
| GET | `/api/projects/:slug` | Publik |
| POST/PUT/DELETE | `/api/projects` | Admin (`x-admin-key`) |
| GET | `/api/journal` | Publik |
| GET | `/api/journal/:slug` | Publik |
| POST/PUT/DELETE | `/api/journal` | Admin |
| GET | `/api/skills` | Publik |
| POST/PUT/DELETE | `/api/skills` | Admin |
| POST | `/api/contact` | Publik |
| GET | `/api/contact` | Admin |

---

## 7. Non-Functional Requirements

- **Keamanan**: write endpoint dilindungi API key sederhana; kredensial database & admin key disimpan sebagai environment variable, tidak pernah masuk ke repository (`.gitignore` mencakup `.env`, `node_modules`)
- **Performa**: hosting serverless/managed (Vercel, Railway) untuk auto-scaling dasar tanpa pengelolaan server manual
- **Ketersediaan**: menggunakan free tier Railway/Vercel/Supabase — cukup untuk portfolio personal, dengan catatan limit resource harus dipantau
- **Responsif**: layout menyesuaikan mobile & desktop

---

## 8. Di Luar Cakupan (Saat Ini)

- UI admin panel (pengelolaan konten masih lewat API call manual)
- Autentikasi login penuh (masih single admin key, bukan sistem user)
- Analytics/tracking pengunjung
- Multi-bahasa (saat ini Bahasa Indonesia saja)
- Automated testing (unit/integration test belum ada)

---

## 9. Rencana Pengembangan Selanjutnya

- [ ] Bangun halaman admin sederhana untuk CRUD project/journal tanpa curl
- [ ] Tambah 2–3 project riil lainnya selain Relationship Wrapped
- [ ] Hubungkan domain final `bbbyfadhlur.com` ke Vercel & subdomain `api.bbbyfadhlur.com` ke Railway
- [ ] Rotasi seluruh credential (database & admin key) sebagai langkah keamanan pasca-development
- [ ] Pertimbangkan menambah rate-limiting di endpoint `/api/contact` untuk mencegah spam

---

## 10. Riwayat Deployment

| Komponen | Platform | Status |
|---|---|---|
| Frontend | Vercel | ✅ Live |
| Backend API | Railway | ✅ Live |
| Database | Supabase | ✅ Live |
| Project sampingan: Relationship Wrapped | Railway (service terpisah) | ✅ Live |
