// Trim whitespace and any trailing slash: a newline pasted into the Vercel
// dashboard alongside the URL is invisible there but breaks every request.
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api')
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
