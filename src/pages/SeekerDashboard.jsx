import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import { getMyApplications, getSeekerProfile } from '../lib/seekerApi';

function formatWhen(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [applications, setApplications] = React.useState([]);
  const [profile, setProfile] = React.useState(null);
  const toast = location.state?.toast;

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const rows = await getMyApplications();
        if (!cancelled) setApplications(Array.isArray(rows) ? rows : []);
      } catch {
        if (!cancelled) setApplications([]);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getSeekerProfile();
        if (!cancelled) setProfile(me);
      } catch {
        if (!cancelled) setProfile(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = profile?.name || profile?.email || 'there';
  const top = applications[0];

  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">My Applications</h1>
          <p className="text-on-surface-variant text-base">
            Welcome back, <span className="font-semibold text-on-surface">{displayName}</span>. Track your applications and
            interview progress here.
          </p>
          {toast ? (
            <p className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-bold text-primary">
              {toast}
            </p>
          ) : null}
          <p className="mt-4 text-sm text-on-surface-variant">
            Punya <strong className="text-on-surface">kode akses</strong> dari undangan?{' '}
            <Link className="font-bold text-primary hover:underline" to="/seeker/interview/access">
              Verifikasi &amp; mulai wawancara
            </Link>
          </p>
        </header>

        <div className="bg-surface-container-low rounded-[2rem] overflow-hidden p-1 shadow-sm border border-outline-variant/10">
          <div className="bg-surface-container-lowest rounded-[1.8rem] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Job Title</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Company</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {applications.map((app, i) => (
                  <tr key={app.id || i} className="group transition-colors hover:bg-surface-container-low/30">
                    <td className="px-8 py-6">
                      <div
                        onClick={() => navigate(`/seeker/job/${app.jobId}`)}
                        className="flex flex-col cursor-pointer group/title"
                      >
                        <span className="text-base font-bold text-on-surface group-hover/title:text-primary transition-colors underline-offset-4 group-hover/title:underline">{app.jobTitle}</span>
                        <span className="text-xs text-on-surface-variant font-medium opacity-70">{app.department || '-'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-outline text-xl">corporate_fare</span>
                        </div>
                        <span className="text-sm font-bold text-on-surface">{app.companyName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          String(app.status) === 'applied'
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100'
                            : String(app.status) === 'invited'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : String(app.status) === 'completed'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-surface-container-highest text-on-surface-variant'
                        }`}
                      >
                        {String(app.status) === 'applied' ? 'Menunggu undangan' : app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {String(app.status) === 'completed' ? (
                        <button
                          onClick={() => navigate(`/seeker/results/${app.id}`)}
                          className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                          View Feedback
                        </button>
                      ) : String(app.status) === 'invited' && app.sessionId ? (
                        <button onClick={() => navigate(`/seeker/interview/prepare/${app.id}`)} className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                          Start Interview
                        </button>
                      ) : String(app.status) === 'applied' ? (
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">—</span>
                      ) : (
                        <button type="button" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {top && (
          <div className="mt-10 relative overflow-hidden rounded-[2rem] bg-tertiary-fixed p-8 flex flex-col md:flex-row gap-8 items-center shadow-xl border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
            <div className="z-10 flex-shrink-0 bg-white/30 backdrop-blur-md rounded-2xl p-4">
              <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div className="z-10 flex-1">
              <h3 className="text-xl font-black text-on-tertiary-fixed mb-2">
                Next up: {top.jobTitle}
                {top.companyName ? <span className="text-on-tertiary-fixed-variant font-bold"> — {top.companyName}</span> : null}
              </h3>
              <p className="text-on-tertiary-fixed-variant text-base leading-relaxed max-w-2xl font-medium">
                {String(top.status) === 'applied'
                  ? 'Lamaran Anda sudah diterima. Tunggu recruiter membuat sesi wawancara — Anda akan melihat status berubah ke undangan di sini.'
                  : String(top.status) === 'invited' && top.sessionId
                    ? 'Undangan wawancara aktif. Mulai dari halaman persiapan ketika Anda siap.'
                    : String(top.status) === 'completed'
                      ? 'Sesi selesai. Buka hasil untuk skor dan umpan balik.'
                      : 'Perbaruan akan muncul di sini seiring proses rekrutmen.'}
              </p>
            </div>
            <div className="z-10 flex flex-col sm:flex-row gap-3">
              {String(top.status) === 'invited' && top.sessionId ? (
                <button
                  type="button"
                  onClick={() => navigate(`/seeker/interview/prepare/${top.id}`)}
                  className="px-8 py-4 bg-on-tertiary-fixed text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/10 hover:opacity-90 transition-all"
                >
                  Prepare
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => navigate(`/seeker/job/${top.jobId}`)}
                className="px-8 py-4 bg-white/20 text-on-tertiary-fixed rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/30 transition-all"
              >
                Role details
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/10">
            <h2 className="text-2xl font-black mb-8 text-on-surface tracking-tight">Application activity</h2>
            <div className="space-y-10">
              {applications.length === 0 ? (
                <p className="text-on-surface-variant font-medium">No applications yet. Browse the marketplace to apply.</p>
              ) : (
                applications.slice(0, 5).map((app) => (
                  <div key={`tl-${app.id}`} className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-primary z-10 ring-4 ring-primary/20"></div>
                      <div className="w-0.5 h-full bg-outline-variant/30 absolute top-4"></div>
                    </div>
                    <div className="pb-4">
                      <h4 className="text-base font-black text-on-surface">{app.jobTitle}</h4>
                      <p className="text-sm text-on-surface-variant font-medium opacity-70">
                        {formatWhen(app.createdAt)} · Status: {app.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-surface-container-highest rounded-[2rem] p-10 flex flex-col justify-between border border-outline-variant/10 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 text-on-surface tracking-tight">Next step</h2>
              <p className="text-base text-on-surface-variant leading-relaxed font-medium opacity-80">
                Use a quiet space, stable connection, and working camera before you start an AI-led interview.
              </p>
            </div>
            <div className="mt-8 relative z-10">
              <div className="w-full h-40 rounded-2xl mb-6 bg-gradient-to-br from-primary/20 via-surface-container to-tertiary-fixed/30 border border-outline-variant/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary/80">videocam</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/seeker/schedule')}
                className="w-full text-primary text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 group hover:gap-4 transition-all"
              >
                Interview schedule
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerDashboard;
