import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import SeekerLayout from '../components/SeekerLayout';
import { fetchPublicJob } from '../lib/publicJobsApi.js';
import { createApplication, getSeekerProfile } from '../lib/seekerApi';

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

const SeekerJobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const j = await fetchPublicJob(String(id));
        if (cancelled) return;
        setJob(j);
      } catch {
        if (!cancelled) setJob(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

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

  const jobTitle = job?.title || 'Role';
  const companyName = job?.company_name || 'Company';
  const requirements = Array.isArray(job?.requirements) ? job.requirements : [];
  const displayName = profile?.name || profile?.email || 'Applicant';
  const displayEmail = profile?.email || '';
  const roleHint = profile?.industry_preference || (profile?.role === 'applicant' ? 'Applicant' : '');

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await createApplication(String(id));
      navigate('/seeker/dashboard', {
        state: {
          toast: 'Lamaran terkirim. Recruiter akan mengundang Anda ke wawancara AI setelah ditinjau.',
        },
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SeekerLayout>
      <div className="max-w-4xl mx-auto w-full py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2 italic uppercase">
            {jobTitle} at {companyName}
          </h1>
          <p className="text-on-surface-variant font-bold opacity-60 uppercase tracking-[0.2em] text-[10px]">
            Step 3 of 3: Final Review & Submission
          </p>
        </div>

        <div className="mb-16 relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-surface-container-high -z-0"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm font-black">check</span>
              </div>
              <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">Contact</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm font-black">check</span>
              </div>
              <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">Resume</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                <span className="text-sm font-black">3</span>
              </div>
              <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">Preview</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-8">
            <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-start justify-between mb-10">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-black shadow-inner border border-outline-variant/10">
                    {initials(profile?.name, profile?.email)}
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-on-surface tracking-tight uppercase italic">{displayName}</h2>
                    {roleHint ? (
                      <p className="text-sm font-bold text-primary opacity-80 uppercase tracking-tighter">{roleHint}</p>
                    ) : null}
                    {displayEmail ? (
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-black text-on-surface-variant flex items-center gap-2 uppercase tracking-widest opacity-60">
                          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>{' '}
                          {displayEmail}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black tracking-[0.25em] text-on-surface-variant uppercase mb-4 opacity-70">Role summary</h3>
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
                    <p className="text-sm leading-relaxed text-on-surface font-medium opacity-90">
                      {job?.description?.trim() || 'No description provided for this job yet.'}
                    </p>
                  </div>
                </div>

                {requirements.length > 0 ? (
                  <div>
                    <h3 className="text-[10px] font-black tracking-[0.25em] text-on-surface-variant uppercase mb-4 opacity-70">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {requirements.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            idx < 3
                              ? 'bg-primary/5 border-primary/10 text-primary'
                              : 'bg-surface-container-high border-outline-variant/10 text-on-surface-variant'
                          }`}
                        >
                          {typeof skill === 'string' ? skill : String(skill)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="bg-tertiary-fixed rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl shadow-tertiary/10 border border-tertiary-fixed-dim/20">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="relative z-10 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-tertiary flex-shrink-0 shadow-xl border border-white/50">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-on-tertiary-fixed text-sm uppercase tracking-[0.2em] italic">Before you submit</h4>
                  <p className="text-sm text-on-tertiary-fixed-variant font-bold leading-relaxed tracking-tight opacity-90">
                    Setelah dikirim, lamaran Anda masuk ke recruiter. Mereka yang akan membuat sesi wawancara AI dan mengirim link beserta kode akses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <h3 className="text-[10px] font-black text-on-surface mb-6 uppercase tracking-[0.2em] opacity-60">Resume</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Resume upload is not part of this flow yet. Your account identity ({displayEmail || 'email on file'}) will be attached to the application.
              </p>
            </div>

            <div className="bg-surface-container-highest p-6 rounded-[2rem] border border-outline-variant/10">
              <p className="text-[10px] font-bold text-on-surface-variant leading-relaxed uppercase tracking-tighter opacity-70 italic">
                By clicking &quot;Submit Application&quot;, you agree to our Terms of Service and Privacy Policy. Kuantum may contact you regarding this and
                similar opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full py-5 bg-surface-container-highest text-on-surface rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-surface-dim active:scale-95 transition-all"
              >
                Back to Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerJobApplication;
