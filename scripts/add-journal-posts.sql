-- Menambahkan dua tulisan journal.
--
-- ASCII-only dengan sengaja. Menempel teks UTF-8 lewat clipboard ke SQL Editor
-- Supabase pernah menyimpannya sebagai mojibake: satu em-dash mekar jadi tiga
-- karakter sampah dan kalimatnya tampil rusak di produksi.
--
-- Aman dijalankan berulang: dicocokkan lewat slug, yang sudah ada diperbarui.
-- id, createdAt, dan updatedAt diisi eksplisit karena tabel ini tidak punya
-- default untuk ketiganya; biasanya Sequelize yang mengisi.

INSERT INTO journal_posts (id, title, slug, excerpt, content, "publishedAt", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Kredensialnya Benar, Deploy-nya Tetap Gagal',
  'kredensial-benar-deploy-gagal',
  'Password yang sama jalan di laptop, ditolak di server. Dua hari kebuang sebelum sadar masalahnya bukan di database, tapi di proses mana yang sebenarnya melayani traffic.',
  'Waktu backend portfolio ini pertama kali dideploy, errornya cuma satu baris: password authentication failed. Connection string yang sama, kalau dijalankan dari laptop, konek tanpa masalah. Di server, ditolak terus.

Yang aku lakukan pertama: mengira passwordnya salah. Jadi aku reset. Masih gagal. Reset lagi, kali ini pastikan tidak ada karakter aneh. Masih gagal. Dua hari habis di situ, dan tiap percobaan bikin makin yakin masalahnya ada di database.

Ternyata bukan.

Yang akhirnya membongkarnya adalah menambahkan satu log waktu koneksi gagal. Bukan mencetak passwordnya, itu tidak boleh, tapi mencetak hal-hal di sekitarnya: variable mana yang dibaca, user, host, port, panjang password, dan tiga huruf awal serta akhirnya.

Log itu bilang panjang passwordnya 16. Yang aku set di dashboard panjangnya 24.

Jadi proses yang melayani traffic sedang membaca nilai yang berbeda dari yang aku lihat di layar. Ada entri DATABASE_URL kedua yang tertinggal dari percobaan lama, dan itu yang menang. Aku memperbaiki nilai di satu tempat, sementara yang menjawab request memakai yang lain.

Solusinya bukan berdebat dengan platform soal nama itu. Aku ganti saja jadi nama yang tidak diklaim siapa pun: PORTOFOLIO_DATABASE_URL, dengan DATABASE_URL tetap dipakai sebagai fallback untuk dev lokal. Langsung jalan.

Tiga hal yang aku bawa dari kejadian ini.

Pertama, kalau kredensial jalan di lokal tapi gagal di production, curigai environment prosesnya dulu, bukan databasenya. Database jarang berbohong. Yang sering berbeda adalah nilai apa yang benar-benar sampai ke proses.

Kedua, log yang baik itu yang cukup untuk mendiagnosis tanpa membocorkan apa pun. Panjang password dan tiga huruf awal-akhir sudah cukup untuk memastikan nilainya sama dengan yang ada di dashboard. Passwordnya sendiri tidak perlu pernah dicetak.

Ketiga, nama variable yang generik itu tempat bertabrakan. DATABASE_URL diklaim plugin database bawaan, service lain di project yang sama, dan entri lama yang tertinggal. Nama yang spesifik project menghindari seluruh kelas masalah ini, dan biayanya cuma satu baris kode.

Yang paling mahal dari kejadian ini bukan dua harinya. Tapi dua hari itu dihabiskan dengan penuh keyakinan sedang memperbaiki hal yang benar.',
  '2026-08-26'::timestamptz,
  NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
  "publishedAt" = EXCLUDED."publishedAt", "updatedAt" = NOW();

INSERT INTO journal_posts (id, title, slug, excerpt, content, "publishedAt", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Empat Jebakan Waktu Naruh Aplikasi Kedua di Infrastruktur yang Sama',
  'aplikasi-kedua-infrastruktur-sama',
  'Deploy situs kantor hukum ke Railway, Vercel, dan Supabase yang sudah dipakai portfolio. Empat masalah muncul, dan tiga di antaranya tidak bikin error sama sekali.',
  'Waktu bikin situs kantor hukum sebagai project kedua, rencananya sederhana: pola arsitekturnya sama persis dengan portfolio ini, jadi tinggal ulang. Ternyata yang bikin repot bukan kodenya, tapi kenyataan bahwa dua aplikasi ini harus berbagi infrastruktur yang sama.

Empat hal yang aku temui. Yang menarik, tiga di antaranya tidak memunculkan error apa pun.

Satu: tabel admin yang bentrok diam-diam.

Plan gratis Supabase membatasi dua project per organisasi, dan keduanya sudah terpakai. Jadi aplikasi kedua harus menumpang database yang sama. Nama tabelnya aku cek satu per satu, dan semuanya aman kecuali satu: kedua aplikasi memakai admin_users, dengan kolom yang persis sama.

Kalau dibiarkan, sync tidak akan mengeluh sedikit pun. Tabelnya sudah ada, skemanya cocok, semuanya tampak berhasil. Yang terjadi diam-diam: dua situs berbagi satu akun admin, dan login ke satu situs otomatis membuka situs lainnya. Tabelnya aku ganti jadi lawfirm_admin_users.

Dua: menghapus field tidak mengosongkan kolom.

Isi contohnya sempat memuat nomor induk advokat karangan. Untuk demo publik itu tidak pantas, jadi aku hapus field itu dari data seed. Jalankan ulang, buka halaman profilnya, nomornya masih ada.

Sebabnya: update hanya menyentuh kolom yang disebut di objek. Menghapus sebuah field bukan berarti mengosongkan kolomnya, nilai lamanya bertahan. Yang benar menulis null secara eksplisit. Kalau aku tidak membuka halamannya untuk memastikan, aku akan mengira sudah beres.

Tiga: file konfigurasi yang tidak pernah dibaca.

Vercel mendeteksi repo itu punya dua folder yang bisa dideploy, lalu pindah ke mode services. Di mode itu, vercel.json di dalam folder frontend diabaikan sepenuhnya. Halaman depan normal, tapi buka langsung ke halaman detail dapat 404, karena rewrite yang membuat routing sisi klien bekerja ada di file yang tidak pernah dibaca.

Perbaikannya kecil: rewrite itu dipindah ke dalam objek service di vercel.json akar. Yang aku ubah setelahnya justru file lamanya, aku hapus. Konfigurasi yang tidak pernah dibaca lebih berbahaya daripada tidak ada, karena orang berikutnya akan mengira urusan itu sudah tertangani di sana.

Empat: teks yang rusak di jalan.

Deskripsi project aku masukkan lewat SQL Editor. Berhasil, tanpa error. Tapi waktu aku cek hasilnya lewat API, tanda pisah panjang berubah jadi tiga karakter sampah. File di disk benar, insert ke database lokal benar, yang salah ada di jalur clipboard ke browser ke editor: satu pihak membaca byte UTF-8 sebagai encoding lain.

Aku tidak menambal karakter yang telanjur rusak. Masalahnya akan berulang tiap kali file itu dijalankan lagi. Yang aku ubah: seluruh teksnya dibuat murni ASCII. Selama tidak ada karakter di luar itu, tidak ada yang bisa salah tafsir.

Benang merahnya satu. Dari empat masalah, cuma satu yang memunculkan error, dan justru itu yang paling cepat selesai. Tiga sisanya berhasil semua menurut layar, dan baru ketahuan waktu hasilnya benar-benar dibuka dan dilihat.

Deploy berhasil bukan berarti hasilnya benar. Itu dua pertanyaan yang berbeda, dan cuma satu yang bisa dijawab dengan melihat log.',
  '2026-09-01'::timestamptz,
  NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
  "publishedAt" = EXCLUDED."publishedAt", "updatedAt" = NOW();
