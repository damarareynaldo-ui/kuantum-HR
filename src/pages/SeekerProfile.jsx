import React from 'react';
import SeekerLayout from '../components/SeekerLayout';

const SeekerProfile = () => {
  const profile = {
    name: 'Alex Rivers',
    role: 'Senior Sales Strategist',
    location: 'San Francisco / Remote',
    bio: 'Dynamic Sales Leader with over 10 years of experience in driving revenue growth and market expansion. Expert in B2B SaaS environments with a proven track record of increasing enterprise retention by 45%. Focused on building surgical GTM frameworks for high-growth AI startups.',
    skills: [
      { label: 'Sales Management', category: 'core' },
      { label: 'GTM Strategy', category: 'core' },
      { label: 'Enterprise SaaS', category: 'industry' },
      { label: 'CRM / Salesforce', category: 'tool' },
      { label: 'Team Leadership', category: 'leadership' },
      { label: 'Revenue Ops', category: 'core' }
    ],
    experience: [
      {
        company: 'Global Tech Solutions Inc.',
        role: 'Head of Sales Operations',
        period: '2020 — Present',
        description: 'Scaled regional sales operations by 140% within the first two years. Implemented AI-driven CRM workflows reducing manual entry by 40% and increasing data accuracy for executive forecasting.'
      },
      {
        company: 'CloudFront Dynamics',
        role: 'Senior Account Executive',
        period: '2016 — 2020',
        description: 'Consistently ranked top 5% of global sales force. Negotiated and closed enterprise contracts with Fortune 500 companies, maintaining a 115% quota attainment average.'
      }
    ]
  };

  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 ring-8 ring-surface-container-low transition-all group-hover:scale-105 duration-500">
              <img 
                alt="Profile" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl border border-outline-variant/10 cursor-pointer hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-xl">edit</span>
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-2 leading-none">{profile.name}</h1>
            <p className="text-xl font-bold text-primary mb-4 tracking-tight uppercase tracking-[0.1em]">{profile.role}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="flex items-center gap-2 text-on-surface-variant font-bold text-xs uppercase tracking-widest bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/5">
                <span className="material-symbols-outlined text-sm">location_on</span> {profile.location}
              </span>
              <span className="flex items-center gap-2 text-on-surface-variant font-bold text-xs uppercase tracking-widest bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/5">
                <span className="material-symbols-outlined text-sm">verified</span> Verified Professional
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="signature-gradient px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all">
              Download CV
            </button>
            <button className="px-8 py-4 rounded-2xl bg-surface-container-highest text-on-surface font-black text-xs uppercase tracking-[0.25em] hover:bg-surface-container transition-all">
              Share Profile
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Bio & Skills */}
          <div className="lg:col-span-8 space-y-10">
            <section className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-outline-variant/10">
              <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant mb-6 px-1">Professional Narrative</h3>
              <p className="text-xl text-on-surface leading-relaxed font-medium opacity-90">
                {profile.bio}
              </p>
            </section>

            <section className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-outline-variant/10">
              <div className="flex justify-between items-center mb-10 px-1">
                <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant">Core Expertise</h3>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">+ Add Skill</button>
              </div>
              <div className="flex flex-wrap gap-4">
                {profile.skills.map((skill, i) => (
                  <div key={i} className="group relative">
                    <div className="px-6 py-3 bg-surface-container-low rounded-2xl border border-outline-variant/10 group-hover:border-primary/30 transition-all cursor-default">
                      <p className="text-sm font-black text-on-surface tracking-tight">{skill.label}</p>
                      <p className="text-[9px] font-black text-on-surface-variant opacity-50 uppercase tracking-[0.2em] mt-1">{skill.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-outline-variant/10">
              <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant mb-10 px-1">Career Trajectory</h3>
              <div className="space-y-12">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary ring-4 ring-surface shadow-xl group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">{i === 0 ? 'business' : 'apartment'}</span>
                      </div>
                      {i < profile.experience.length - 1 && (
                        <div className="w-0.5 h-full bg-outline-variant/20 mt-4"></div>
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">{exp.role}</h4>
                          <p className="text-base font-bold text-primary uppercase tracking-widest text-xs mt-1">{exp.company}</p>
                        </div>
                        <span className="text-[10px] font-black text-on-surface-variant opacity-60 bg-surface-container-low px-4 py-2 rounded-full uppercase tracking-widest">{exp.period}</span>
                      </div>
                      <p className="text-on-surface-variant text-base leading-relaxed font-medium opacity-80 mt-4 max-w-2xl">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: AI Match & Verification */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-tertiary-fixed p-8 rounded-[2rem] relative overflow-hidden border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-tertiary">Match Profile Ready</span>
                </div>
                <div className="space-y-6">
                  <div className="p-4 bg-white/40 rounded-2xl border border-white/40">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-[10px] font-black uppercase text-tertiary tracking-widest">Market Alignment</p>
                      <p className="text-sm font-black text-on-tertiary-fixed">98%</p>
                    </div>
                    <div className="h-1.5 w-full bg-tertiary-container/10 rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <p className="text-on-tertiary-fixed-variant text-xs font-medium leading-relaxed opacity-90">
                    Your profile is surgically optimized for enterprise sales roles in Series B+ AI startups.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-2xl shadow-black/5 border border-outline-variant/10">
              <h3 className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase mb-6 px-1">Profile Visibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">visibility</span>
                    <span className="text-xs font-black uppercase tracking-widest text-on-surface">Public</span>
                  </div>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-on-surface-variant opacity-60 leading-relaxed px-1">
                  When enabled, your profile is indexed by the Precision Curator search engine and visible to vetted editorial recruiters.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-70 mb-4 px-1">Identity Verification</h4>
              <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl border border-white/40">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-black text-on-surface">ID Verified</p>
                  <p className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Via Kuantum Trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerProfile;
