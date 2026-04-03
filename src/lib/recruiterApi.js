/**
 * Demo HR: login once, simpan X-User-Id, pastikan role recruiter untuk POST /api/jobs.
 */
const RECRUITER_ID_KEY = "kuantum.recruiter.userId";

export async function ensureRecruiterUserId(apiBaseUrl) {
  const base = apiBaseUrl.replace(/\/$/, "");
  const cached = localStorage.getItem(RECRUITER_ID_KEY);
  if (cached) {
    return cached;
  }

  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "demo@kuantum.local",
      name: "Demo Recruiter",
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Recruiter login failed (${res.status})`);
  }
  const data = await res.json();
  const id = data?.token;
  if (!id) throw new Error("No user id from login");

  try {
    await fetch(`${base}/api/users/me`, {
      method: "PATCH",
      headers: recruiterAuthHeaders(id),
      body: JSON.stringify({ role: "recruiter" }),
    });
  } catch {
    /* seed user may already be recruiter */
  }

  localStorage.setItem(RECRUITER_ID_KEY, id);
  return id;
}

/** Explicit recruiter login (overwrites cached recruiter id). */
export async function loginRecruiter(apiBaseUrl, email, name = 'Recruiter') {
  const base = apiBaseUrl.replace(/\/$/, '');
  const normalized = String(email || 'demo@kuantum.local')
    .trim()
    .toLowerCase() || 'demo@kuantum.local';
  const res = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: normalized,
      name: (name && String(name).trim()) || 'Recruiter',
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Recruiter login failed (${res.status})`);
  }
  const data = await res.json();
  const id = data?.token;
  if (!id) throw new Error('No user id from login');

  try {
    await fetch(`${base}/api/users/me`, {
      method: 'PATCH',
      headers: recruiterAuthHeaders(id),
      body: JSON.stringify({ role: 'recruiter' }),
    });
  } catch {
    /* seed user may already be recruiter */
  }

  localStorage.setItem(RECRUITER_ID_KEY, id);
  return id;
}

export function recruiterAuthHeaders(userId) {
  return {
    "Content-Type": "application/json",
    "X-User-Id": userId,
  };
}

export async function createJob(apiBaseUrl, payload) {
  const base = apiBaseUrl.replace(/\/$/, "");
  const userId = await ensureRecruiterUserId(base);
  const res = await fetch(`${base}/api/jobs`, {
    method: "POST",
    headers: recruiterAuthHeaders(userId),
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Create job failed (${res.status})`);
  }
  return data;
}
