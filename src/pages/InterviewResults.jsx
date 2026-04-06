import React from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchSessionResults, fetchExternalInterviewResult } from '../lib/hrApi.js';

function initialsFromName(name, email) {
  const n = String(name || '').trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return n.slice(0, 2).toUpperCase();
  }
  const e = String(email || '').trim();
  return e ? e.slice(0, 2).toUpperCase() : '?';
}

/** Normalisasi respons HR AI Analyzer → bentuk mirip session results. */
function mapExternalAnalyzerPayload(raw) {
  const d = raw?.data || {};
  const sb = d.score_breakdown || {};
  const order = ['technical', 'culture_fit', 'communication', 'problem_solving'];
  const labelMap = {
    technical: 'Technical',
    culture_fit: 'Culture Fit',
    communication: 'Communication',
    problem_solving: 'Problem Solving',
  };
  const competencies = order
    .filter((k) => sb[k])
    .map((k) => ({
      label: labelMap[k] || k,
      val: Number(sb[k]?.score ?? 0),
    }));
  const insight = d.ai_evaluation_insight || {};
  const strengths = Array.isArray(insight.key_strengths) ? insight.key_strengths : [];
  const growthAreas = Array.isArray(insight.growth_areas) ? insight.growth_areas : [];
  const avg =
    competencies.length > 0
      ? competencies.reduce((a, c) => a + Number(c.val || 0), 0) / competencies.length
      : null;
  const transcript = Array.isArray(raw?.transcript) ? raw.transcript : [];

  return {
    source: 'external',
    applicationId: raw.application_id,
    status: raw.status,
    sessionId: null,
    candidate: { name: '', email: '' },
    job: { title: 'Interview analysis' },
    company: null,
    transcript,
    summary: d.executive_summary || '',
    competencies,
    keyMoments: strengths,
    growthAreas,
    redFlags: null,
    machineRecommendation: d.machine_recommendation || '',
    overallScore: avg != null ? Math.round(avg * 10) : null,
    analysis: null,
  };
}

