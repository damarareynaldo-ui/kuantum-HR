import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';

const SeekerInterviewPreparation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const technicalSpecs = [
    { label: 'Stable fiber/broadband connection', icon: 'check_circle' },
    { label: 'Private, well-lit quiet environment', icon: 'check_circle' },
    { label: 'Functioning 1080p camera & microphone', icon: 'check_circle' }
  ];

  const interactions = [
    { label: 'Speak clearly at a conversational pace', icon: 'info' },
    { label: 'Take up to 30s to formulate answers', icon: 'info' },
    { label: 'Natural eye contact with the camera', icon: 'info' },
    { label: 'Complete the session at your own convenience', icon: 'schedule' }
  ];

  const preparationSteps = [
    { title: 'Experience', description: 'Prepare 3 STAR-method examples of exceeding quarterly revenue targets in a B2B environment.', color: 'primary' },
    { title: 'Strategy', description: 'Be ready to discuss your framework for coaching underperforming account executives.', color: 'primary' },
    { title: 'Knowledge', description: "Review Stark Global's latest annual report on SaaS expansion in the EMEA market.", color: 'primary' }
  ];

  return (
    <SeekerLayout>
      <main className="max-w-7xl mx-auto py-6">
        <div className="flex flex-col xl:flex-row gap-16">
          {/* Left Column: Editorial Content & Briefing */}
          <div className="flex-1 space-y-16">
            {/* Interview Overview */}
            <header className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-black tracking-[0.2em] uppercase shadow-sm">
                Active Preparation
              </div>
              <h1 className="text-6xl font-black tracking-tight text-on-surface leading-[1.1]">
                Sales Manager <br />
                <span className="text-on-surface-variant/40 font-light italic">Interview Briefing</span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-3xl leading-relaxed font-medium">
                Welcome to the precision preparation room. You are about to engage in a <span className="text-on-surface font-black underline decoration-4 decoration-primary/20 transition-all">self-paced AI-curated evaluation</span> for the Sales Manager position at Stark Global Solutions.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Technical Block */}
              <div className="p-10 rounded-[2.5rem] bg-surface-container-low space-y-6 border border-outline-variant/10 shadow-sm group hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 text-primary">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 700" }}>video_settings</span>
                  <h3 className="font-black tracking-tight text-xl italic uppercase tracking-widest">Technical Specs</h3>
                </div>
                <ul className="space-y-4">
                  {technicalSpecs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{spec.icon}</span>
                      <span className="text-base font-bold text-on-surface-variant/80 tracking-tight">{spec.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Interaction Block */}
              <div className="p-10 rounded-[2.5rem] bg-surface-container-low space-y-6 border border-outline-variant/10 shadow-sm group hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 text-tertiary">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 700" }}>psychology</span>
                  <h3 className="font-black tracking-tight text-xl italic uppercase tracking-widest">AI Protocol</h3>
                </div>
                <ul className="space-y-4">
                  {interactions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                      <span className="text-base font-bold text-on-surface-variant/80 tracking-tight">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to Prepare Section */}
            <div className="bg-surface-container-lowest p-12 rounded-[3rem] space-y-10 border border-outline-variant/10 shadow-2xl shadow-black/[0.02]">
              <h3 className="text-3xl font-black tracking-tight text-on-surface italic">Strategy & Readiness</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {preparationSteps.map((step, i) => (
                  <div key={i} className="space-y-4 p-2 rounded-2xl hover:bg-surface-container-low transition-colors duration-300">
                    <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase block">{step.title}</span>
                    <p className="text-base leading-relaxed text-on-surface-variant font-medium opacity-80">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: System Check & CTA */}
          <div className="xl:w-[400px] flex flex-col gap-8">
            {/* System Check Card */}
            <div className="bg-surface-container-low rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-sm">
              <div className="aspect-video relative bg-slate-900 overflow-hidden group">
                <img 
                  className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[2000ms]" 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                  alt="Candidate Camera Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-3xl flex items-center gap-3 border border-white/20 shadow-2xl">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20"></span>
                    <span className="text-xs font-black text-white uppercase tracking-[0.2em]">System Optimal</span>
                  </div>
                </div>
              </div>
              <div className="p-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-emerald-600 font-bold">videocam</span>
                    <span className="text-sm font-black text-on-surface tracking-tight uppercase">Optical Lens</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">Crystal</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-emerald-600 font-bold">mic_none</span>
                    <span className="text-sm font-black text-on-surface tracking-tight uppercase">Audio Input</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary font-bold">cell_tower</span>
                    <span className="text-sm font-black text-on-surface tracking-tight uppercase">Signal</span>
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">24ms (Tier 1)</span>
                </div>
              </div>
            </div>

            {/* AI Context Card */}
            <div className="bg-tertiary-fixed p-10 rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-tertiary/20">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-on-tertiary-fixed-variant">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contextual Match Score: 98%</span>
                </div>
                <p className="text-base font-black leading-snug text-on-tertiary-fixed italic">
                  "Your leadership profile shows exceptional alignment. Focus on Vertical SaaS scaling during the strategy phase."
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              </div>
            </div>

            {/* Primary Action Zone */}
            <div className="space-y-4 pt-6">
              <button className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                Begin Session
                <span className="material-symbols-outlined text-base">rocket_launch</span>
              </button>
              <button 
                onClick={() => navigate('/seeker/schedule')}
                className="w-full bg-surface-container-low text-on-surface-variant/70 border border-outline-variant/10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-surface-variant transition-all active:scale-95 shadow-sm"
              >
                Back to Schedule
              </button>
              <div className="text-center space-y-1">
                <p className="text-[9px] text-on-surface-variant/40 uppercase font-black tracking-widest">Approx. 45 Minute Evaluation</p>
                <p className="text-[9px] text-primary/40 uppercase font-black tracking-widest">Authorization expires in 72 hours</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SeekerLayout>
  );
};

export default SeekerInterviewPreparation;
