import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <nav>
      <div className="nav-inner">
        <Link to="/" className="logo">bbbyfadhlur<span>.com</span></Link>
        <div className="nav-links">
          <a href="/#about">About</a>
          <a href="/#projects">Projects</a>
          <a href="/#skills">Skills</a>
          <a href="/#journal">Journal</a>
          <a href="/#contact">Contact</a>
        </div>
        <div className="nav-right">
          <button
            className="toggle-btn"
            aria-label="Toggle dark mode"
            onClick={() => setIsDark((d) => !d)}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
