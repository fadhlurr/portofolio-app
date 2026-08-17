import { useState } from 'react';
import { api } from '../api/client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Terjadi kesalahan. Coba lagi.');
    }
  }

  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info">
          <span className="tag">Contact</span>
          <h2 className="sec-title">Yuk, Ngobrol</h2>
          <p>Punya project atau ide yang ingin didiskusikan? Kirim pesan aja, biasanya aku balas dalam 1–2 hari kerja.</p>
          <div className="info-line"><strong>Email</strong>&nbsp;hello@bbbyfadhlur.com</div>
          <div className="info-line"><strong>Lokasi</strong>&nbsp;Indonesia (Remote)</div>
          <div className="info-line"><strong>Status</strong>&nbsp;Available for work</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nama</label>
            <input id="name" name="name" type="text" placeholder="Nama kamu" value={form.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="email@kamu.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="message">Pesan</label>
            <textarea id="message" name="message" placeholder="Ceritain project atau ide kamu..." value={form.message} onChange={handleChange} required />
          </div>

          {status === 'success' && <p className="form-status success">Pesan terkirim, terima kasih! Aku akan balas secepatnya.</p>}
          {status === 'error' && <p className="form-status error">{errorMsg}</p>}

          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
          </button>
        </form>
      </div>
    </section>
  );
}
