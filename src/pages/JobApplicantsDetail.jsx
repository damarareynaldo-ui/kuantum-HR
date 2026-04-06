import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getApiBaseUrl } from '../lib/apiBase.js';
import { fetchCvEmployerResult } from '../lib/hrApi.js';
import { fetchPublicJob } from '../lib/publicJobsApi.js';
import { ensureRecruiterUserId, recruiterAuthHeaders } from '../lib/recruiterApi.js';

function CvMatchCell({ entry }) {
  if (!entry || entry.phase === 'loading') {
    return (
      <td className="px-10 py-8 align-top">
        <span className="inline-block h-5 w-16 bg-on-surface-variant/10 rounded animate-pulse" />
      </td>
    );
  }
  if (entry.phase === 'error') {
    return (
      <td className="px-10 py-8 align-top text-xs text-on-surface-variant/60 font-medium">
        —
      </td>
    );
  }
  const p = entry.payload;
  if (!p) {
    return (
      <td className="px-10 py-8 align-top text-xs text-on-surface-variant font-medium max-w-[220px]">
        Belum ada analisis CV
      </td>
    );
  }
  if (p.status && p.status !== 'COMPLETED') {
    return (
      <td className="px-10 py-8 align-top text-xs font-bold text-amber-800">
        {String(p.status)}
      </td>
    );
  }
  const d = p.data;
  if (!d || typeof d !== 'object') {
    return (
      <td className="px-10 py-8 align-top text-xs text-on-surface-variant">—</td>
    );
  }
  const score = d.match_score;
  const recommendation = d.recommendation;
  const recStr = String(recommendation || '');
  const isNegative = /tidak\s*lanjut/i.test(recStr) || /^tidak\b/i.test(recStr.trim());

  return (
    <td className="px-10 py-8 align-top max-w-[260px]">
      <div className="flex flex-col gap-1.5">
        {typeof score === 'number' && (
          <span className="text-xl font-black text-on-surface tabular-nums leading-none">{score}%</span>
        )}
        {recommendation && (
          <span
            title={typeof d.ai_reason === 'string' ? d.ai_reason : undefined}
            className={`inline-flex self-start px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wide border ${
              isNegative
                ? 'bg-amber-50 text-amber-900 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800/50'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-100 dark:border-emerald-800/50'
            }`}
          >
            {recommendation}
          </span>
        )}
        {!recommendation && typeof score !== 'number' && <span className="text-xs text-on-surface-variant">—</span>}
      </div>
    </td>
  );
}

