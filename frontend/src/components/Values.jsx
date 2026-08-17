const VALUES = [
  { mark: '01', title: 'Detail-Oriented', desc: 'Spacing, transisi, copy — semua dipikirkan sampai hal terkecil, bukan cuma "yang penting jalan".' },
  { mark: '02', title: 'Problem-First', desc: 'Selalu mulai dari masalah nyata sebelum mikirin teknologi atau tampilan.' },
  { mark: '03', title: 'Cepat & Rapi', desc: 'Iterasi cepat tanpa mengorbankan kualitas kode dan konsistensi desain.' },
  { mark: '04', title: 'Story-Driven', desc: 'Percaya bahwa produk terbaik punya cerita yang jelas di baliknya, bukan cuma fitur.' },
];

export default function Values() {
  return (
    <section id="values">
      <div className="wrap">
        <span className="tag">Keunggulan</span>
        <h2 className="sec-title">Kenapa Kerja Sama Denganku</h2>
        <p className="sec-desc">Empat hal yang selalu jadi pegangan di setiap project.</p>

        <div className="value-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.mark}>
              <div className="value-mark">{v.mark}</div>
              <h3 className="serif">{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
