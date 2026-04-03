import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import SeekerLayout from '../components/SeekerLayout';
import { fetchPublicJobs } from '../lib/publicJobsApi.js';

const CAROUSEL_META = [
  { color: 'from-primary to-[#0038a8]', icon: 'bolt' },
  { color: 'from-[#4361EE] to-[#3F37C9]', icon: 'code' },
  { color: 'from-[#7209B7] to-[#560BAD]', icon: 'palette' },
  { color: 'from-[#4CC9F0] to-[#4895EF]', icon: 'architecture' },
];

function decorateCarouselRow(job, idx) {
  const meta = CAROUSEL_META[idx % CAROUSEL_META.length];
  return {
    id: job.id,
    title: job.title || 'Role',
    company: job.company_name || 'Company',
    department: job.department || '—',
    employmentType: job.employment_type || '—',
    matchReason:
      job.description?.trim() ||
      `Details for ${job.title || 'this role'} at ${job.company_name || 'the team'}.`,
    featured: idx === 0,
    color: meta.color,
    icon: meta.icon,
    insightLabel: job.title || 'Role',
    insightText:
      job.description?.trim() ||
      'Explore this opening and apply to start your interview journey.',
  };
}

const JobMarketplace = () => {
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchPublicJobs();
        if (!cancelled) {
          setJobs(rows);
          setActiveIndex(0);
        }
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : 'Failed to load jobs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const aiRecommendedJobs = useMemo(() => jobs.slice(0, 4).map(decorateCarouselRow), [jobs]);
  const recentJobs = useMemo(
    () =>
      jobs.map((j) => ({
        id: j.id,
        title: j.title || 'Role',
        company: j.company_name || 'Company',
        location: '—',
        type: j.employment_type || '—',
        salary: '—',
        description: j.description?.trim() || 'No description yet.',
        icon: 'work',
        hot: false,
      })),
    [jobs]
  );

  // Logic to handle career selection and centering
  const selectJob = (index) => {
    setActiveIndex(index);
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const handleNext = () => {
    const len = aiRecommendedJobs.length;
    if (!len) return;
    const nextIndex = (activeIndex + 1) % len;
    selectJob(nextIndex);
  };

  const handlePrev = () => {
    const len = aiRecommendedJobs.length;
    if (!len) return;
    const prevIndex = (activeIndex - 1 + len) % len;
    selectJob(prevIndex);
  };

  return (
    <SeekerLayout>
      <div className="space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 italic drop-shadow-sm">Open Positions</h1>
            <p className="text-on-surface-variant text-sm max-w-lg font-medium opacity-70">
              Join Kuantum in building the next generation of precision-engineered talent solutions.
            </p>
            {loadError && (
              <p className="mt-2 text-sm font-bold text-error">{loadError}</p>
            )}
            {loading && !loadError && (
              <p className="mt-2 text-sm font-bold text-on-surface-variant">Loading openings…</p>
            )}
          </div>
          <div className="flex items-center bg-surface-container-low border border-outline-variant/15 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all hover:bg-surface-container-high cursor-pointer">
            <span className="text-on-surface-variant mr-3 uppercase tracking-widest text-[10px] font-black opacity-60">Sort by:</span>
            <select className="border-none bg-transparent p-0 focus:ring-0 font-black text-on-surface text-sm cursor-pointer uppercase tracking-tighter">
              <option>Newest First</option>
              <option>Salary Range</option>
              <option>Match Score</option>
            </select>
          </div>
        </header>

        {/* AI Recommended Interactive Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h2 className="text-xl font-black text-on-surface tracking-tight italic">AI-Curated For You</h2>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-all active:scale-90 group shadow-sm"
              >
                <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-all active:scale-90 group shadow-sm"
              >
                <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform">chevron_right</span>
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="no-scrollbar flex gap-8 overflow-x-auto pb-12 snap-x px-[10%] xl:px-[20%]"
          >
            {!loading && aiRecommendedJobs.length === 0 && !loadError && (
              <p className="text-sm font-bold text-on-surface-variant px-4">No open roles yet. Recruiters can post jobs from the HR app.</p>
            )}
            {aiRecommendedJobs.map((job, idx) => (
              <div 
                key={job.id} 
                ref={el => cardRefs.current[idx] = el}
                onClick={() => selectJob(idx)}
                className={`snap-center shrink-0 w-[400px] min-h-[460px] rounded-[3rem] p-10 flex flex-col justify-between transition-all duration-700 cursor-pointer relative overflow-hidden active:scale-95 group-selection
                  ${activeIndex === idx 
                    ? `bg-gradient-to-br ${job.color} text-white shadow-[0_45px_100px_-20px_rgba(37,99,235,0.4)] scale-105 z-20` 
                    : 'bg-surface-container-lowest text-on-surface shadow-xl border border-outline-variant/10 opacity-40 scale-90 hover:opacity-100 hover:scale-[0.95] z-10'
                  }`}
              >
                {/* Background Art */}
                <div className={`absolute top-0 right-0 p-12 transition-transform duration-[2000ms] pointer-events-none 
                  ${activeIndex === idx ? 'opacity-20 scale-110 rotate-12' : 'opacity-0 scale-50'}`}
                >
                  <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>{job.icon}</span>
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                       <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] backdrop-blur-md mb-4 inline-block shadow-lg
                        ${activeIndex === idx ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                        {idx === 0 ? 'Open role' : `Opening ${idx + 1}`}
                      </span>
                      <h3 className={`text-3xl font-black leading-tight tracking-tight uppercase italic ${activeIndex === idx ? 'text-white' : 'text-on-surface'}`}>
                        {job.title}
                      </h3>
                      <p className={`text-base font-bold tracking-tight ${activeIndex === idx ? 'text-primary-fixed opacity-90' : 'text-primary'}`}>
                        {job.company}
                      </p>
                    </div>
                    
                    <div
                      className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center border-2 ${
                        activeIndex === idx ? 'border-white/40 bg-white/10 text-white' : 'border-outline-variant/20 bg-surface-container-low text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-3xl mb-1">work</span>
                      <span className={`text-[8px] font-black uppercase tracking-widest opacity-80 text-center px-1 leading-tight`}>
                        {job.department}
                      </span>
                    </div>
                  </div>

                  <div className={`backdrop-blur-xl border rounded-[2rem] p-8 transition-all duration-700
                    ${activeIndex === idx ? 'bg-white/10 border-white/10 translate-y-0' : 'bg-primary-container/[0.03] border-primary/5 translate-y-4 opacity-0'}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                       <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Merit Reason</span>
                    </div>
                    <p className="text-sm leading-relaxed font-bold italic opacity-95 tracking-tight uppercase text-shadow">
                      "{job.matchReason}"
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 relative z-10 transition-all duration-700
                  ${activeIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                  <button 
                    onClick={() => navigate(`/seeker/job/${job.id}`)}
                    className={`flex-1 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] border transition-all active:scale-95
                    ${activeIndex === idx ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'hidden'}`}>
                    Details
                  </button>
                  <button 
                    onClick={() => navigate(`/seeker/apply/${job.id}`)}
                    className={`flex-1 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95
                    ${activeIndex === idx ? 'bg-white text-primary hover:scale-[1.03] shadow-white/10' : 'hidden'}`}>
                    Launch Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic AI Insight Banner (Synchronized with Carousel) */}
        <div 
          className="relative overflow-hidden bg-tertiary-fixed rounded-[4rem] p-12 shadow-2xl shadow-tertiary/20 border border-tertiary-fixed-dim/20 transition-all duration-700 group"
          key={aiRecommendedJobs.length ? activeIndex : 'empty'} // Force re-render for animation
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-[2000ms]">
            <span className="material-symbols-outlined text-[160px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-inner border border-white/30 rotate-3 group-hover:rotate-0 transition-transform duration-[1000ms]">
              <span className="material-symbols-outlined text-6xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="text-center lg:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <span className="bg-tertiary-container text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.4em] shadow-2xl shadow-tertiary/30">AI Insight Match</span>
                <h4 className="font-black text-on-tertiary-fixed text-4xl italic tracking-tighter uppercase leading-none">
                  {aiRecommendedJobs[activeIndex]?.insightLabel ?? 'No roles loaded'}
                </h4>
              </div>
              <p className="text-on-tertiary-fixed-variant text-lg leading-relaxed max-w-4xl font-black opacity-80 tracking-tighter uppercase italic text-shadow">
                {aiRecommendedJobs[activeIndex]?.insightText ?? 'Check back once jobs are published.'}
              </p>
            </div>
            <div className="lg:ml-auto">
               <button 
                type="button"
                disabled={!aiRecommendedJobs[activeIndex]}
                onClick={() => aiRecommendedJobs[activeIndex] && navigate(`/seeker/apply/${aiRecommendedJobs[activeIndex].id}`)}
                className="bg-on-surface text-surface px-12 py-6 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all whitespace-nowrap disabled:opacity-40"
              >
                Fast-Track Prep
              </button>
            </div>
          </div>
        </div>

        {/* Global Recent Opportunities List */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-on-surface tracking-tight italic uppercase tracking-widest">Recent Opportunities</h2>
            <div className="h-0.5 flex-1 bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
          </div>
          
          <div className="grid gap-6">
            {!loading && recentJobs.length === 0 && !loadError && (
              <p className="text-sm font-bold text-on-surface-variant px-2">No listings to show.</p>
            )}
            {recentJobs.map((job) => (
              <div key={job.id} className="group bg-surface-container-lowest p-12 rounded-[3.5rem] transition-all hover:bg-surface-bright flex flex-col xl:flex-row xl:items-center justify-between gap-10 border border-outline-variant/10 shadow-sm hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.06)] relative overflow-hidden active:scale-[0.99]">
                <div className="flex items-start gap-10">
                  <div className={`w-24 h-24 rounded-[2rem] ${job.logo ? 'bg-surface-container' : 'bg-primary/5'} flex items-center justify-center shrink-0 border border-outline-variant/10 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    {job.logo ? (
                      <img src={job.logo} alt={job.title} className="w-14 h-14 object-contain" />
                    ) : (
                      <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>{job.icon}</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-on-surface group-hover:text-primary transition-colors tracking-tighter italic uppercase">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                      <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-sm">{job.location}</span>
                      <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-sm">{job.type}</span>
                      {job.hot && (
                        <span className="bg-primary text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-2xl shadow-primary/20 animate-pulse">Hot Opportunity</span>
                      )}
                      <span className="text-on-surface-variant text-base flex items-center gap-2 font-black italic opacity-60 ml-3 uppercase tracking-tighter">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                        {job.salary}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-lg max-w-3xl leading-relaxed font-bold opacity-60 tracking-tight uppercase italic">
                      {job.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => navigate(`/seeker/job/${job.id}`)}
                    className="px-10 py-5 text-xs font-black text-on-surface-variant hover:text-primary transition-all uppercase tracking-[0.2em] hover:scale-105 active:scale-95"
                  >
                    Role Specs
                  </button>
                  <button 
                    onClick={() => navigate(`/seeker/apply/${job.id}`)}
                    className="bg-on-surface text-surface px-12 py-6 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SeekerLayout>
  );
};

export default JobMarketplace;
