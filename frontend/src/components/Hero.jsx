export default function Hero() {
  const profileUrl = "https://ofaakrpogajdxcztswap.supabase.co/storage/v1/object/public/portfolio-assets/WhatsApp%20Image%202026-08-13%20at%2003.55.25.jpeg";

  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">Halo, saya</p>
          <h1 className="serif">Fadhlur Selian</h1>
          <p className="desc">
            Full-stack developer yang suka membangun aplikasi web dari awal sampai jadi — dari database, API, sampai tampilannya.
          </p>
          <div className="cta-row">
            <a href="#projects" className="btn-primary">
              Lihat Karya Saya
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
            <a href="/cv-fadhlur-rahmanda-selian.pdf" download className="link-underline">
              Unduh CV
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" />
              </svg>
            </a>
            <a href="#about" className="link-underline">
              Tentang Saya
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
          <div className="socials">
            <a className="social-btn" href="https://github.com/fadhlurr" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.29-5.24-5.72 0-1.26.44-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.15-1.18 3.15-1.18.63 1.6.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.42-5.26 5.71.42.36.78 1.08.78 2.18 0 1.58-.02 2.85-.02 3.24 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5z" /></svg>
            </a>
            <a className="social-btn" href="https://www.linkedin.com/in/fadhlur-rahmanda-selian/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
            </a>
            <a className="social-btn" href="mailto:fadhlurs45@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6l9 7 9-7M3 6h18v12H3V6z" /></svg>
            </a>
            <a className="social-btn" href="https://wa.me/6282124120952" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.2-.7.1c-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.3-1.4c1.4.8 2.9 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo">
            <img src={profileUrl} alt="Fadhlur Selian" className="hero-photo-img" />
          </div>
          <div className="avail-card">
            <div className="avail-top"><span className="dot"></span> Terbuka untuk pekerjaan</div>
            <div className="avail-row">
              <p>Yuk, bikin sesuatu<br />yang bermakna bareng.</p>
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
