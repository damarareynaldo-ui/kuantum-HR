import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import SeekerLayout from '../components/SeekerLayout';
import { fetchPublicJob } from '../lib/publicJobsApi.js';

function normalizeRequirements(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((r, i) => {
      if (typeof r === 'string') {
        return { label: `Requirement ${i + 1}`, value: r };
      }
      if (r && typeof r === 'object' && 'value' in r) {
        return { label: String(r.label || `Requirement ${i + 1}`), value: String(r.value) };
      }
      return { label: `Requirement ${i + 1}`, value: String(r) };
    });
  }
  return [];
}

const SeekerJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const j = await fetchPublicJob(String(id));
        if (!cancelled) setRow(j);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load job');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const currentJob = useMemo(() => {
    if (!row) {
      return {
        title: 'Role',
        company: 'Company',
        logo: null,
        matchScore: '—',
        insight: 'Open this role from the marketplace to see live data from the API.',
        description: '',
        requirements: [],
        responsibilities: [],
        metadata: { location: '—', type: '—', salary: '—', seniority: '—' },
        companyBlurb: '',
      };
    }
    const title = row.title || 'Role';
    const company = row.company_name || 'Company';
    const description = row.description || '';
    const reqs = normalizeRequirements(row.requirements);
    const responsibilities = description
      ? description.split(/\n+/).map((s) => s.trim()).filter(Boolean).slice(0, 8)
      : [];
    return {
      title,
      company,
      logo: null,
      matchScore: '—',
      insight: `This listing is served from the API. ${description ? description.slice(0, 160) : 'Review the description and apply to continue.'}${description.length > 160 ? '…' : ''}`,
      description: description || 'No description provided yet.',
      requirements: reqs.length ? reqs : [{ label: 'Overview', value: 'See job description for expectations.' }],
      responsibilities: responsibilities.length ? responsibilities : [description || 'See full description above.'],
      metadata: {
        location: '—',
        type: row.employment_type || '—',
        salary: '—',
        seniority: row.department || '—',
      },
      companyBlurb: row.company_industry
        ? `${company} — ${row.company_industry}.`
        : `${company} is hiring for this role.`,
    };
  }, [row]);

  return (
    <SeekerLayout>
      <div className="max-w-7xl mx-auto w-full py-8">
        <div
          onClick={() => navigate(-1)}
          className="mb-10 flex items-center gap-3 text-on-surface-variant cursor-pointer hover:text-primary transition-all group"
        >
          <span className="material-symbols-outlined text-sm font-black group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Marketplace</span>
        </div>

        {loading && <p className="text-sm font-bold text-on-surface-variant mb-6">Loading role…</p>}
        {error && !row && (
          <p className="text-sm font-bold text-error mb-6">{error}</p>
        )}

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-grow space-y-16">
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="flex items-start gap-8">
                <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center shadow-2xl shadow-black/5 border border-outline-variant/10 shrink-0">
                  {currentJob.logo ? (
                    <img src={currentJob.logo} alt={currentJob.company} className="w-14 h-14 object-contain" />
                  ) : (
                    <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      work
                    </span>
                  )}
                </div>
                <div className="space-y-3">
                  <h1 className="text-5xl font-black text-on-surface tracking-tighter italic uppercase leading-none">{currentJob.title}</h1>
                  <p className="text-2xl text-primary font-black tracking-tight uppercase italic">{currentJob.company}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" className="w-14 h-14 rounded-2xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all active:scale-90 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>share</span>
                </button>
                <button type="button" className="w-14 h-14 rounded-2xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all active:scale-90 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>bookmark_border</span>
                </button>
              </div>
            </section>

            <div className="bg-tertiary-fixed rounded-[3rem] p-10 relative overflow-hidden shadow-[0_45px_100px_-20px_rgba(249,115,22,0.2)] border border-tertiary-fixed-dim/20 group">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]">
                <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="relative z-10 flex items-start gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="w-16 h-16 rounded-3xl bg-white/40 backdrop-blur-3xl flex items-center justify-center text-tertiary shrink-0 border border-white/40 shadow-xl">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-tertiary text-on-tertiary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-tertiary/20">AI Match Insight</span>
                    <span className="text-on-tertiary-fixed font-black text-lg underline decoration-4 decoration-tertiary/10">Role fit {currentJob.matchScore}</span>
                  </div>
                  <p className="text-on-tertiary-fixed-variant text-lg font-bold leading-relaxed tracking-tighter uppercase italic opacity-95">
                    {currentJob.insight}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-16">
              <section className="space-y-6">
                <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">About the Role</h2>
                <div className="h-0.5 w-20 bg-primary/20"></div>
                <p className="text-xl text-on-surface-variant leading-relaxed font-bold tracking-tighter uppercase opacity-70 italic max-w-4xl">
                  {currentJob.description}
                </p>
              </section>

              <section className="space-y-8">
                <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">Responsibilities</h2>
                <div className="grid gap-4">
                  {currentJob.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-6 group">
                      <div className="mt-4 w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="text-lg text-on-surface-variant leading-relaxed font-black tracking-tighter uppercase italic opacity-60 group-hover:opacity-100 transition-opacity">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-10">
                <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">Candidate Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentJob.requirements.map((req, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 hover:bg-surface-bright transition-all group">
                      <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 opacity-60 group-hover:opacity-100">{req.label}</h3>
                      <p className="text-base text-on-surface-variant font-bold leading-relaxed tracking-tighter uppercase italic">
                        {req.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:w-[400px] shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="bg-surface-container-lowest p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-outline-variant/10 space-y-10">
                <div>
                  <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant/50 mb-8">Job Summary</h3>
                  <div className="space-y-6">
                    {[
                      { icon: 'location_on', label: 'Location', value: currentJob.metadata.location },
                      { icon: 'schedule', label: 'Work Type', value: currentJob.metadata.type },
                      { icon: 'payments', label: 'Salary', value: currentJob.metadata.salary },
                      { icon: 'verified', label: 'Seniority', value: currentJob.metadata.seniority },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4 text-on-surface-variant">
                          <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</span>
                        </div>
                        <span className="text-sm font-black text-on-surface uppercase tracking-tight italic">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/seeker/apply/${id}`)}
                    className="w-full py-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-[2rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] hover:scale-[1.03] active:scale-95 transition-all text-shadow"
                  >
                    Apply Now
                  </button>
                  <div className="pt-6 border-t border-outline-variant/10 text-center">
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.2em] opacity-50 italic">Live data from API when available</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant/10 space-y-6">
                <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-60">About {currentJob.company}</h4>
                <p className="text-sm leading-relaxed text-on-surface font-bold tracking-tighter uppercase italic opacity-80">
                  {currentJob.companyBlurb}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerJobDetail;
