import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    api.getProjects()
      .then((data) => { setProjects(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section id="projects">
      <div className="wrap">
        <span className="tag">Projects</span>
        <h2 className="sec-title">Karya Terbaru</h2>
        <p className="sec-desc">Beberapa project yang mewakili cara aku berpikir dan membangun sesuatu.</p>

        {status === 'loading' && <p className="empty-state">Memuat project...</p>}
        {status === 'error' && (
          <p className="error-state">Gagal memuat project. Pastikan backend API sedang berjalan.</p>
        )}
        {status === 'ready' && projects.length === 0 && (
          <p className="empty-state">Belum ada project. Tambahkan lewat API/admin.</p>
        )}

        {status === 'ready' && projects.length > 0 && (
          <div className="proj-list">
            {projects.map((p) => (
              <div className="proj-row" key={p.id}>
                <div className="proj-thumb">
                  <span>{p.title}</span>
                </div>
                <div className="proj-mid">
                  {p.category && <div className="kicker">{p.category}</div>}
                  <h3 className="serif">{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="stack-row">
                    {(p.techStack || []).map((t) => (
                      <span className="stack-chip" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <Link to={`/projects/${p.slug}`} className="proj-cta">
                  Lihat Detail
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
