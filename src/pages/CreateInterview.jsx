import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const CreateInterview = () => {
  const location = useLocation();
  const preSelectedJob = location.state?.jobTitle;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header section */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-on-surface-variant text-[10px] font-black tracking-[0.3em] uppercase">Phase I: Parameters</p>
            <h3 className="text-4xl font-black tracking-tight text-on-surface leading-none">Interview Setup</h3>
          </div>
          <div className="flex gap-4">
            <Link to="/interviews" className="px-6 py-3 rounded-2xl text-sm font-bold bg-surface-container-low text-on-surface hover:bg-surface-variant transition-colors active:scale-95">
              Cancel
            </Link>
            <Link 
              to="/interviews/agent" 
              state={{ jobTitle: preSelectedJob || 'Staff Engineer' }}
              className="px-8 py-3 rounded-2xl text-sm font-black text-white signature-gradient shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2 active:scale-95 uppercase tracking-widest"
            >
              <span>Next: Configure Agent</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8 font-sans">
          <div className="col-span-8 space-y-8">
            {/* Step 1: Selection */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">work_outline</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-on-surface mb-1">Select Job Requisition</h4>
                  <p className="text-sm text-on-surface-variant font-medium">Choose the position for this automated screening</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Sales Manager at Kuantum', dept: 'Sales & Growth' },
                  { title: 'Senior Software Engineer (AI)', dept: 'Engineering' },
                  { title: 'Product Designer', dept: 'Creative' },
                  { title: 'Staff Engineer', dept: 'Engineering' },
                ].map((job, idx) => {
                  const isActive = preSelectedJob ? job.title === preSelectedJob : job.title === 'Staff Engineer';
                  return (
                    <div 
                      key={idx}
                      className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer flex flex-col justify-between h-40 group ${
                        isActive 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' 
                        : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className={`text-[10px] uppercase font-black tracking-widest ${isActive ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>{job.dept}</p>
                          <h5 className="font-bold text-on-surface">{job.title}</h5>
                        </div>
                        {isActive && <span className="material-symbols-outlined text-primary scale-110">check_circle</span>}
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary transition-colors'}`}>
                        <span>View Requirements</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Parameters */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
               
               <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">settings_input_component</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-on-surface mb-1">Interview Parameters</h4>
                  <p className="text-sm text-on-surface-variant font-medium">Fine-tune the AI interviewer behavior</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Interview Length</label>
                    <select className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all">
                      <option>15 Minutes (Snapshot)</option>
                      <option>30 Minutes (Standard)</option>
                      <option>45 Minutes (Deep Dive)</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">AI Agent Persona</label>
                    <div className="relative group">
                      <select className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
                        <option>Technical Advisor (Rigorous)</option>
                        <option>Peer Engineer (Collaborative)</option>
                        <option>Product Leader (Visionary)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                    </div>
                  </div>
                </div>

                {/* Agent Personality Traits */}
                <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">psychology_alt</span>
                      <span className="text-xs font-black uppercase tracking-widest text-on-surface">Agent Identity Configuration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-on-surface-variant opacity-60">Voice:</span>
                      <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-primary focus:ring-0">
                        <option>AURA-1 (Formal)</option>
                        <option>ECO-4 (Friendly)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                        <span>Empathy</span>
                        <span>Directness</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container rounded-full relative group">
                        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md cursor-pointer border-2 border-white group-hover:scale-110 transition-transform"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                        <span>Supportive</span>
                        <span>Skeptical</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container rounded-full relative group">
                        <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md cursor-pointer border-2 border-white group-hover:scale-110 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Focus Areas</label>
                  <div className="flex flex-wrap gap-2">
                    {['System Design', 'Code Quality', 'Leadership', 'Emotional Intelligence', 'Problem Solving'].map(tag => (
                      <button key={tag} className="px-4 py-2 bg-surface-container-low hover:bg-primary/10 hover:text-primary rounded-xl text-xs font-bold transition-all border border-outline-variant/10">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                    <span className="text-xs font-black uppercase tracking-widest text-on-surface">AI Dynamic Probing</span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    When enabled, the interviewer will automatically generate follow-up questions based on the candidate's specific answers to explore depth and edge cases.
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-all"></div>
                    </div>
                    <span className="text-xs font-bold text-on-surface">Adaptive questioning active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-xl">preview</span>
                Question Preview
              </h4>
              <div className="space-y-4">
                {[
                  "Could you walk me through a complex architectural decision you made recently?",
                  "How do you handle disagreement with a senior stakeholder regarding technology trade-offs?",
                  "Describe a time you had to optimize a legacy system for scalability."
                ].map((q, i) => (
                  <div key={i} className="p-4 bg-surface-container-low rounded-2xl text-xs font-medium text-on-surface leading-relaxed border-l-4 border-primary">
                    {q}
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high text-[10px] font-black uppercase tracking-widest text-on-surface-variant transition-all">
                Regenerate Questions
              </button>
            </div>

            <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 blur-2xl rounded-full group-hover:scale-150 transition-all duration-700"></div>
              <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-4">Precision Match Engine</h4>
              <p className="text-lg font-extrabold leading-tight mb-6">Estimated assessment accuracy: 94.2%</p>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-80">
                  <span>Bias Mitigation</span>
                  <span>Active</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateInterview;
