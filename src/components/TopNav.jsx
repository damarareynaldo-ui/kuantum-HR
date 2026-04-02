import React from 'react';
import { useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const isSeeker = location.pathname.startsWith('/seeker');

  const user = isSeeker ? {
    name: 'Andi Pratama',
    role: 'Sales Manager',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwcHnfmPQ90Kg10ElyCe0zBiW3GLtAJ4lGvXa9lnasOmSWyKc0JG-mHZUrB8wnCRqECfGdX_SurEAK2F6d7-U9GsX3DrPQEwf8uxZ_pyXJGGCSdpJdvsD8VW1WGZXBNpDXvSkr9DdELAjpVpaJfHRt7S9GF4Q4fOQSR8M6qW_3qaOhpUHZV5cXJJnunKdtVTK1Zg_JyuDDJyT9GET2EOG_wFjgoQhWSm7zuHLV7CcFQo7uavxPRGYr95mCwf7jb2IHnWT80Ml2Cpz4'
  } : {
    name: 'Sarah Morrison',
    role: 'HR Director',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3kDOLHqkM5g1PGEOHuWMuI5CzNgDiLJm1LauEe6u2w4nThIywHyEhg5obek_Ess6ZVOw6Ll8PrnDMYL2mw0uZXeKyeOvQv06ys-K7aJzuH-Nwcn0to9xnuvvvoiu_bAj0w0Idd3MHt03p0svRck-n5LANv-5uBr-BxmdDYb7sIxoe9ne5qCQr8up9ozlF2Kh1ahnZiwiwy7ME9-pa3Xn5x0sWS2P4OABp7CZuVkUvXFSp9XdsbUVFQ9IRdU7VfHUl10Vuae2dbNba'
  };
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
        <button className="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-slate-50"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface leading-none">{user.name}</p>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">{user.role}</p>
          </div>
          <img
            src={user.avatar}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/10"
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
