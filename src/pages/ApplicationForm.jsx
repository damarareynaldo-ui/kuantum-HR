import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/seeker/dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <SeekerLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 signature-gradient rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-primary/40">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-on-surface">Application Transmitted</h1>
            <p className="text-lg text-on-surface-variant font-medium opacity-70 max-w-md mx-auto">
              Your profile has been surgically matched and sent to Kuantum's editorial hiring team.
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
            Redirecting to Dashboard...
          </div>
        </div>
      </SeekerLayout>
    );
  }

  return (
    <SeekerLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-on-surface mb-3 leading-tight">Sales Manager at Kuantum</h1>
          <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-xs opacity-60">Step 3 of 3: Final Review & Submission</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-16 relative">
          <div className="absolute top-[1.25rem] left-0 w-full h-1 bg-surface-container-high -z-10 rounded-full"></div>
          <div className="flex justify-between items-center">
            {[
              { label: 'CONTACT', completed: true },
              { label: 'RESUME', completed: true },
              { label: 'PREVIEW', current: true }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3 bg-surface px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step.completed ? 'signature-gradient text-white shadow-lg shadow-primary/20' : 
                  step.current ? 'bg-white text-primary ring-4 ring-primary-fixed ring-offset-4 ring-offset-surface' : 
                  'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {step.completed ? (
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  ) : (
                    <span className="text-sm font-black">{i + 1}</span>
                  )}
                </div>
                <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${step.current || step.completed ? 'text-primary' : 'text-on-surface-variant opacity-50'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Profile Summary Card */}
            <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-2xl shadow-black/5">
              <div className="flex items-start justify-between mb-10">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden shadow-xl ring-4 ring-surface-container-low">
                    <img 
                      alt="Candidate Portrait" 
                      className="w-full h-full object-cover" 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-on-surface tracking-tight mb-1">Alex Rivers</h2>
                    <p className="text-on-surface-variant font-bold text-base opacity-70">Senior Sales Strategist</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs font-bold text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">mail</span> alex.rivers@example.com
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl transition-all">Edit Info</button>
              </div>

              <div className="mb-10">
                <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant mb-4 px-1">Professional Experience</h3>
                <div className="bg-surface-container-low p-8 rounded-[1.8rem] border border-outline-variant/10">
                  <p className="text-sm leading-relaxed text-on-surface font-medium opacity-80">
                    Proven sales leader with over 8 years of experience in driving revenue growth across international SaaS markets. Expert in building high-performing teams and implementing data-driven GTM frameworks that increased enterprise retention by 45%. 
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black tracking-[0.25em] uppercase text-on-surface-variant mb-4 px-1">AI-Parsed Key Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Sales Management', color: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
                    { label: 'CRM / GTM', color: 'bg-secondary-fixed text-on-secondary-fixed-variant' },
                    { label: 'Team Leadership', color: 'bg-secondary-fixed text-on-secondary-fixed-variant' },
                    { label: 'Strategic Planning', color: 'bg-surface-container-high text-on-surface-variant' },
                    { label: 'Enterprise Sales', color: 'bg-surface-container-high text-on-surface-variant' }
                  ].map((skill, i) => (
                    <span key={i} className={`px-5 py-2 ${skill.color} text-[10px] font-black rounded-full border border-black/5 uppercase tracking-widest`}>
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insight Card */}
            <div className="bg-tertiary-fixed/30 p-8 rounded-[2rem] relative overflow-hidden border border-white/30">
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-tertiary flex-shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div>
                  <h4 className="font-black text-on-tertiary-fixed text-base mb-2 uppercase tracking-widest">Precision Match Insight</h4>
                  <p className="text-base text-on-tertiary-fixed-variant font-medium opacity-90 leading-relaxed">
                    Our AI curation system identifies a <span className="font-black underline decoration-2 underline-offset-4 decoration-tertiary/30">94% fit</span> for this role. Alex's background in B2B SaaS scaling directly addresses Kuantum's Q3 growth objectives for the Sales Manager position.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-2xl shadow-black/5">
              <h3 className="text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-6 px-1">Uploaded Assets</h3>
              <div className="group flex items-center gap-4 p-4 bg-surface-container-low rounded-[1.5rem] border border-outline-variant/10 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-black text-on-surface truncate">Alex_Rivers_CV.pdf</p>
                  <p className="text-[10px] font-bold text-on-surface-variant opacity-60">2.4 MB • Today</p>
                </div>
                <button className="text-on-surface-variant hover:text-error transition-colors p-2">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>

            <div className="p-8 bg-surface-container-highest/50 rounded-[2rem] border border-outline-variant/5">
              <p className="text-[10px] font-bold text-on-surface-variant leading-relaxed uppercase tracking-wider opacity-60">
                By clicking "Submit Application", you agree to our Terms of Service and Privacy Policy. Kuantum may contact you regarding this and similar opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleSubmit}
                className="w-full py-6 signature-gradient text-white rounded-[1.5rem] font-black text-lg shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                Submit Application
                <span className="material-symbols-outlined">send</span>
              </button>
              <button className="w-full py-6 bg-surface-container-low text-on-surface-variant rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-surface-container-high transition-all">
                Back to Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default ApplicationForm;
