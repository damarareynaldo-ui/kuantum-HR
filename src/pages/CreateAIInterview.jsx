import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const CreateAIInterview = () => {
  const location = useLocation();
  const jobTitle = location.state?.jobTitle || 'Staff Engineer';

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Orchestration Phase II</span>
              <div className="h-px w-12 bg-primary/20"></div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-on-surface leading-none">Configure Interview Agent</h1>
            <p className="text-on-surface-variant mt-2 font-medium opacity-70">
              Define how the AI agent interacts with candidates for the <span className="text-primary font-bold">{jobTitle}</span> role.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/interviews" className="px-8 py-4 bg-surface-container-low text-on-surface font-black rounded-2xl hover:bg-surface-dim transition-all text-sm uppercase tracking-widest active:scale-95">
              Back to Setup
            </Link>
            <button className="px-8 py-4 signature-gradient text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center gap-2">
              Activate Agent
              <span className="material-symbols-outlined text-lg">bolt</span>
            </button>
          </div>
        </header>

        {/* Configuration Grid */}
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-8 space-y-10">
            {/* Agent Identity */}
            <section className="bg-surface-container-lowest p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <h2 className="text-xl font-black text-on-surface tracking-tight uppercase tracking-widest text-[14px]">Agent Identity</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Agent Name</label>
                  <input 
                    type="text" 
                    defaultValue="Technical Advisor (Rigorous)"
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all text-on-surface"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Voice Profile</label>
                  <select className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer">
                    <option>AURA-1 (Formal & Authoritative)</option>
                    <option>ECO-4 (Friendly & Peer-like)</option>
                    <option>NEO-2 (High-energy & Dynamic)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* System Instructions */}
            <section className="bg-surface-container-lowest p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-2xl">terminal</span>
                </div>
                <h2 className="text-xl font-black text-on-surface tracking-tight uppercase tracking-widest text-[14px]">System Instructions</h2>
              </div>

              <div className="space-y-6">
                <textarea 
                  rows="10"
                  className="w-full bg-surface-container-low border-none rounded-[2rem] p-8 text-sm font-medium text-on-surface leading-relaxed focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                  placeholder="Define behavioral guardrails and specialized probing logic..."
                  defaultValue={`The agent is optimized to detect "Staff+ signal" by analyzing decision-making frameworks. 

Primary Directive:
1. Automatically prioritize candidates who discuss tradeoffs rather than just solutions.
2. Probe specifically on system-level impact of architectural choices.
3. Maintain a professional yet inquisitive standard, mimicking a late-stage technical review.`}
                />
                
                <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                  <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">AI has optimized these instructions based on the current job requirement.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-10">
            {/* Supporting Data */}
            <section className="bg-surface-container-low p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm">
              <h2 className="text-[12px] font-black text-on-surface uppercase tracking-[0.25em] mb-8">Supporting Data</h2>
              
              <div className="space-y-6">
                <div className="border-2 border-dashed border-outline-variant/30 rounded-[2rem] p-10 text-center space-y-4 hover:border-primary/40 hover:bg-white/50 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-on-surface-variant mx-auto shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">attach_file</span>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-black text-on-surface uppercase tracking-widest">Upload Role Docs</h4>
                    <p className="text-[10px] font-bold text-on-surface-variant opacity-60 mt-1">PDF, DOCX up to 10MB</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Context URL</label>
                  <input 
                    type="url" 
                    placeholder="Engineering blog, project spec..."
                    className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                  />
                </div>
              </div>
            </section>

            {/* Match Context Card */}
            <div className="bg-tertiary-fixed p-10 rounded-[2.8rem] relative overflow-hidden group shadow-2xl shadow-tertiary/5">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 blur-3xl rounded-full group-hover:scale-150 transition-all duration-700"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary text-2xl">auto_awesome</span>
                <span className="text-[12px] font-black uppercase tracking-widest text-on-tertiary-fixed">Match Architect</span>
              </div>
              
              <h3 className="text-2xl font-black text-on-tertiary-fixed leading-tight mb-4">Optimized Probing Logic</h3>
              <p className="text-on-tertiary-fixed-variant leading-relaxed font-medium text-[13px]">
                This agent will automatically prioritize candidates who discuss <span className="font-black underline decoration-2 underline-offset-4 decoration-tertiary">tradeoffs</span> rather than just solutions, specifically for technical leadership patterns.
              </p>
              
              <div className="mt-8 pt-8 border-t border-on-tertiary-fixed/10">
                <p className="text-[10px] font-black text-on-tertiary-fixed opacity-60 uppercase tracking-widest">Activation Window</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-black text-on-tertiary-fixed">14 Days</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/40 px-3 py-1 rounded-full text-on-tertiary-fixed">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Standard Lead
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAIInterview;
