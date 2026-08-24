export default function Hero() {
  // Ganti URL di bawah ini dengan URL foto dari Supabase Storage kamu
  const profileUrl = "GANTI_DENGAN_URL_SUPABASE_KAMU";

  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">Hi, I'm</p>
          <h1 className="serif">Fadhlur Selian</h1>
          <p className="desc">
            I build digital experiences that turn everyday data into something people actually want to look at.
          </p>
          <div className="cta-row">
            <a href="#projects" className="btn-primary">
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
            <a href="#about" className="link-underline">
              About Me
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
          <div className="socials">
            <a className="social-btn" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.29-5.24-5.72 0-1.26.44-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.15-1.18 3.15-1.18.63 1.6.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.42-5.26 5.71.42.36.78 1.08.78 2.18 0 1.58-.02 2.85-.02 3.24 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5z" /></svg>
            </a>
            <a className="social-btn" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
            </a>
            <a className="social-btn" href="mailto:hello@bbbyfadhlur.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6l9 7 9-7M3 6h18v12H3V6z" /></svg>
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo">
            <img
              src={profileUrl}
              alt="Fadhlur Selian"
              className="hero-photo-img"
            />
          </div>
          <div className="avail-card">
            <div className="avail-top"><span className="dot"></span> Available for work</div>
            <div className="avail-row">
              <p>Let's build something<br />great together.</p>
              <div className="avail-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
