import React from 'react';
import { NavLink } from 'react-router-dom';

const SeekerSidebar = () => {
  const navItems = [
    { label: 'Marketplace', icon: 'explore', path: '/seeker/marketplace' },
    { label: 'My Applications', icon: 'dashboard_customize', path: '/seeker/dashboard' },
    { label: 'Match Profile', icon: 'account_circle', path: '/seeker/profile' },
    { label: 'Settings', icon: 'settings', path: '/seeker/settings' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-100 dark:bg-slate-900 flex flex-col gap-2 p-4 transition-all duration-200 ease-in-out border-r border-outline-variant/10">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white font-black text-xl">K</div>
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 leading-none">Kuantum AI</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Professional Seeker</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-tight transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-lg shadow-primary/5'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10">
        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4">Alex Rivers</p>
        <button className="w-full signature-gradient text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all">
          Upload CV
        </button>
      </div>
    </aside>
  );
};

export default SeekerSidebar;
