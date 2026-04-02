import React from 'react';
import SeekerLayout from '../components/SeekerLayout';

const SeekerInterviewResult = () => {
  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto">
        {/* Top Navigation Anchor / Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-1">Sales Manager</h2>
            <div className="flex items-center space-x-2">
              <span className="text-primary font-bold">Kuantum</span>
              <span className="text-on-surface-variant">•</span>
              <span className="text-on-surface-variant">Your Interview Feedback Report</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-slate-200/50 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">search</span>
              </button>
              <button className="p-2 rounded-full hover:bg-slate-200/50 transition-colors relative">
                <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full"></span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-outline-variant/30"></div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
                <img 
                  alt="Andi Pratama" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwcHnfmPQ90Kg10ElyCe0zBiW3GLtAJ4lGvXa9lnasOmSWyKc0JG-mHZUrB8wnCRqECfGdX_SurEAK2F6d7-U9GsX3DrPQEwf8uxZ_pyXJGGCSdpJdvsD8VW1WGZXBNpDXvSkr9DdELAjpVpaJfHRt7S9GF4Q4fOQSR8M6qW_3qaOhpUHZV5cXJJnunKdtVTK1Zg_JyuDDJyT9GET2EOG_wFjgoQhWSm7zuHLV7CcFQo7uavxPRGYr95mCwf7jb2IHnWT80Ml2Cpz4"
                />
              </div>
              <span className="text-sm font-bold text-on-surface">Andi Pratama</span>
            </div>
          </div>
        </header>

        {/* Status Banner */}
        <section className="mb-12">
          <div className="bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-primary tracking-tight">CONGRATULATIONS! YOUR APPLICATION IS APPROVED</h3>
                <p className="text-sm text-on-surface-variant font-medium max-w-lg">You've moved to the final round. Review your personalized feedback to prepare for the leadership interview.</p>
              </div>
            </div>
            <button className="whitespace-nowrap px-8 py-3.5 bg-white border border-outline-variant text-on-surface rounded-xl font-bold text-sm hover:bg-surface-container-low transition-all active:scale-95">
              Download Report
            </button>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Column 1: Match Score & Feedback */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            {/* Match Score Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-surface-variant/50">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">AI Profile Match</h4>
                <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
              </div>
              <div className="flex items-end space-x-4">
                <span className="text-8xl font-black text-primary tracking-tighter leading-none">94<span className="text-3xl font-bold ml-1">%</span></span>
                <div className="pb-3">
                  <div className="flex items-center text-tertiary font-black text-xs uppercase tracking-widest mb-1">
                    <span className="material-symbols-outlined text-sm mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                    Strong Role Fit
                  </div>
                  <p className="text-[11px] text-on-surface-variant font-medium opacity-70">Highly aligned with Kuantum's needs</p>
                </div>
              </div>
              <div className="mt-10 h-4 w-full bg-surface-container rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-surface-variant/50">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-10">Interview Performance</h4>
              <div className="space-y-8">
                {[
                  { label: 'Communication', score: 8, total: 10 },
                  { label: 'Domain Expertise', score: 7, total: 10 },
                  { label: 'Strategic Thinking', score: 6, total: 10 },
                  { label: 'Values Alignment', score: 8, total: 10 }
                ].map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-wider">
                      <span className="text-on-surface opacity-70">{skill.label}</span>
                      <span className="text-primary">{skill.score}/{skill.total}</span>
                    </div>
                    <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(skill.score / skill.total) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-[10px] text-on-surface-variant font-medium italic leading-relaxed opacity-60">
                Feedback is based on your initial screening and technical assessment with the curator agent.
              </p>
            </div>
          </div>

          {/* Column 2: Insights & Action */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            {/* Match Insight Card */}
            <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-3xl p-10 relative overflow-hidden shadow-lg shadow-tertiary/5">
              <div className="absolute top-0 right-0 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Why You're a Great Fit</h4>
              </div>
              <p className="text-xl font-bold leading-relaxed tracking-tight">
                Andi, your background in scaling B2B SaaS teams across Southeast Asia is a perfect match for Kuantum's regional expansion strategy. Our AI assessment highlights your rare blend of aggressive sales leadership and empathetic management. Your structured pipeline methodology directly addresses our current operational requirements.
              </p>
            </div>

            {/* Feedback Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Key Strengths */}
              <div className="bg-surface-container-low rounded-3xl p-8 border border-surface-variant/30">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Your Strengths</h4>
                <ul className="space-y-5">
                  {[
                    'Expertise in regional SaaS market dynamics.',
                    'Articulate and highly persuasive communication style.',
                    'Proven history of maintaining low churn in managed accounts.'
                  ].map((strength, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      <span className="text-sm font-bold text-on-surface leading-snug">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Growth */}
              <div className="bg-surface-container-low rounded-3xl p-8 border border-surface-variant/30">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-tertiary mb-6">Focus Areas</h4>
                <ul className="space-y-5">
                  {[
                    'Prepare to discuss data-driven forecasting in the final round.',
                    'Consider how you might leverage automation for prospecting.'
                  ].map((focus, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                      <span className="text-sm font-bold text-on-surface leading-snug">{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps Detailed */}
            <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-primary/20 relative">
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Your Next Step</h4>
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-[0.1em]">Action Required</span>
              </div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between p-8 bg-surface rounded-2xl border border-surface-variant shadow-inner">
                <div className="flex items-center space-x-6 mb-6 xl:mb-0">
                  <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                    <span className="material-symbols-outlined text-3xl">event_available</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-black text-on-surface mb-1">Final Leadership Interview</h5>
                    <p className="text-sm text-on-surface-variant font-medium">Meeting with Sarah Chen <span className="opacity-60">(VP of Sales)</span></p>
                    <div className="mt-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 inline-flex p-1 rounded">Recommended for: Tuesday, Oct 24th</div>
                  </div>
                </div>
                <button className="whitespace-nowrap px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Pick a Timeslot
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex-1 p-5 bg-surface-container-low rounded-2xl border border-surface-variant/30 flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant opacity-40">tips_and_updates</span>
                  <div>
                    <p className="text-[10px] uppercase font-black text-on-surface-variant mb-1 opacity-50">Preparation Tip</p>
                    <p className="text-xs font-bold text-on-surface leading-relaxed">Review the "Focus Areas" above. Sarah likes to deep-dive into CRM hygiene and forecasting models.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <footer className="mt-20 pt-10 border-t border-surface-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em]">
          <div className="flex items-center space-x-6 opacity-60">
            <span>Ref: #QK-9928-SALES</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-surface-variant rounded-full"></span>
            <span>Personal Assessment Report</span>
          </div>
          <div className="flex items-center space-x-2 opacity-100 text-primary">
            <span className="material-symbols-outlined text-base">shield</span>
            <span className="opacity-80">Your data is protected and private</span>
          </div>
        </footer>
      </div>
    </SeekerLayout>
  );
};

export default SeekerInterviewResult;