function formatClock(ts) {
  if (!Number.isFinite(Number(ts))) return '';
  try {
    return new Date(Number(ts)).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

const InterviewResults = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const applicationId = params.get('applicationId');
  const sessionId = params.get('sessionId');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        if (applicationId) {
          const raw = await fetchExternalInterviewResult(applicationId);
          if (!cancelled) setResult(mapExternalAnalyzerPayload(raw));
        } else if (sessionId) {
          const r = await fetchSessionResults(sessionId);
          if (!cancelled) setResult({ ...r, source: 'session' });
        } else {
          if (!cancelled) setError('Add applicationId or sessionId in the URL.');
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load results');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applicationId, sessionId]);

  const transcript = React.useMemo(() => {
    if (!result?.transcript) return [];
    if (Array.isArray(result.transcript)) {
      return result.transcript
        .map((item) => {
          const isUser = String(item?.role || '').toLowerCase() === 'user';
          const isAssistant = String(item?.role || '').toLowerCase() === 'assistant';
          if (!isUser && !isAssistant) return null;
          return {
            role: isUser ? 'Candidate' : 'AI',
            name: isUser ? result?.candidate?.name || 'Candidate' : 'Kuantum Interviewer',
            time: formatClock(item?.createdAt),
            text: String(item?.text || '').trim(),
            user: isUser,
          };
        })
        .filter((x) => x && x.text);
    }
    return String(result.transcript)
      .split('\n')
      .filter(Boolean)
      .map((text, idx) => ({
        role: idx % 2 ? 'Candidate' : 'AI',
        name: idx % 2 ? result?.candidate?.name || 'Candidate' : 'Kuantum Interviewer',
        time: '',
        text,
        user: idx % 2 === 1,
      }));
  }, [result]);

  const scores = React.useMemo(() => {
    return (result?.competencies || []).slice(0, 4).map((c) => {
      let v = Number(c.val ?? 0);
      if (v > 10 && v <= 100) v = v / 10;
      const score = Math.min(10, Math.max(0, Math.round(v)));
      return { label: c.label, score };
    });
  }, [result]);

  const strengthItems = React.useMemo(() => {
    const km = result?.keyMoments ?? result?.analysis?.keyMoments;
    if (!Array.isArray(km) || !km.length) return ['No key strengths listed yet.'];
    return km.map((item) =>
      typeof item === 'string' ? item : item?.quote || item?.topic || String(item)
    );
  }, [result]);

  const growthItems = React.useMemo(() => {
    if (Array.isArray(result?.growthAreas) && result.growthAreas.length) return result.growthAreas;
    if (result?.redFlags) return [typeof result.redFlags === 'string' ? result.redFlags : String(result.redFlags)];
    return ['None flagged.'];
  }, [result]);

  const recommendationTitle =
    result?.machineRecommendation ||
    (result?.overallScore != null && Number(result.overallScore) >= 80 ? 'RECOMMENDED FOR HIRE' : 'REVIEW FURTHER');

  const titleJob = result?.job?.title || 'Session';
  const subtitleBits = [];
  if (applicationId) subtitleBits.push(`Application: ${applicationId}`);
  if (result?.sessionId) subtitleBits.push(`Session: ${result.sessionId}`);
  if (result?.candidate?.name) subtitleBits.push(result.candidate.name);

  return (
    <Layout>
      <div className="h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex items-center justify-between px-2">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-dim transition-all active:scale-95">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="h-10 w-px bg-outline-variant/20"></div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-on-surface leading-none">Interview Results: {titleJob}</h1>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mt-1 opacity-60">
                {subtitleBits.join(' • ') || '—'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button type="button" className="p-3 text-on-surface-variant hover:text-primary transition-colors">
               <span className="material-symbols-outlined">notifications</span>
             </button>
             <button type="button" className="p-3 text-on-surface-variant hover:text-primary transition-colors">
               <span className="material-symbols-outlined">settings</span>
             </button>
             <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-primary/15 text-primary text-[10px] font-black flex items-center justify-center">
               {initialsFromName(result?.candidate?.name, result?.candidate?.email)}
             </div>
          </div>
        </header>

        {loading && (
          <p className="text-sm font-bold text-on-surface-variant px-2">Loading results…</p>
        )}

        <div className="flex-1 flex overflow-hidden gap-8">
          <section className="flex-1 flex flex-col bg-surface-container-low rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-sm">
            <div className="p-6 bg-surface-container-lowest flex items-center justify-between border-b border-outline-variant/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                   <span className="material-symbols-outlined text-xl">forum</span>
                </div>
                <h3 className="font-black text-on-surface tracking-tight uppercase tracking-widest text-[12px]">Interview Transcript</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] px-3 py-1 bg-secondary/10 text-secondary rounded-full font-black tracking-widest uppercase">
                  {result?.source === 'external' ? 'Analyzer' : 'Recorded'}
                </span>
                <button type="button" className="material-symbols-outlined text-outline opacity-40 hover:opacity-100 transition-opacity">more_vert</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar font-sans">
              {transcript.length === 0 && !loading && (
                <p className="text-sm text-on-surface-variant font-medium max-w-xl">
                  {result?.source === 'external'
                    ? 'Transcript is not included in the external analyzer response. Use the analysis panel for scores and summary.'
                    : 'No transcript lines yet.'}
                </p>
              )}
              {transcript.map((chat, idx) => (
                <div key={idx} className="flex gap-6 max-w-3xl">
                  {chat.user ? (
                    <div className="w-10 h-10 shrink-0 rounded-2xl bg-primary/10 ring-2 ring-white flex items-center justify-center text-[10px] font-black text-primary">
                       {initialsFromName(result?.candidate?.name, result?.candidate?.email)}
                    </div>
                  ) : (
                    <div className="w-10 h-10 shrink-0 rounded-2xl bg-surface-container-highest flex items-center justify-center text-[10px] font-black text-on-surface-variant shadow-sm ring-2 ring-white uppercase">AI</div>
                  )}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className={`text-[12px] font-black uppercase tracking-widest ${chat.user ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>{chat.name}</span>
                      <span className="text-[10px] text-on-surface-variant opacity-40 font-bold">{chat.time || ''}</span>
                    </div>
                    <div className={`p-6 rounded-[1.8rem] text-sm leading-relaxed shadow-sm border border-outline-variant/5 ${chat.user ? 'bg-white text-on-surface' : 'bg-transparent text-on-surface-variant italic'}`}>
                      {chat.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-[440px] flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-2">
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant mb-10 flex items-center gap-3">
                 <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                 Score Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {scores.length === 0 && !loading && (
                  <p className="text-xs text-on-surface-variant col-span-2">No competency scores yet.</p>
                )}
                {scores.map((s, i) => (
                  <div key={i} className="flex flex-col items-center p-6 rounded-3xl bg-surface-container-low border border-outline-variant/5 group hover:bg-white transition-all hover:shadow-xl hover:shadow-on-surface/5">
                    <div className="relative flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle className="text-surface-container" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeWidth="4" />
                        <circle className="text-primary transition-all duration-1000" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeDasharray="226" strokeDashoffset={226 - (s.score / 10) * 226} strokeWidth="4" />
                      </svg>
                      <span className="absolute text-base font-black text-on-surface">{s.score}/10</span>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 text-center leading-tight h-8">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-tertiary-fixed p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-tertiary/10">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 translate-x-1/4 -translate-y-1/4 transition-all duration-700">
                 <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-on-tertiary-fixed-variant mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                 Executive summary
              </h3>
              <p className="text-sm text-on-tertiary-fixed-variant leading-relaxed font-medium">
                {result?.summary || 'Summary not available yet.'}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-primary shadow-sm">
                <h4 className="text-[11px] font-black text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">thumb_up</span>
                  Key Strengths
                </h4>
                <ul className="space-y-4">
                  {strengthItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                       <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-error shadow-sm">
                <h4 className="text-[11px] font-black text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-lg">priority_high</span>
                  Growth Areas
                </h4>
                <ul className="space-y-4">
                  {growthItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                       <span className="material-symbols-outlined text-error text-[16px]">cancel</span>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <div className="w-full bg-[#10b981] text-white p-10 rounded-[2.8rem] flex flex-col items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 transform hover:scale-[1.02] transition-all cursor-default relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                 <div className="space-y-1 text-center">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80">Machine Recommendation</span>
                    <h2 className="text-2xl font-black leading-none tracking-tighter">{recommendationTitle}</h2>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button
                   type="button"
                   onClick={() => navigate('/candidates')}
                   className="flex-1 py-5 rounded-[1.8rem] bg-surface-container-low text-on-surface-variant font-black text-[10px] uppercase tracking-[0.2em] hover:bg-surface-dim transition-all active:scale-95"
                 >
                   Archive
                 </button>
                 <Link
                   to="/invite"
                   className="flex-[2] py-5 rounded-[1.8rem] bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                 >
                   Schedule Next Round
                   <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                 </Link>
              </div>
            </div>
          </section>
        </div>
        {error && <p className="text-sm font-bold text-error px-2">{error}</p>}
      </div>
    </Layout>
  );
};

export default InterviewResults;
