import React from 'react';
import { useLocation } from 'react-router-dom';
import { getSeekerProfile } from '../lib/seekerApi.js';
import { fetchRecruiterProfile } from '../lib/hrApi.js';

function initialsFromName(name, email) {
  const n = String(name || '').trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return n.slice(0, 2).toUpperCase();
  }
  const e = String(email || '').trim();
  if (e) return e.slice(0, 2).toUpperCase();
  return '?';
}

function roleLabel(role) {
  if (role === 'recruiter') return 'Recruiter';
  if (role === 'applicant') return 'Applicant';
  return role ? String(role) : 'User';
}

const TopNav = () => {
  const location = useLocation();
  const isSeeker = location.pathname.startsWith('/seeker');
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const row = isSeeker ? await getSeekerProfile() : await fetchRecruiterProfile();
        if (!cancelled) setProfile(row);
      } catch {
        if (!cancelled) setProfile(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isSeeker]);

  const name = profile?.name || profile?.email || 'Account';
  const sub = roleLabel(profile?.role);
  const initials = initialsFromName(profile?.name, profile?.email);

  return (
    <header className="w-full sticky top-0 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 h-16 border-b border-outline-variant/10">
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input
            type="text"
            className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-80 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            placeholder="Search candidates or jobs..."
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-slate-50"></span>
        </button>
        <button type="button" className="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface leading-none">{name}</p>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">{sub}</p>
          </div>
          <div
            className="w-8 h-8 rounded-full bg-primary/15 text-primary text-[10px] font-black flex items-center justify-center ring-2 ring-primary/10"
            aria-hidden
          >
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
