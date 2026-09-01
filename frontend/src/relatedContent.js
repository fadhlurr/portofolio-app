// Hubungan antara project dan tulisan journal.
// Ditulis manual di sini supaya tidak perlu mengubah skema database dulu.
// Kalau nanti sudah ada kolom `journalSlug` di tabel projects, file ini bisa dibuang.
//
// Dua peta ini harus tetap cerminan satu sama lain. Kalau salah satu arah lupa
// ditambahkan, tautannya jadi searah dan pembaca yang datang dari sisi yang
// terlewat tidak pernah tahu pasangannya ada.

export const PROJECT_TO_JOURNAL = {
  'relationship-wrapped': {
    slug: 'bikin-wrapped-versi-sendiri',
    title: 'Bikin "Wrapped" Versi Sendiri: Proses di Balik Relationship Wrapped',
  },
  'lawfirm-app': {
    slug: 'aplikasi-kedua-infrastruktur-sama',
    title: 'Empat Jebakan Waktu Naruh Aplikasi Kedua di Infrastruktur yang Sama',
  },
};

export const JOURNAL_TO_PROJECT = {
  'bikin-wrapped-versi-sendiri': {
    slug: 'relationship-wrapped',
    title: 'Relationship Wrapped',
  },
  'aplikasi-kedua-infrastruktur-sama': {
    slug: 'lawfirm-app',
    title: 'Situs Kantor Hukum',
  },
};
