import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    api.getProject(slug)
      .then((data) => { setProject(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, [slug]);

  return (
    <div className="wrap detail-header">
      <Link to="/#projects" className="back-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M17 7L7 17M7 17H16M7 17V8" />
        </svg>
        Kembali ke Projects
      </Link>

      {status === 'loading' && <p className="empty-state">Memuat project...</p>}
      {status === 'error' && <p className="error-state">Project tidak ditemukan.</p>}

      {status === 'ready' && project && (
        <>
          {project.category && <span className="tag">{project.category}</span>}
          <h1 className="detail-title serif">{project.title}</h1>

          <div className="stack-row" style={{ marginBottom: '28px' }}>
            {(project.techStack || []).map((t) => (
              <span className="stack-chip" key={t}>{t}</span>
            ))}
          </div>

          {(project.demoUrl || project.repoUrl) && (
            <div className="cta-row" style={{ marginBottom: '36px' }}>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary">Live Demo</a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="link-underline">Source Code</a>
              )}
            </div>
          )}

          <div className="detail-body">{project.content || project.description}</div>
        </>
      )}
    </div>
  );
}
