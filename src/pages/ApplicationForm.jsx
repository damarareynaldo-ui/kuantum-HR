import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import { getSeekerProfile } from '../lib/seekerApi';

function initials(name, email) {
  const n = String(name || '').trim();
  if (n) {
    const p = n.split(/\s+/).filter(Boolean);
    if (p.length >= 2) return (p[0][0] + p[p.length - 1][0]).toUpperCase();
    return n.slice(0, 2).toUpperCase();
  }
  const e = String(email || '').trim();
  return e ? e.slice(0, 2).toUpperCase() : '?';
}

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getSeekerProfile();
        if (!cancelled) setProfile(me);
      } catch {
        if (!cancelled) setProfile(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/seeker/dashboard');
    }, 2000);
  };

  const displayName = profile?.name || profile?.email || 'Applicant';
  const displayEmail = profile?.email || '';

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
              Your application has been recorded. Redirecting to your dashboard.
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
          <h1 className="text-4xl font-black tracking-tight text-on-surface mb-3 leading-tight">Application preview</h1>
          <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-xs opacity-60">Step 3 of 3: Final Review & Submission</p>
        </div>

        <div className="mb-16 relative">
          <div className="absolute top-[1.25rem] left-0 w-full h-1 bg-surface-container-high -z-10 rounded-full"></div>
          <div className="flex justify-between items-center">
            {[
              { label: 'CONTACT', completed: true },
              { label: 'RESUME', completed: true },
              { label: 'PREVIEW', current: true },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3 bg-surface px-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    step.completed
                      ? 'signature-gradient text-white shadow-lg shadow-primary/20'
                      : step.current
                        ? 'bg-white text-primary ring-4 ring-primary-fixed ring-offset-4 ring-offset-surface'
                        : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {step.completed ? (
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  ) : (
                    <span className="text-sm font-black">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-black tracking-[0.2em] uppercase ${step.current || step.completed ? 'text-primary' : 'text-on-surface-variant opacity-50'}`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-2xl shadow-black/5">
              <div className="flex items-start justify-between mb-10">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 text-primary flex items-center justify-center text-2xl font-black shadow-xl ring-4 ring-surface-container-low">
                    {initials(profile?.name, profile?.email)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-on-surface tracking-tight mb-1">{displayName}</h2>
                    {displayEmail ? (
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs font-bold text-on-surface-variant flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">mail</span> {displayEmail}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-[10px] font-black tracking-[0.3em] text-on-surface-variant mb-4 px-1">Notes</h3>
                <div className="bg-surface-container-low p-8 rounded-[1.8rem] border border-outline-variant/10">
                  <p className="text-sm leading-relaxed text-on-surface font-medium opacity-80">
                    This standalone preview uses your signed-in account from the API. Prefer applying from a job detail page so the role is attached automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-surface-container-highest/50 rounded-[2rem] border border-outline-variant/5">
              <p className="text-[10px] font-bold text-on-surface-variant leading-relaxed uppercase tracking-wider opacity-60">
                By clicking &quot;Submit Application&quot;, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-6 signature-gradient text-white rounded-[1.5rem] font-black text-lg shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                Continue
                <span className="material-symbols-outlined">send</span>
              </button>
              <Link
                to="/seeker/dashboard"
                className="w-full py-6 bg-surface-container-low text-on-surface-variant rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-surface-container-high transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default ApplicationForm;
