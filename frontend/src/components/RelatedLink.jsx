import { Link } from 'react-router-dom';
import './related-link.css';

export default function RelatedLink({ to, label, title }) {
  return (
    <Link to={to} className="related-link">
      <span className="related-link-text">
        <span className="related-link-label">{label}</span>
        <span className="related-link-title">{title}</span>
      </span>
      <span className="related-link-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </span>
    </Link>
  );
}
