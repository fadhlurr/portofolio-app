-- Versi ASCII-only. Em-dash sengaja diganti tanda hubung biasa: menempel
-- teks UTF-8 lewat clipboard ke SQL Editor pernah menyimpannya sebagai mojibake.
-- Menambahkan project "Situs Kantor Hukum" ke portfolio.
--
-- Aman dijalankan berulang: dicocokkan lewat slug, yang sudah ada diperbarui.
-- Kolom id, createdAt, dan updatedAt tidak punya default di tabel ini, jadi
-- ketiganya harus diisi eksplisit - Sequelize biasanya yang mengisinya.
--
-- demoUrl sengaja NULL. Aturan PRD 3.3: demo yang mengarah ke halaman error
-- lebih buruk daripada tidak ada tombol demo, dan situsnya memang belum
-- ditayangkan. Isi kolom ini nanti setelah demo benar-benar hidup.

INSERT INTO projects (
  id, title, slug, category, description, content,
  "techStack", "demoUrl", "repoUrl", featured, "order",
  "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Situs Kantor Hukum',
  'lawfirm-app',
  'Full-stack Web App',
  'Kantor hukum kecil butuh situs yang isinya bisa diubah tanpa memanggil developer tiap kali ada advokat baru. Dibangun dengan REST API dan autentikasi JWT di atas PostgreSQL, sehingga bidang praktik, profil advokat, dan tulisan hidup di database - bukan hardcode di kode.',
  'Masalah
Situs kantor hukum umumnya statis: menambah satu advokat atau mengubah satu bidang praktik berarti mengedit kode dan deploy ulang. Untuk kantor kecil yang tidak punya developer tetap, itu berarti isinya nyaris tidak pernah diperbarui - dan halaman tim yang basi justru menurunkan kepercayaan calon klien.

Pendekatan
Seluruh konten dipindahkan ke PostgreSQL dan diakses lewat REST API Express (MVC + Sequelize). Endpoint baca bersifat publik; endpoint tulis dilindungi JWT dengan password admin di-hash bcrypt. Frontend React + Vite hanya mengonsumsi API, jadi menambah bidang praktik cukup satu POST, tanpa menyentuh kode.

Hasil
Enam bidang praktik, empat profil advokat, dan tulisan yang saling tertaut dua arah dengan bidang praktiknya - semuanya dikelola lewat API. Form permintaan konsultasi tersimpan ke database dengan siklus status (baru, dihubungi, dijadwalkan, selesai), dan notifikasi email dibuat non-blocking supaya kegagalan kirim email tidak pernah menghilangkan permintaan yang masuk.

Keputusan teknis yang menentukan
Backend listen lebih dulu, koneksi database menyusul dengan backoff 5s sampai 60s. Keluar dari proses saat koneksi gagal mengubah gangguan database sementara menjadi crash loop - container lama yang masih memegang environment lama akan terus melayani traffic, sehingga variable yang sudah dibetulkan tidak pernah sampai ke proses yang benar. Log koneksi mencetak variable yang dibaca, user, host, port, dan panjang password, tetapi tidak pernah passwordnya.

Kegagalan konfigurasi juga diterjemahkan jadi satu baris saran - password salah, database belum ada, server tidak menjawab - bukan stack trace driver sepanjang empat puluh baris.',
  ARRAY['React','Vite','Express','Sequelize','PostgreSQL','JWT']::varchar[],
  NULL,
  'https://github.com/fadhlurr/lawfirm-app',
  true,
  2,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title          = EXCLUDED.title,
  category       = EXCLUDED.category,
  description    = EXCLUDED.description,
  content        = EXCLUDED.content,
  "techStack"    = EXCLUDED."techStack",
  "demoUrl"      = EXCLUDED."demoUrl",
  "repoUrl"      = EXCLUDED."repoUrl",
  featured       = EXCLUDED.featured,
  "order"        = EXCLUDED."order",
  "updatedAt"    = NOW();
