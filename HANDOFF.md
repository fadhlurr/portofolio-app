# Handoff — Portfolio bbbyfadhlur.com

Update per **28 Agustus 2026, malam**. Kasih file ini ke Claude di chat baru biar langsung nyambung.

Bahasa preferensi: Indonesia santai, "aku"/"kamu". Owner: Fadhlur Rahmanda Selian.

---

## 1. Status singkat

Portofolio **hidup dan normal**. Backend, database, frontend, CORS — semua jalan.

Demo **relationship-wrapped sudah pulih** malam ini setelah rusak sejak 24 Agustus. Penyebabnya password database, bukan circuit breaker — lihat bagian 7, catatan lama soal ini salah.

Yang belum kelar dan paling mendesak: **rotate password Supabase portofolio** yang masih bocor.

---

## 2. Arsitektur

```
Frontend   React + Vite  → Vercel team `fadhlur1`, project `portofolio-app`
                         → www.bbbyfadhlur.com

Backend    Express + MVC → Railway project `chic-encouragement` / production
                         → service `portofolio-app`
                         → portofolio-app-production-ef73.up.railway.app

Database   PostgreSQL    → Supabase project `ofaakrpogajdxcztswap`
                         → "fadhlurr's Project"
                         → WAJIB transaction pooler:
                           aws-0-ap-northeast-1.pooler.supabase.com:6543
                           user: postgres.ofaakrpogajdxcztswap

Email      Resend        → onboarding@resend.dev (domain sendiri belum diverifikasi)
```

**Relationship-wrapped adalah aplikasi terpisah**, satu project Railway yang sama:

```
Service    relationship-wrapped  → relationship-wrapped-production.up.railway.app
Database   Supabase `adeuxnqoyrpesmskgwku` → "relationship-wrapped Database"
Koneksi    DIRECT connection, bukan pooler
           user `postgres` polos, port 5432
Variables  DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER (5 variable terpisah,
           tidak ada DATABASE_URL — sudah diverifikasi 28 Agu)
```

**Koreksi dari catatan yang lebih lama:**

| Catatan lama | Kenyataan |
|---|---|
| Domain API `...-e39e.up.railway.app` | **Sudah pensiun.** Sekarang `...-ef73...` |
| Portfolio & relationship-wrapped berbagi 1 Supabase | **Salah.** Dua project terpisah |
| DB portfolio = `adeuxnqoyrpesmskgwku` | **Salah.** Itu punya relationship-wrapped. Portfolio = `ofaakrpogajdxcztswap` |

---

## 3. Environment variables (nama tidak standar — ada alasannya)

### Railway — service `portofolio-app`

| Nama | Catatan |
|---|---|
| `PORTOFOLIO_DATABASE_URL` | **Ini yang dibaca aplikasi.** Ejaan PORT-**O**-FOLIO, sama seperti nama repo. Isinya connection string utuh |
| `JWT_SECRET` | 96 char hex |
| `CORS_ORIGIN` | Sudah benar, `bbbyfadhlur.com` + varian www otomatis ditangani kode |
| `PORT` | 4000 |
| `RESEND_API_KEY`, `NOTIFY_EMAIL` | Email notifikasi contact form |

`DATABASE_URL` sudah tidak dipakai, tapi kode masih menerimanya sebagai fallback untuk dev lokal.

### Railway — service `relationship-wrapped`

Lima variable `DB_*` terpisah (lihat bagian 2). Kalau mengganti password, yang diubah **`DB_PASSWORD` saja**, isinya password polos — bukan connection string.

### Vercel — project `portofolio-app`

| Nama | Catatan |
|---|---|
| `VITE_PORTOFOLIO_API_URL` | **Ini yang dibaca aplikasi.** Type **Config**, isi `https://portofolio-app-production-ef73.up.railway.app/api` |
| `VITE_API_URL` | **Nyangkut, abaikan.** Tersimpan sebagai type Secret — Vercel menolak mengubahnya ke Config *dan* menolak menghapusnya. Isinya masih alamat lama |

