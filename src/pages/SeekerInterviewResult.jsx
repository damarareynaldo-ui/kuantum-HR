import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import { getMyApplicationById } from '../lib/seekerApi';
import { fetchSessionResults } from '../lib/hrApi.js';

function formatOverallPct(v) {
  if (v == null || Number.isNaN(Number(v))) return null;
  const n = Number(v);
  if (n <= 10 && n >= 0) return Math.round(n * 10);
  return Math.round(n);
}

function initials(name, email) {
  const n = String(name || '').trim();
  if (n) {
    const p = n.split(/\s+/).filter(Boolean);
    if (p.length >= 2) return (p[0][0] + p[p.length - 1][0]).toUpperCase();
    return n.slice(0, 2).toUpperCase();
  }
  const e = String(email || '').trim();
  return e ? e.slice(0, 2).toUpperCase() : '?';
}

const SeekerInterviewResult = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [application, setApplication] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const app = await getMyApplicationById(String(id));
        if (cancelled) return;
        setApplication(app);
        const sid = app?.sessionId;
        if (!sid) {
          setResult(null);
          setLoading(false);
          return;
        }
        const r = await fetchSessionResults(String(sid));
        if (!cancelled) setResult(r);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load results');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const jobTitle = result?.job?.title || application?.job?.title || 'Interview';
  const company = result?.company?.name || '';
  const candidateName = result?.candidate?.name || application?.candidateName || 'You';
  const candidateEmail = result?.candidate?.email || application?.candidateEmail || '';
  const pct = formatOverallPct(result?.overallScore);
  const competencies = (result?.competencies || []).filter((c) => c.val != null).slice(0, 6);

  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-1">{jobTitle}</h2>
            <div className="flex items-center space-x-2 flex-wrap">
              {company ? <span className="text-primary font-bold">{company}</span> : null}
              {company ? <span className="text-on-surface-variant">•</span> : null}
              <span className="text-on-surface-variant">Interview feedback</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 text-primary text-xs font-black flex items-center justify-center ring-2 ring-primary/10">
              {initials(candidateName, candidateEmail)}
            </div>
            <span className="text-sm font-bold text-on-surface">{candidateName}</span>
          </div>
        </header>

        {loading && <p className="text-on-surface-variant font-medium mb-8">Loading results…</p>}
        {error && <p className="text-error font-bold mb-8">{error}</p>}

        {!loading && !error && application && !application.sessionId && (
          <p className="text-on-surface-variant mb-8">
            No session is linked to this application yet, or scoring is still in progress.
          </p>
        )}

        {result && result.sessionId && (
          <>
            <section className="mb-12">
              <div className="bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-primary tracking-tight">SESSION COMPLETE</h3>
                    <p className="text-sm text-on-surface-variant font-medium max-w-lg">
                      {result.summary
                        ? String(result.summary).slice(0, 280) + (String(result.summary).length > 280 ? '…' : '')
                        : 'Review the competency breakdown and summary below.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/seeker/dashboard')}
                  className="whitespace-nowrap px-8 py-3.5 bg-white border border-outline-variant text-on-surface rounded-xl font-bold text-sm hover:bg-surface-container-low transition-all active:scale-95"
                >
                  Back to applications
                </button>
              </div>
            </section>

            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-5 space-y-8">
                <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-surface-variant/50">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Overall score</h4>
                    <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                  </div>
                  {pct != null ? (
                    <>
                      <div className="flex items-end space-x-4">
                        <span className="text-8xl font-black text-primary tracking-tighter leading-none">
                          {pct}
                          <span className="text-3xl font-bold ml-1">%</span>
                        </span>
                        <div className="pb-3">
                          <p className="text-[11px] text-on-surface-variant font-medium opacity-70">From interview analysis</p>
                        </div>
                      </div>
                      <div className="mt-10 h-4 w-full bg-surface-container rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-on-surface-variant font-medium">No overall score available yet.</p>
                  )}
                </div>

                <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-surface-variant/50">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-10">Competencies</h4>
                  <div className="space-y-8">
                    {competencies.length === 0 ? (
                      <p className="text-sm text-on-surface-variant">Detailed scores will appear when analysis is ready.</p>
                    ) : (
                      competencies.map((skill, idx) => {
                        const val = Number(skill.val) || 0;
                        const w = Math.min(100, Math.max(0, val * 10));
                        return (
                          <div key={idx}>
                            <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-wider">
                              <span className="text-on-surface opacity-70">{skill.label}</span>
                              <span className="text-primary">{val.toFixed(1)}/10</span>
                            </div>
                            <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${w}%` }} />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 space-y-8">
                {result.summary && (
                  <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-3xl p-10 relative overflow-hidden shadow-lg shadow-tertiary/5">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
                    <div className="flex items-center space-x-2 mb-6">
                      <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Summary</h4>
                    </div>
                    <p className="text-xl font-bold leading-relaxed tracking-tight">{String(result.summary)}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-surface-container-low rounded-3xl p-8 border border-surface-variant/30">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Growth outlook</h4>
                    <p className="text-sm font-bold text-on-surface leading-snug">
                      {result.growthPrediction || 'Not provided for this session.'}
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-3xl p-8 border border-surface-variant/30">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-tertiary mb-6">Flags / notes</h4>
                    <p className="text-sm font-bold text-on-surface leading-snug">
                      {result.redFlags || 'None recorded.'}
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-primary/20">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4">What&apos;s next</h4>
                  <p className="text-sm text-on-surface-variant font-medium">
                    The hiring team may follow up by email. You can return to your dashboard to track other applications.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/seeker/schedule')}
                    className="mt-6 px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    View schedule
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <footer className="mt-20 pt-10 border-t border-surface-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em]">
          <div className="flex items-center space-x-6 opacity-60">
            {result?.sessionId ? <span>Session: {String(result.sessionId).slice(0, 8)}…</span> : null}
          </div>
          <div className="flex items-center space-x-2 opacity-100 text-primary">
            <span className="material-symbols-outlined text-base">shield</span>
            <span className="opacity-80">Your data is handled per the privacy policy</span>
          </div>
        </footer>
      </div>
    </SeekerLayout>
  );
};

export default SeekerInterviewResult;
