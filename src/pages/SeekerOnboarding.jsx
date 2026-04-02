import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';

const SeekerOnboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* AI Match Insight Header */}
            <section className="bg-tertiary-fixed rounded-[2rem] p-8 shadow-xl border border-tertiary-container/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl shadow-inner">
                  <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div>
                  <h3 className="text-on-tertiary-fixed font-black text-xl mb-2">AI-Extracted Profile Details</h3>
                  <p className="text-on-tertiary-fixed-variant text-base mt-1 max-w-2xl opacity-90 leading-relaxed font-medium">
                    Our curator has analyzed your CV. We've identified you as a <span className="font-black underline decoration-2 underline-offset-4 decoration-tertiary/30">Senior Sales Strategist</span>. Please verify and refine your details for perfect matching.
                  </p>
                </div>
              </div>
            </section>

            {/* Form Section */}
            <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 lg:p-12 shadow-2xl shadow-black/5 border border-outline-variant/10">
              <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase ml-2">Full Name</label>
                    <input className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-5 focus:ring-4 focus:ring-primary/10 transition-all text-on-surface font-bold text-lg" type="text" defaultValue="Alex Rivers"/>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase ml-2">Current Role</label>
                    <input className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-5 focus:ring-4 focus:ring-primary/10 transition-all text-on-surface font-bold text-lg" type="text" defaultValue="Senior Sales Strategist"/>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase ml-2">Professional Summary</label>
                  <textarea className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-5 focus:ring-4 focus:ring-primary/10 transition-all text-on-surface leading-relaxed font-medium text-lg" rows="4" defaultValue="Dynamic Sales Leader with over 10 years of experience in driving revenue growth and market expansion. Expert in B2B SaaS environments with a proven track record of increasing enterprise retention by 45%." />
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-end border-b border-outline-variant/10 pb-6 mx-2">
                    <label className="block text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase">Top Experiences</label>
                    <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest" type="button">Add Experience</button>
                  </div>
                  <div className="space-y-6">
                    <div className="group bg-surface-container-low hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all p-8 rounded-3xl flex flex-col md:flex-row gap-8 border border-transparent hover:border-outline-variant/10">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl text-primary">business</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h4 className="font-black text-xl text-on-surface">Head of Sales Operations</h4>
                          <span className="text-[10px] font-black text-on-surface-variant bg-white/50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-outline-variant/10">2020 — Present</span>
                        </div>
                        <p className="text-primary font-black text-sm mb-4 uppercase tracking-widest">Global Tech Solutions Inc.</p>
                        <p className="text-on-surface-variant text-base leading-relaxed font-medium opacity-80">Scaled regional sales operations by 140% within the first two years. Implemented AI-driven CRM workflows reducing manual entry by 40%.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-outline-variant/10">
                  <button className="flex items-center gap-3 text-on-surface-variant font-black uppercase tracking-widest text-[10px] hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back to CV Upload
                  </button>
                  <button className="w-full sm:w-auto px-12 py-5 signature-gradient text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm" type="submit">
                    Continue to Preferences
                  </button>
                </div>
              </form>
            </section>
          </div>
        );
      case 2:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="mb-12">
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-3 leading-tight">Refine Your Career Path</h1>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium opacity-70">
                Help us match you with opportunities that align with your lifestyle and goals, <span className="font-black text-on-surface">Alex Rivers</span>.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-surface-container-low p-10 rounded-[2rem] border border-outline-variant/10">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase mb-8">Preferred Role Type</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Full-time', icon: 'rocket_launch', desc: 'Permanent commitment' },
                    { label: 'Contract', icon: 'history_edu', desc: 'Project-based work' }
                  ].map((roleType, i) => (
                    <label key={i} className="group flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl cursor-pointer transition-all hover:ring-4 hover:ring-primary/10 border border-transparent hover:border-primary/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">{roleType.icon}</span>
                        </div>
                        <div>
                          <p className="font-black text-on-surface">{roleType.label}</p>
                          <p className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">{roleType.desc}</p>
                        </div>
                      </div>
                      <input defaultChecked={i === 0} className="text-primary focus:ring-primary h-6 w-6 border-outline-variant/30 rounded-full" name="role_type" type="radio"/>
                    </label>
                  ))}
                </div>
              </section>

              <section className="bg-surface-container-low p-10 rounded-[2rem] border border-outline-variant/10">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase mb-8">Location Preference</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Remote', icon: 'home_work', desc: 'Work from anywhere' },
                    { label: 'Hybrid', icon: 'domain', desc: 'Mix of office & home' }
                  ].map((loc, i) => (
                    <label key={i} className="group flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl cursor-pointer transition-all hover:ring-4 hover:ring-primary/10 border border-transparent hover:border-primary/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">{loc.icon}</span>
                        </div>
                        <div>
                          <p className="font-black text-on-surface">{loc.label}</p>
                          <p className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">{loc.desc}</p>
                        </div>
                      </div>
                      <input defaultChecked={i === 0} className="text-primary focus:ring-primary h-6 w-6 border-outline-variant/30 rounded-full" name="location" type="radio"/>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <section className="bg-surface-container-lowest border border-outline-variant/10 p-10 rounded-[2.5rem] shadow-xl shadow-black/5 flex items-center justify-between">
              <div className="flex gap-6">
                <div className="h-16 w-16 rounded-3xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-lg shadow-tertiary/10">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-on-surface tracking-tight mb-2">Open to new opportunities</h3>
                  <p className="text-base text-on-surface-variant font-medium opacity-70">Allow recruiters to identify you for precision-matched roles.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer group">
                <input defaultChecked className="sr-only peer" type="checkbox"/>
                <div className="w-16 h-8 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
              </label>
            </section>

            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-12">
              <button onClick={prevStep} className="px-10 py-4 rounded-2xl text-on-surface-variant font-black uppercase tracking-widest text-xs hover:bg-surface-container-low transition-all">
                Back
              </button>
              <button onClick={nextStep} className="signature-gradient px-12 py-5 rounded-2xl text-white font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 uppercase tracking-widest text-sm">
                Complete Profile
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="mt-12 relative p-12 bg-surface-container-lowest rounded-[3rem] shadow-2xl shadow-on-surface/5 border border-outline-variant/10 overflow-hidden animate-in zoom-in fade-in duration-700">
            <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[12rem]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-secondary-container rounded-full mb-10 border border-secondary-container/20">
                <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-on-secondary-container">Application Finalized</span>
              </div>
              <h2 className="text-5xl font-black text-on-surface mb-6 tracking-tight leading-tight">Profile Complete!</h2>
              <p className="text-xl text-on-surface-variant mb-12 leading-relaxed font-medium opacity-80">
                Your professional curator profile is now visible to top employers. We've already identified <span className="text-primary font-black underline underline-offset-8 decoration-4 decoration-primary/20">14 opportunities</span> that match your surgical criteria.
              </p>
              <div className="flex flex-wrap gap-6 mb-16">
                <button 
                  onClick={() => navigate('/seeker/dashboard')}
                  className="signature-gradient px-10 py-5 rounded-2xl text-white font-black shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-widest text-sm"
                >
                  Go to Dashboard
                </button>
                <button className="px-10 py-5 rounded-2xl bg-surface-container-low text-on-surface font-black hover:bg-surface-container-high transition-all uppercase tracking-widest text-xs">
                  View Public Profile
                </button>
              </div>

              <div className="pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img 
                      key={i} 
                      alt="Recruiter" 
                      className="inline-block h-12 w-12 rounded-full ring-4 ring-white shadow-lg" 
                      src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                    />
                  ))}
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-surface-container-high ring-4 ring-white text-[10px] font-black text-on-surface-variant shadow-lg">+50</div>
                </div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-relaxed opacity-60 text-center md:text-left">
                  Top hiring managers from <span className="text-on-surface opacity-100 underline decoration-primary/40 font-black">Google, Stripe, and Linear</span> are now viewing matching profiles.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto">
        <aside className="mb-12 flex justify-center">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 transition-all duration-500 rounded-full ${step === i ? 'w-12 bg-primary' : 'w-4 bg-outline-variant/30'}`}
              />
            ))}
          </div>
        </aside>
        {renderStep()}
      </div>
    </SeekerLayout>
  );
};

export default SeekerOnboarding;
