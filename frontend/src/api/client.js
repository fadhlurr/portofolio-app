// Prefer VITE_PORTOFOLIO_API_URL over VITE_API_URL.
//
// VITE_API_URL was saved in Vercel as a Secret, which the dashboard refuses to
// convert to Config and refuses to delete — so it is stuck holding the address
// of a Railway service we no longer use. Reading a fresh name sidesteps it.
//
// Trim whitespace and any trailing slash too: a newline pasted in alongside
// the URL is invisible in the dashboard but breaks every request.
const API_URL = (
  import.meta.env.VITE_PORTOFOLIO_API_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:4000/api'
)
  .trim()
  .replace(/\/+$/, '');

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getProjects: () => request('/projects'),
  getProject: (slug) => request(`/projects/${slug}`),

  getJournalPosts: () => request('/journal'),
  getJournalPost: (slug) => request(`/journal/${slug}`),

  getSkills: () => request('/skills'),

  submitContact: (data) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