**Kenapa nama-namanya aneh:** dua-duanya untuk kabur dari entri duplikat yang tidak bisa dihapus. Jangan "dirapikan" balik ke nama standar tanpa memastikan duplikatnya sudah hilang.

---

## 4. Yang sudah dikerjakan

### Migrasi ADMIN_API_KEY → JWT (SELESAI, live)

- `User` model, `authController` (`POST /api/auth/login`, `GET /api/auth/me`), middleware `requireAuth`
- `adminAuth` diganti `requireAuth` di projectRoutes, journalRoutes, skillRoutes, contactRoutes
- `middleware/adminAuth.js` dihapus, `ADMIN_API_KEY` dihapus dari Railway dan `.env.example`
- Script `npm run create-admin` untuk bikin user admin pertama
- Tabel dinamai **`admin_users`**, bukan `users` — waktu itu diduga DB dipakai bersama. (Ternyata tidak, tapi nama ini tetap dipertahankan karena sudah live)
- `POST /api/contact` tetap publik supaya form kontak jalan tanpa login

Diverifikasi: endpoint publik 200, tanpa token 401, dengan JWT lolos, `x-admin-key` lama ditolak.

### Perbaikan ketahanan

- **`server.js` tidak lagi `process.exit(1)`** saat database tak terjangkau. Sekarang: listen dulu, lalu konek dengan backoff 5s→10s→20s→40s→60s
- **Log diagnostik** saat koneksi gagal: nama variable yang dibaca, user, host, port, panjang password, 3 huruf awal/akhir. Password asli tidak pernah dicetak
- **`client.js`** melakukan `.trim()` dan buang trailing slash pada URL API

### SEO & metadata portofolio (28 Agu — SUDAH DI-BUILD, BELUM DI-PUSH)

`frontend/index.html` sebelumnya cuma punya title + viewport. Ditambahkan:

- `meta description`, `canonical`, `author`
- 11 tag Open Graph + 4 tag Twitter card → preview waktu link di-share ke WhatsApp/LinkedIn
- 4 link favicon + `site.webmanifest`, 2 `theme-color` (light & dark)
- `preconnect` ke fonts.gstatic.com (sebelumnya cuma ke googleapis — file fontnya di gstatic)
- JSON-LD `Person`: nama, jobTitle, GitHub, LinkedIn, alumni IT PLN & Hacktiv8
- Blok `<noscript>` berisi nama + 3 link kontak
- `<title>` diubah jadi "Fadhlur Selian — Full-stack Developer"

File baru di `frontend/public/` (folder itu sebelumnya kosong):
`og-image.png` (1200×630, palet cream/ink/accent situs, font Fraunces), `favicon.svg`, `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

`.gitignore` ditambah `.env.*` dengan pengecualian `!.env.example`.

**Belum di-commit dan belum di-push.** Perintahnya:

```bash
cd /Users/yafiirfan/Downloads/portfolio-app && git add -A && git commit -m "feat: SEO meta tags, Open Graph, favicon, robots & sitemap" && git push
```

Setelah live, verifikasi: buka `https://www.bbbyfadhlur.com/og-image.png` (harus keluar gambar, bukan halaman HTML), lalu paksa LinkedIn baca ulang lewat linkedin.com/post-inspector. WhatsApp menyimpan cache preview lama, tes pakai chat lain.

### Perbaikan relationship-wrapped (28 Agu — SELESAI)

Demo mati sejak 24 Agustus. Penyebab tunggal: **`DB_PASSWORD` di Railway tidak cocok dengan password di Supabase.** Detail cara menemukannya di bagian 7.

---

## 5. Sisa pekerjaan

### MENDESAK — rotate password Supabase portofolio

