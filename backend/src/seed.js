require('dotenv').config();
const { sequelize, Project, Skill, JournalPost } = require('./models');

async function main() {
  await sequelize.sync();
  console.log('Seeding database...');

  // ---------- Projects ----------
  await Project.findOrCreate({
    where: { slug: 'relationship-wrapped' },
    defaults: {
      title: 'Relationship Wrapped',
      category: 'Personal Project',
      description:
        'Spotify Wrapped, tapi buat hubungan kamu — mengubah riwayat chat pasangan jadi rekap tahunan yang playful: kata favorit, panggilan sayang, sampai total pesan yang terkirim.',
      content: `Overview
Relationship Wrapped adalah web experience personal yang mengubah riwayat chat pasangan menjadi rekap tahunan yang playful, terinspirasi dari format "Wrapped" ala Spotify.

Fitur Utama
- Intro personalisasi dengan nama panggilan pasangan
- Top Words: 5 kata paling sering diketik
- Dua Arah, Dua Rasa: perbandingan panggilan sayang
- Total pesan yang dikirim sepanjang tahun
- Scroll/klik storytelling ala slide

Tantangan
Parsing export chat WhatsApp yang formatnya tidak konsisten, dan menyaring noise dari kata-kata umum supaya insight yang muncul benar-benar bermakna.`,
      techStack: ['Next.js', 'Framer Motion', 'Data Parsing'],
      featured: true,
      order: 1,
    },
  });

  await Project.findOrCreate({
    where: { slug: 'project-kedua' },
    defaults: {
      title: 'Nama Project Kedua',
      category: 'Web App',
      description: 'Deskripsi singkat tentang masalah yang diselesaikan dan pendekatan yang dipakai. Ganti dengan project asli kamu.',
      techStack: ['React', 'Tailwind'],
      order: 2,
    },
  });

  // ---------- Skills ----------
  const skills = [
    { category: 'Frontend', name: 'React / Next.js', proficiency: 90, order: 1 },
    { category: 'Frontend', name: 'Tailwind CSS', proficiency: 92, order: 2 },
    { category: 'Frontend', name: 'Framer Motion', proficiency: 75, order: 3 },
    { category: 'Backend', name: 'Node.js', proficiency: 80, order: 1 },
    { category: 'Backend', name: 'REST / API Design', proficiency: 78, order: 2 },
    { category: 'Backend', name: 'PostgreSQL', proficiency: 70, order: 3 },
    { category: 'Tools & Lainnya', name: 'Git / GitHub', proficiency: 88, order: 1 },
    { category: 'Tools & Lainnya', name: 'Figma', proficiency: 72, order: 2 },
    { category: 'Tools & Lainnya', name: 'Vercel', proficiency: 85, order: 3 },
  ];

  for (const skill of skills) {
    await Skill.findOrCreate({ where: { category: skill.category, name: skill.name }, defaults: skill });
  }

  // ---------- Journal ----------
  await JournalPost.findOrCreate({
    where: { slug: 'bikin-wrapped-versi-sendiri' },
    defaults: {
      title: 'Bikin "Wrapped" Versi Sendiri: Proses di Balik Relationship Wrapped',
      excerpt: 'Cerita soal parsing chat WhatsApp yang berantakan dan gimana caranya bikin storytelling data terasa personal.',
      content: 'Isi artikel lengkap di sini.',
      publishedAt: new Date('2026-08-18'),
    },
  });

  console.log('Seeding done.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
