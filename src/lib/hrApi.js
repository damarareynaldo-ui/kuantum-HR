import { getApiBaseUrl } from './apiBase.js';
import { ensureRecruiterUserId, recruiterAuthHeaders } from './recruiterApi.js';

async function parseJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchDashboard() {
  const base = getApiBaseUrl();
  return parseJson(await fetch(`${base}/api/dashboard`));
}

export async function fetchCandidates() {
  const base = getApiBaseUrl();
  const data = await parseJson(await fetch(`${base}/api/candidates`));
  return Array.isArray(data) ? data : [];
}

export async function fetchSessions() {
  const base = getApiBaseUrl();
  const data = await parseJson(await fetch(`${base}/api/sessions`));
  return Array.isArray(data) ? data : [];
}

export async function fetchComparison(jobId) {
  const base = getApiBaseUrl();
  return parseJson(await fetch(`${base}/api/comparison?jobId=${encodeURIComponent(jobId)}`));
}

export async function fetchSessionResults(sessionId) {
  const base = getApiBaseUrl();
  return parseJson(await fetch(`${base}/api/sessions/${encodeURIComponent(sessionId)}/results`));
}

export async function inviteCandidateToJob({ name, email, jobId }) {
  const base = getApiBaseUrl();
  const login = await parseJson(
    await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
  );
  const applicantId = login?.token;
  if (!applicantId) throw new Error('Failed to resolve applicant id');

  await parseJson(
    await fetch(`${base}/api/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': applicantId,
      },
      body: JSON.stringify({ role: 'applicant' }),
    })
  );

  const app = await parseJson(
    await fetch(`${base}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': applicantId,
      },
      body: JSON.stringify({ jobId }),
    })
  );

  // Ensure recruiter context is warmed for subsequent protected endpoints.
  await ensureRecruiterUserId(base);
  return app;
}

export async function fetchJobApplicants(jobId) {
  const base = getApiBaseUrl();
  const recruiterId = await ensureRecruiterUserId(base);
  const data = await parseJson(
    await fetch(`${base}/api/jobs/${encodeURIComponent(jobId)}/applications`, {
      headers: recruiterAuthHeaders(recruiterId),
    })
  );
  return Array.isArray(data) ? data : [];
}

export async function fetchRecruiterProfile() {
  const base = getApiBaseUrl();
  const recruiterId = await ensureRecruiterUserId(base);
  return parseJson(
    await fetch(`${base}/api/users/me`, {
      headers: recruiterAuthHeaders(recruiterId),
    })
  );
}
