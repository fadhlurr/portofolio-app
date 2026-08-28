import { useEffect, useState } from 'react';
import { api } from '../api/client';
import './skill-chips.css';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getSkills()
      .then((data) => { setSkills(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills">
      <div className="wrap">
        <span className="tag">Skills</span>
        <h2 className="sec-title">Tech Stack &amp; Tools</h2>
        <p className="sec-desc">Tools yang paling sering kupakai untuk membangun dari ide sampai produksi.</p>

        {status === 'loading' && <p className="empty-state">Memuat skills...</p>}
        {status === 'error' && <p className="error-state">Gagal memuat skills.</p>}

        {status === 'ready' && (
          <div className="skills-grid">
            {Object.entries(grouped).map(([category, items]) => (
              <div className="skill-cat" key={category}>
                <h4 className="serif">{category}</h4>
                <div className="skill-chips">
                  {/* proficiency tidak ditampilkan, tapi dipakai untuk urutan:
                      yang paling dikuasai tampil lebih dulu */}
                  {[...items]
                    .sort((a, b) => (b.proficiency ?? 0) - (a.proficiency ?? 0))
                    .map((s) => (
                      <span className="skill-chip" key={s.id}>{s.name}</span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
