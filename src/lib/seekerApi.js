import { getApiBaseUrl } from './apiBase.js';

const API_BASE_URL = getApiBaseUrl();
const SEEKER_ID_KEY = 'kuantum.seeker.userId';
const SEEKER_EMAIL_KEY = 'kuantum.seeker.email';

function randomTag() {
  return Math.random().toString(36).slice(2, 8);
}

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function getOrCreateSeekerUserId() {
  const cached = localStorage.getItem(SEEKER_ID_KEY);
  if (cached) return cached;

  const savedEmail = localStorage.getItem(SEEKER_EMAIL_KEY);
  if (savedEmail) {
    return loginSeekerByEmail(savedEmail);
  }

  const seed = randomTag();
  return loginSeekerByEmail(`applicant-${seed}@kuantum.local`, 'Seeker Applicant');
}

export async function loginSeekerByEmail(email, name = 'Seeker Applicant') {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail) {
    throw new Error('Email is required');
  }
  const login = await api('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: normalizedEmail,
      name,
    }),
  });
  const userId = login?.token;
  if (!userId) throw new Error('Unable to login seeker user');

  await api('/api/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify({ role: 'applicant' }),
  });

  localStorage.setItem(SEEKER_ID_KEY, userId);
  localStorage.setItem(SEEKER_EMAIL_KEY, normalizedEmail);
  return userId;
}

export async function createApplication(jobId) {
  const userId = await getOrCreateSeekerUserId();
  return api('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify({ jobId }),
  });
}

export async function getMyApplications() {
  const userId = await getOrCreateSeekerUserId();
  return api('/api/applications/me', {
    headers: { 'X-User-Id': userId },
  });
}

export async function getMyApplicationById(applicationId) {
  const userId = await getOrCreateSeekerUserId();
  return api(`/api/applications/${encodeURIComponent(applicationId)}`, {
    headers: { 'X-User-Id': userId },
  });
}

/**
 * GET /api/applications/:applicationId/recommend-jobs — sessionId, jobId, userId + HR AI recommendations.
 * @param {string} applicationId - UUID lamaran (job_applicants.id)
 * @param {{ hrApplicationId?: string }} [opts] - Override id untuk analyzer (mis. APP-SEEKER-001)
 */
export async function fetchJobRecommendations(applicationId, opts = {}) {
  const userId = await getOrCreateSeekerUserId();
  const q = new URLSearchParams();
  if (opts.hrApplicationId) {
    q.set('hrApplicationId', String(opts.hrApplicationId));
  }
  const qs = q.toString();
  const path = `/api/applications/${encodeURIComponent(applicationId)}/recommend-jobs${qs ? `?${qs}` : ''}`;
  return api(path, {
    headers: { 'X-User-Id': userId },
  });
}

/** GET /api/applications/:id/active-session — sesi aktif (invited/in_progress) + URL eksternal / kode */
export async function getActiveSessionForApplication(applicationId) {
  const userId = await getOrCreateSeekerUserId();
  return api(`/api/applications/${encodeURIComponent(applicationId)}/active-session`, {
    headers: { 'X-User-Id': userId },
  });
}

export async function getSeekerProfile() {
  const userId = await getOrCreateSeekerUserId();
  return api('/api/users/me', {
    headers: { 'X-User-Id': userId },
  });
}

/** Public: verifikasi access code id atau session_code (GET /api/access-codes/lookup?code=) */
export async function lookupAccessCode(code) {
  const trimmed = String(code || '').trim();
  if (!trimmed) {
    throw new Error('Kode wajib diisi');
  }
  return api(`/api/access-codes/lookup?code=${encodeURIComponent(trimmed)}`);
}

/** Hapus seeker id & email dari penyimpanan lokal (tanpa memanggil API). */
export function clearSeekerSession() {
  localStorage.removeItem(SEEKER_ID_KEY);
  localStorage.removeItem(SEEKER_EMAIL_KEY);
}

/**
 * Panggil POST /api/auth/logout lalu hapus seeker id.
 * Gagal jaringan tetap membersihkan penyimpanan lokal.
 */
export async function logoutSeeker() {
  const base = getApiBaseUrl().replace(/\/$/, '');
  const userId = localStorage.getItem(SEEKER_ID_KEY);
  try {
    await fetch(`${base}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(userId ? { 'X-User-Id': userId } : {}),
      },
      body: JSON.stringify({}),
    });
  } catch {
    /* tetap clear */
  }
  clearSeekerSession();
}
