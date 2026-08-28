// Hubungan antara project dan tulisan journal.
// Ditulis manual di sini supaya tidak perlu mengubah skema database dulu.
// Kalau nanti sudah ada kolom `journalSlug` di tabel projects, file ini bisa dibuang.

export const PROJECT_TO_JOURNAL = {
  'relationship-wrapped': {
    slug: 'bikin-wrapped-versi-sendiri',
    title: 'Bikin "Wrapped" Versi Sendiri: Proses di Balik Relationship Wrapped',
  },
};

export const JOURNAL_TO_PROJECT = {
  'bikin-wrapped-versi-sendiri': {
    slug: 'relationship-wrapped',
    title: 'Relationship Wrapped',
  },
};