const JobApplicantsDetail = () => {
  const { id } = useParams();
  const apiBase = getApiBaseUrl();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [cvMatchByApplicationId, setCvMatchByApplicationId] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const j = await fetchPublicJob(String(id));
        if (!cancelled) setJob(j);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load job');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const recruiterId = await ensureRecruiterUserId(apiBase);
        const res = await fetch(`${apiBase}/api/jobs/${encodeURIComponent(String(id))}/applications`, {
          headers: recruiterAuthHeaders(recruiterId),
        });
        const data = await res.json().catch(() => []);
        if (!res.ok) {
          throw new Error(data?.error || `Applications failed (${res.status})`);
        }
        if (!cancelled) setApplicants(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError((prev) => prev || (e instanceof Error ? e.message : 'Failed to load applicants'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase, id]);

  useEffect(() => {
    if (applicants.length === 0) {
      setCvMatchByApplicationId({});
      return;
    }
    let cancelled = false;
    const ids = applicants.map((a) => String(a.id));
    setCvMatchByApplicationId(Object.fromEntries(ids.map((aid) => [aid, { phase: 'loading' }])));

    (async () => {
      const entries = await Promise.all(
        ids.map(async (aid) => {
          try {
            const payload = await fetchCvEmployerResult(aid);
            return [aid, { phase: 'done', payload }];
          } catch {
            return [aid, { phase: 'error' }];
          }
        }),
      );
      if (!cancelled) {
        setCvMatchByApplicationId(Object.fromEntries(entries));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applicants]);

  const title = job?.title || 'Job';
  const department = job?.department || '—';
  const description = job?.description || '';
  const totalApplicants = applicants.length;
  const pendingInvite = applicants.filter((a) => !a.session_id).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {error && (
          <div className="rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm font-bold text-error">
            {error}
          </div>
        )}

        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-primary/5">
                {department}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100/50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Active
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-on-surface leading-none">{title}</h1>
            <p className="text-on-surface-variant font-medium max-w-xl leading-relaxed text-lg opacity-70">
              {description || '—'}
            </p>
            <p className="text-sm text-on-surface-variant font-medium max-w-2xl">
              Alur: pelamar melamar → Anda memilih pelamar di bawah → <strong className="text-on-surface">Buat sesi wawancara</strong> menghasilkan link eksternal dan kode akses untuk kandidat.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-surface-container-low px-8 py-6 rounded-3xl border border-outline-variant/5 flex flex-col items-start min-w-[170px] shadow-sm">
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-2">Pelamar</span>
              <span className="text-4xl font-black text-on-surface leading-none">{loading ? '…' : totalApplicants}</span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 px-8 py-6 rounded-3xl border border-amber-200/50 flex flex-col items-start min-w-[170px] shadow-sm">
              <span className="text-[10px] font-black text-amber-800/80 uppercase tracking-widest mb-2">Belum ada sesi</span>
              <span className="text-4xl font-black text-amber-900 leading-none">{loading ? '…' : pendingInvite}</span>
            </div>
          </div>
        </section>

        <nav className="flex items-center gap-10 border-b border-outline-variant/10">
          <button
            type="button"
            className="text-sm font-black uppercase tracking-widest pb-6 -mb-[1px] transition-all text-primary border-b-2 border-primary"
          >
            Pelamar ({totalApplicants})
          </button>
          <Link
            to={`/interviews?jobId=${encodeURIComponent(String(id))}`}
            className="text-sm font-black uppercase tracking-widest pb-6 text-on-surface-variant hover:text-primary transition-colors"
          >
            Halaman buat sesi wawancara
          </Link>
        </nav>

        <div className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-sm border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50">
              <tr className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] border-b border-outline-variant/5">
                <th className="px-10 py-6">Kandidat</th>
                <th className="px-10 py-6">Match result</th>
                <th className="px-10 py-6">Sesi</th>
                <th className="px-10 py-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {applicants.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="px-10 py-12 text-center text-on-surface-variant font-bold">
                    Belum ada pelamar. Bagikan lowongan ke pasar kerja (job seeker).
                  </td>
                </tr>
              )}
              {applicants.map((applicant, i) => {
                const sid = applicant.session_id;
                const hasSession = Boolean(sid);
                return (
                  <tr
                    key={String(applicant.id)}
                    className={`hover:bg-primary/5 transition-all duration-300 group ${i % 2 !== 0 ? 'bg-surface-container-low/20' : ''}`}
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                          {(applicant.name || applicant.email || '?').toString().slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-lg font-black text-on-surface leading-tight mb-1">{applicant.name || '—'}</p>
                          <p className="text-xs text-on-surface-variant font-medium opacity-50 uppercase tracking-wider">{applicant.email || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <CvMatchCell entry={cvMatchByApplicationId[String(applicant.id)]} />
                    <td className="px-10 py-8 text-sm text-on-surface-variant font-medium">
                      {hasSession ? (
                        <span className="text-emerald-700 font-bold">Aktif · {String(sid).slice(0, 8)}…</span>
                      ) : (
                        <span className="text-amber-800 font-bold">Belum diundang wawancara</span>
                      )}
                    </td>
                    <td className="px-10 py-8 text-right space-y-2">
                      {!hasSession ? (
                        <Link
                          to={`/interviews?jobId=${encodeURIComponent(String(id))}&applicationId=${encodeURIComponent(String(applicant.id))}`}
                          className="inline-flex px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-95"
                        >
                          Buat sesi &amp; kode akses
                        </Link>
                      ) : (
                        <div className="flex flex-col items-end gap-2">
                          <Link
                            to={`/results/detail?applicationId=${encodeURIComponent(String(applicant.id))}&sessionId=${encodeURIComponent(String(sid))}`}
                            className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline"
                          >
                            Lihat hasil / transkrip
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-6">
          <p className="text-xs font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">
            Data dari GET /api/jobs/:id/applications
          </p>
          <Link to="/jobs" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">
            ← Semua lowongan
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default JobApplicantsDetail;
