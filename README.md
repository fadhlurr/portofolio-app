# Portfolio — Full Stack (MVC Backend + React Frontend + PostgreSQL)

Struktur:
```
portfolio-app/
  backend/     → Node.js + Express (MVC) + Sequelize + PostgreSQL
  frontend/    → React + JSX (Vite) + React Router
```

---

## 1. Setup Database (PostgreSQL)

Pastikan PostgreSQL sudah terinstall dan jalan di komputer/server kamu. Lalu buat database baru:

```bash
psql -U postgres
CREATE DATABASE portfolio_db;
\q
```

## 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit file `.env`, sesuaikan `DATABASE_URL` dengan kredensial Postgres kamu:
```
DATABASE_URL="postgresql://postgres:password_kamu@localhost:5432/portfolio_db"
```

Jalankan server (Sequelize otomatis bikin tabel-tabel yang belum ada saat server start, lewat `sequelize.sync()` — gak perlu migration terpisah buat mulai):
```bash
npm run dev
```

Kalau muncul log `Database connected.` dan `Models synced with database.`, berarti tabel sudah otomatis dibuat di Postgres.

Buka terminal baru, isi database dengan data awal (Relationship Wrapped project, skills, dst):
```bash
npm run seed
```

Backend akan jalan di `http://localhost:4000`. Cek dengan buka `http://localhost:4000/api/projects` di browser — harus muncul JSON data project.

## 3. Setup Frontend

Buka terminal baru:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend akan jalan di `http://localhost:5173`.

---

## Struktur Backend (MVC)

- **Model** → `backend/src/models/` — satu file per tabel (Project.js, JournalPost.js, Skill.js, ContactMessage.js), pakai Sequelize
- **Controller** → `backend/src/controllers/` — logic tiap resource (CRUD)
- **Route** → `backend/src/routes/` — pemetaan URL ke controller
- **View** → karena ini API (bukan server-rendered HTML), "View"-nya digantikan oleh response JSON yang dikonsumsi frontend React

## Endpoint API

| Method | Endpoint                | Keterangan                        | Perlu Admin Key? |
|--------|--------------------------|------------------------------------|-------------------|
| GET    | `/api/projects`          | List semua project                 | Tidak             |
| GET    | `/api/projects/:slug`    | Detail 1 project                   | Tidak             |
| POST   | `/api/projects`          | Tambah project baru                | **Ya**            |
| PUT    | `/api/projects/:id`      | Update project                     | **Ya**            |
| DELETE | `/api/projects/:id`      | Hapus project                      | **Ya**            |
| GET    | `/api/journal`           | List semua tulisan                 | Tidak             |
| GET    | `/api/journal/:slug`     | Detail 1 tulisan                   | Tidak             |
| POST   | `/api/journal`           | Tambah tulisan baru                | **Ya**            |
| GET    | `/api/skills`            | List semua skill                   | Tidak             |
| POST   | `/api/skills`            | Tambah skill                       | **Ya**            |
| POST   | `/api/contact`           | Kirim pesan dari form contact      | Tidak             |
| GET    | `/api/contact`           | Lihat semua pesan masuk (admin)    | **Ya**            |

Untuk endpoint yang butuh admin key, kirim header:
```
x-admin-key: <isi sesuai ADMIN_API_KEY di .env>
```

Contoh nambah project baru pakai curl:
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -H "x-admin-key: change-me-to-a-long-random-string" \
  -d '{
    "title": "Project Baru",
    "slug": "project-baru",
    "description": "Deskripsi singkat",
    "techStack": ["React", "Node.js"]
  }'
```

## Catatan Sebelum Deploy ke Production

1. **Ganti `ADMIN_API_KEY`** dengan string random yang panjang dan aman.
2. Auth admin saat ini masih sederhana (cuma cek 1 API key). Kalau mau lebih aman, upgrade ke login + JWT/session.
3. **CORS**: sesuaikan `CORS_ORIGIN` di backend `.env` dengan domain frontend production kamu.
4. Untuk hosting Postgres gratis/murah, bisa pakai Supabase, Neon, atau Railway — tinggal ganti `DATABASE_URL`.
5. Build frontend untuk production dengan `npm run build` di folder `frontend` (hasilnya di folder `dist/`, tinggal deploy ke Vercel/Netlify).
6. Bagian **admin panel UI** (form untuk tambah/edit project dari browser, bukan curl) belum dibuat di versi ini — endpoint API-nya sudah siap, tinggal dibikinkan halaman `/admin` di frontend kalau kamu mau.
