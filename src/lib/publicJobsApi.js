import { getApiBaseUrl } from './apiBase.js';

async function parseJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

/** Public list: GET /api/jobs */
export async function fetchPublicJobs() {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/jobs`);
  const data = await parseJson(res);
  return Array.isArray(data) ? data : [];
}

/** Public detail: GET /api/jobs/:id */
export async function fetchPublicJob(jobId) {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/jobs/${encodeURIComponent(jobId)}`);
  return parseJson(res);
}

/** GET /api/companies (public) */
export async function fetchPublicCompanies() {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/companies`);
  const data = await parseJson(res);
  return Array.isArray(data) ? data : [];
}