Password project `ofaakrpogajdxcztswap` masih yang bocor di transkrip chat lama. Pooler Supabase terbuka ke internet, jadi siapa pun yang punya string itu bisa konek dan baca/ubah/hapus semua data. **Password lama sengaja tidak ditulis lagi di file ini.**

Prosedur:

1. Reset di `https://supabase.com/dashboard/project/ofaakrpogajdxcztswap/database/settings` → **Reset database password** → **Generate a password**, 20+ karakter huruf+angka tanpa simbol
2. Copy **sebelum** menutup dialog, simpan di password manager
3. Tes dulu dari Mac (password ada di clipboard):
   ```bash
   cd /Users/yafiirfan/Downloads/portfolio-app/backend && DBURL="$(pbpaste)" node -e 'const{Client}=require("pg");const c=new Client({connectionString:process.env.DBURL,ssl:{rejectUnauthorized:false}});c.connect().then(()=>c.query("select current_user,current_database()")).then(r=>{console.log("KONEKSI OK:",r.rows[0]);process.exit(0)}).catch(e=>{console.log("GAGAL:",e.message);process.exit(0)})'
   ```
   Clipboard harus berisi **connection string utuh** yang `[YOUR-PASSWORD]`-nya sudah diganti.
4. Kalau `KONEKSI OK`, update `PORTOFOLIO_DATABASE_URL` di Railway — **string utuhnya**, bukan cuma potongan password
5. Verifikasi `curl https://portofolio-app-production-ef73.up.railway.app/api/projects` masih keluar data

### Perkuat password relationship-wrapped

Yang sekarang jalan tapi 13 karakter buatan sendiri. Ulangi prosedur bagian 7 dengan hasil generate acak. Prosedurnya sudah terbukti, tinggal diulang dengan tenang.

### Belum dikerjakan

1. **`create-admin` di database yang benar.** Belum pernah berhasil — percobaan sebelumnya mendarat di database relationship-wrapped. Di Railway Console service `portofolio-app` (shell-nya **bash**):
   ```bash
   read -sp "Password admin: " ADMIN_PASSWORD && echo && ADMIN_EMAIL=fadhlurs45@gmail.com ADMIN_PASSWORD="$ADMIN_PASSWORD" ADMIN_NAME="Fadhlur" npm run create-admin && unset ADMIN_PASSWORD
   ```
   Jangan pakai password yang mengandung nama atau tanggal lahir — dua percobaan sebelumnya (`fadhlur25`, `fadhlur250800`) sudah bocor.

2. **Matikan service Railway lama** yang memegang domain `...-e39e...`. Tidak ada di project `chic-encouragement`. Masih menarik biaya dan masih ikut ke-build tiap push. Catatan: sisa kredit Railway tinggal **20 hari / $4.03** per 28 Agu.

3. **Hapus `VITE_API_URL`** di Vercel kalau suatu saat UI-nya mengizinkan.

4. **Pastikan apex redirect ke www.** Canonical sudah di-set ke `https://www.bbbyfadhlur.com/`; kalau versi tanpa www bisa dibuka dan tidak redirect, atur di Vercel.

### Yang bikin portofolio lebih "proper" (hasil review 28 Agu)

Urut dari yang paling merusak kesan:

