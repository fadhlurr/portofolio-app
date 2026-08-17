import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Journal() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getJournalPosts()
      .then((data) => { setPosts(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section id="journal">
      <div className="wrap">
        <span className="tag">Journal</span>
        <h2 className="sec-title">Tulisan Terbaru</h2>
        <p className="sec-desc">Catatan seputar proses belajar, pengalaman, dan insight dari project yang sedang dikerjakan.</p>

        {status === 'loading' && <p className="empty-state">Memuat tulisan...</p>}
        {status === 'error' && <p className="error-state">Gagal memuat journal.</p>}
        {status === 'ready' && posts.length === 0 && <p className="empty-state">Belum ada tulisan.</p>}

        {status === 'ready' && posts.length > 0 && (
          <div className="journal-grid">
            {posts.map((post) => (
              <div className="journal-card" key={post.id}>
                <div className="journal-date">{formatDate(post.publishedAt)}</div>
                <h3 className="serif">{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to={`/journal/${post.slug}`} className="journal-link">
                  Baca selengkapnya
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
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
