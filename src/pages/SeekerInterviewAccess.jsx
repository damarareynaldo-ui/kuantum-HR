import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import { getApiBaseUrl } from '../lib/apiBase.js';
import { lookupAccessCode } from '../lib/seekerApi.js';

/**
 * Verifikasi kode akses (ID undangan atau session_code) lalu lanjut ke redirect wawancara.
 * GET /api/access-codes/lookup — publik.
 */
const SeekerInterviewAccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const externalUrl = searchParams.get('external') || '';
  const [code, setCode] = React.useState(() => searchParams.get('code') || '');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [verified, setVerified] = React.useState(null);

  React.useEffect(() => {
    const fromQuery = searchParams.get('code')?.trim();
    if (!fromQuery) return;
    let cancelled = false;
    setCode(fromQuery);
    setError('');
    setVerified(null);
    setLoading(true);
    lookupAccessCode(fromQuery)
      .then((data) => {
        if (!cancelled) setVerified(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Kode tidak valid atau kedaluwarsa');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  async function handleVerify(e) {
    e?.preventDefault?.();
    setError('');
    setVerified(null);
    setLoading(true);
    try {
      const data = await lookupAccessCode(code);
      setVerified(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kode tidak valid atau kedaluwarsa');
    } finally {
      setLoading(false);
    }
  }

  function openInterviewRedirect() {
    if (!verified?.sessionId) return;
    const base = getApiBaseUrl().replace(/\/$/, '');
    window.location.href = `${base}/api/agent/candidate/${encodeURIComponent(verified.sessionId)}/redirect`;
  }

  return (
    <SeekerLayout>
      <div className="max-w-lg mx-auto py-12 px-6">
        <h1 className="text-3xl font-black text-on-surface mb-2">Akses wawancara</h1>
        <p className="text-on-surface-variant text-sm font-medium mb-8 leading-relaxed">
          Masukkan <strong className="text-on-surface">kode akses</strong> yang Anda terima dari recruiter (bisa berupa kode pendek atau ID undangan).
        </p>

        {externalUrl ? (
          <div className="mb-8 p-5 rounded-2xl bg-primary/10 border border-primary/20 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Wawancara eksternal</p>
            <p className="text-sm font-medium text-on-surface-variant">
              Jika recruiter menyediakan platform mitra, Anda bisa membuka tautan ini setelah kode terverifikasi, atau langsung jika diizinkan.
            </p>
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline break-all"
            >
              Buka URL eksternal
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          </div>
        ) : null}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="access-code" className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-2">
              Kode akses
            </label>
            <input
              id="access-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-surface-container-low border-none font-bold text-on-surface focus:ring-4 focus:ring-primary/10"
              placeholder="Tempel kode di sini"
              autoComplete="off"
            />
          </div>
          {error ? (
            <p className="text-sm font-bold text-error">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full py-4 rounded-2xl signature-gradient text-white font-black text-sm uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? 'Memverifikasi…' : 'Verifikasi'}
          </button>
        </form>

        {verified ? (
          <div className="mt-10 p-6 rounded-[2rem] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-200">Kode valid</p>
            <p className="text-sm font-bold text-on-surface">
              Halo, <span className="text-primary">{verified.name}</span>
            </p>
            <p className="text-xs text-on-surface-variant font-medium break-all">
              Session: {verified.sessionId}
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={openInterviewRedirect}
                className="w-full py-4 rounded-2xl bg-emerald-700 text-white font-black text-xs uppercase tracking-widest hover:opacity-95"
              >
                Lanjut ke ruang wawancara
              </button>
              <button
                type="button"
                onClick={() => navigate('/seeker/dashboard')}
                className="text-sm font-bold text-on-surface-variant hover:text-primary"
              >
                Kembali ke dashboard
              </button>
            </div>
          </div>
        ) : null}

        <p className="mt-10 text-[10px] text-on-surface-variant font-medium leading-relaxed">
          Dari halaman persiapan, tombol mulai akan mengarah ke sini agar kode terverifikasi sebelum masuk ruang wawancara.
        </p>
      </div>
    </SeekerLayout>
  );
};

export default SeekerInterviewAccess;