1. **Hapus project placeholder.** `/api/projects` masih mengeluarkan *"Nama Project Kedua"* — React + Tailwind, tanpa demo, tanpa repo, deskripsinya literally minta diganti. Satu kartu dummy bikin sembilan hal rapi lainnya kelihatan setengah jadi
2. **Cuma 1 project asli.** Tiga project dengan kedalaman lebih baik daripada delapan yang dangkal
3. **Project belum punya link repo.** Relationship Wrapped cuma punya demo URL. Tombol "Code" itu yang pertama dicari recruiter teknis
4. **Deskripsi project masih satu kalimat.** Yang bikin proper: masalahnya apa, keputusan teknis apa yang diambil dan kenapa, hasilnya apa. Cerita "dua service Railway deploy dari repo yang sama" itu bahan case study yang jauh lebih meyakinkan daripada daftar tech stack
5. **Skills masih angka persen** (Tailwind 92, PostgreSQL 70). Angka self-rated tidak bermakna buat pembaca. Rencana ganti ke chip/tag sudah benar
6. **Belum ada CV/resume yang bisa diunduh.** GitHub, LinkedIn, email, WhatsApp sudah ada di Hero & Footer — yang kurang cuma CV
7. **Journal kosong.** Kalau belum ada 2–3 tulisan, sembunyikan sectionnya
8. **SPA tanpa prerender.** Isi halaman baru ada setelah JS jalan, crawler lihat halaman kosong. Solusi termurah: prerender halaman utama saat build, tidak perlu pindah ke Next.js
9. **API masih pakai domain railway.** Pasang `api.bbbyfadhlur.com` — gratis, dan kalau pindah host lagi frontend tidak perlu diubah
10. **Belum ada 404 page, loading state, empty state.** Kalau backend cold start, pengunjung lihat section kosong
11. **Belum ada analytics.** Vercel Analytics satu baris

### Backlog lama

- Hero masih hardcode di `Hero.jsx` — perlu tabel `hero_content` + endpoint + form admin
- Verifikasi domain sendiri di Resend biar email bukan dari `onboarding@resend.dev`
- Test tuntas email notifikasi Resend

---

## 6. Batch 3 — Admin panel (belum mulai)

Baru bisa dimulai setelah `create-admin` berhasil dan login terverifikasi.

- `/admin/login` — form email + password, simpan JWT di localStorage
- Dashboard + sidebar
- 5 halaman CRUD: projects, skills, journal, hero, messages
- Route guard: redirect ke login kalau token tidak ada/expired
- Logout

Catatan: halaman `/admin/hero` butuh tabel `hero_content` dibuat lebih dulu. Dan `/admin/*` **jangan** dimasukkan ke robots.txt — file itu publik, jadi malah mengumumkan lokasi halaman login. Pakai tag `noindex` di halamannya.

Pertimbangan urutan: admin panel itu untuk kenyamanan owner, bukan untuk pengunjung. Mengisi 2 project lewat SQL sekali lebih cepat daripada bikin 5 halaman CRUD dulu.

---

## 7. Pelajaran mahal — baca ini sebelum ngoprek deployment

### Kasus 1: dua service Railway dari repo yang sama (Agustus, portofolio)

Dua hari habis untuk satu variable yang salah. Gejalanya menyamar jadi banyak bug berbeda: user admin mendarat di database yang salah; login 401 padahal `bcrypt.compare` bilang cocok; `password authentication failed` padahal dashboard menampilkan nilai yang benar.

Penyebab tunggalnya: **dua service Railway deploy dari repo GitHub yang sama.** Variable diedit di satu service, domain dilayani service satunya. Kode selalu ter-update di dua-duanya, jadi terlihat seolah deployment berhasil.

Petunjuk yang menentukan: **badge "Unexposed service"** di tab Deployments = service ini tidak punya domain publik.

### Kasus 2: password relationship-wrapped (24–28 Agustus)

Demo mati empat hari. **Catatan lama menduga ini circuit breaker — itu salah.**

Yang sebenarnya terjadi, dari timeline log:

| Waktu | Error | Artinya |
|---|---|---|
| 24 Agu 14:16 | `ECIRCUITBREAKER` | Supabase memblokir sementara, sisa insiden polling 400 kali |
| 24 Agu 14:41 dst | `28P01` | Blokir sudah lepas. Jawaban jujurnya: password salah |
| 25–28 Agu | `28P01` | Sama, tidak berubah sama sekali |

Circuit breaker cuma **gejala 25 menit pertama**. Sisanya murni password tidak cocok. Nunggu lebih lama tidak akan pernah menyembuhkannya.

**Teknik yang membongkarnya: sidik jari SHA-256.** Di Railway Console:

