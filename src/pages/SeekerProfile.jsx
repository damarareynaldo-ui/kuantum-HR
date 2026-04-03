import React from 'react';
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

const SeekerProfile = () => {
  const [profile, setProfile] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getSeekerProfile();
        if (!cancelled) setProfile(me);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load profile');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const name = profile?.name || profile?.email || 'Your profile';
  const email = profile?.email || '';
  const role = profile?.role || '';

  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[3rem] bg-primary/15 text-primary text-4xl font-black flex items-center justify-center shadow-2xl shadow-primary/20 ring-8 ring-surface-container-low transition-all group-hover:scale-105 duration-500">
              {initials(profile?.name, profile?.email)}
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-2 leading-none">{name}</h1>
            {email ? (
              <p className="text-lg font-bold text-on-surface-variant mb-4 tracking-tight">{email}</p>
            ) : null}
            {role ? (
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="flex items-center gap-2 text-on-surface-variant font-bold text-xs uppercase tracking-widest bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/5">
                  <span className="material-symbols-outlined text-sm">badge</span> {role}
                </span>
              </div>
            ) : null}
          </div>
        </header>

        {error && <p className="text-error font-bold mb-8">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <section className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-outline-variant/10">
              <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant mb-6 px-1">Account</h3>
              <p className="text-xl text-on-surface leading-relaxed font-medium opacity-90">
                {profile?.industry_preference
                  ? `Industry preference: ${profile.industry_preference}`
                  : 'Extended resume and skills will appear here as we connect more profile fields to the API.'}
              </p>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <h4 className="text-2xl font-black text-on-surface mb-8 tracking-tight italic">Activity</h4>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Application history and interview outcomes are available from your dashboard and results pages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerProfile;
