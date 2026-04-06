import { getApiBaseUrl, getHrAiAnalyzerBaseUrl } from './apiBase.js';
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

/**
 * GET /api/interviews — paginasi server-side.
 * @param {{ completedOnly?: boolean, page?: number, pageSize?: number }} opts
 * @returns {Promise<{ items: unknown[], total: number, page: number, pageSize: number, totalPages: number }>}
 */
export async function fetchInterviewList({ completedOnly = false, page = 1, pageSize = 10 } = {}) {
  const base = getApiBaseUrl();
  const params = new URLSearchParams();
  if (completedOnly) params.set('status', 'completed');
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  const data = await parseJson(await fetch(`${base}/api/interviews?${params.toString()}`));
  return {
    items: Array.isArray(data?.items) ? data.items : [],
    total: typeof data?.total === 'number' ? data.total : 0,
    page: typeof data?.page === 'number' ? data.page : page,
    pageSize: typeof data?.pageSize === 'number' ? data.pageSize : pageSize,
    totalPages: typeof data?.totalPages === 'number' ? data.totalPages : 0,
  };
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

/**
 * HR AI Analyzer — GET `/result/interview/:applicationId` (job_applicants.id).
 * @see https://hrisaianalyzer-production.up.railway.app
 */
export async function fetchExternalInterviewResult(applicationId) {
  const base = getHrAiAnalyzerBaseUrl();
  const res = await fetch(`${base}/result/interview/${encodeURIComponent(applicationId)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Analyzer request failed (${res.status})`);
  }
  return data;
}

/**
 * HR AI Analyzer — POST `/analyze-cv-employer` (multipart).
 * Fields: applicationId, jobId, jobTitle, jobRequirements, jobIndustry, cvFile
 */
export async function postAnalyzeCvEmployer(formData) {
  const base = getHrAiAnalyzerBaseUrl();
  const res = await fetch(`${base}/analyze-cv-employer`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `analyze-cv-employer failed (${res.status})`);
  }
  return data;
}

/**
 * HR AI Analyzer — POST `/recommend-jobs` (multipart).
 * Typically `jobs` = JSON.stringify([{ title, company, industry, requirements }, ...]).
 */
export async function postRecommendJobs(formData) {
  const base = getHrAiAnalyzerBaseUrl();
  const res = await fetch(`${base}/recommend-jobs`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `recommend-jobs failed (${res.status})`);
  }
  return data;
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