```bash
printf '%s' "$DB_PASSWORD" | wc -c
printf '%s' "$DB_PASSWORD" | sha256sum | cut -c1-16
case "$DB_PASSWORD" in postgres*) echo "ISI=connection string, SALAH";; *\ *) echo "ADA SPASI";; *) echo "ISI=password polos, OK";; esac
```

Di Mac (password ada di clipboard):

```bash
pbpaste | tr -d '\n' | wc -c
pbpaste | tr -d '\n' | shasum -a 256 | cut -c1-16
```

Kalau panjang dan 16 karakter sidik jarinya sama di kedua sisi, passwordnya identik. Sidik jari aman dikirim ke chat — tidak bisa dibalik jadi password.

Ini lebih tajam daripada membandingkan panjang + 3 huruf awal/akhir seperti dulu: semua password Supabase lama berformat `xxxxxx-xxxxxx-xxxxxx`, jadi dua password berbeda lolos pemeriksaan itu.

**Urutan reset yang benar** — jeda antara reset dan tempel itu yang bikin nyangkut berkali-kali:

1. Buka **dua tab** dulu: Supabase database settings, dan Railway tab Variables
2. Supabase → Reset database password → Generate → **copy sebelum dialog ditutup**
3. **Langsung** pindah tab, tempel ke Railway, Save
4. Baru simpan ke password manager
5. Verifikasi lewat sidik jari di Console **sebelum** membuka situsnya
6. Baru buka situs, **sekali**

### Kesalahan yang jangan diulang

- **Jangan polling** endpoint yang membuka koneksi database saat menunggu pemulihan. Pernah polling 400 kali; tiap request = satu percobaan auth, dan itu menahan circuit breaker Supabase menyala berjam-jam. Cek **sekali**, diamkan 15 menit, cek lagi
- **Jangan ubah dua hal sekaligus** lalu berharap tahu mana yang berhasil
- **Jangan pakai password yang mengandung nama atau tanggal lahir.** `fadhlur250800` ditebak benar dalam satu percobaan hanya dari polanya
- **Jangan tempel connection string langsung di prompt Terminal.** zsh akan menganggapnya nama program (`zsh: no such file or directory`) dan passwordnya tercetak di layar + masuk history

### Error khas dan artinya

| Error | Artinya |
|---|---|
| `28P01 password authentication failed` | Jaringan & host benar, password salah. Ini soal isi variable, bukan koneksi |
| `ECIRCUITBREAKER` | Supabase memblokir sementara. Diamkan, jangan retry cepat |
| `ENETUNREACH ...:5432` + alamat IPv6 | Direct connection Supabase itu IPv6-only di plan Free. Dari Railway jalan, dari WiFi rumah biasanya tidak. Untuk tes dari Mac pakai **Session pooler** — passwordnya sama, jalurnya ramah IPv4 |
| `Tenant or user not found` | Format user pooler salah, harus `postgres.<project-ref>` |
| `getaddrinfo ENOTFOUND <sesuatu>` | Connection string tidak utuh / clipboard salah isi |
| `column "email" does not exist` | Query kena tabel milik app lain |

---

## 8. Preferensi kerja

- Bahasa Indonesia santai
- Command harus lengkap tinggal copas — user sensitif ke typo
- Kalau perlu memasukkan password/secret lewat Terminal, **jangan pakai prompt `read -s`** — sudah terbukti bikin bingung (mudah tertempel di prompt yang salah). Pakai `pbpaste` yang membaca clipboard langsung, atau tempel lewat UI dashboard
- User ingin paham *kenapa*, bukan cuma "ikut aja"
- Kalau menyuruh navigasi dashboard, kasih **URL langsung** — menu Supabase/Railway sering pindah, dan menyebut nama menu saja bikin nyasar
- Pernah kena: node_modules ke-commit, password ke-track git, salah folder terminal, `npm install` di root bukan di `backend/`
