import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function JournalDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    api.getJournalPost(slug)
      .then((data) => { setPost(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, [slug]);

  return (
    <div className="wrap detail-header">
      <Link to="/#journal" className="back-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M17 7L7 17M7 17H16M7 17V8" />
        </svg>
        Kembali ke Journal
      </Link>

      {status === 'loading' && <p className="empty-state">Memuat tulisan...</p>}
      {status === 'error' && <p className="error-state">Tulisan tidak ditemukan.</p>}

      {status === 'ready' && post && (
        <>
          <div className="journal-date" style={{ marginBottom: '14px' }}>{formatDate(post.publishedAt)}</div>
          <h1 className="detail-title serif">{post.title}</h1>
          <div className="detail-body">{post.content}</div>
        </>
      )}
    </div>
  );
}
