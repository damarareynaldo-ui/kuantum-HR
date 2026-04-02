import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Invite = () => {
  const candidates = [
    { name: 'Alexia Sterling', email: 'alexia.s@outlook.com', status: 'Invited', initials: 'AS', color: 'bg-primary/10 text-primary', date: '2 mins ago' },
    { name: 'David Helm', email: 'd.helm@techcorp.io', status: 'Opened', initials: 'DH', color: 'bg-tertiary/10 text-tertiary', date: '1 hour ago' },
    { name: 'Jordan Nguyen', email: 'j.nguyen@vortex.dev', status: 'Completed', initials: 'JN', color: 'bg-on-surface-variant/10 text-on-surface-variant', date: 'Yesterday' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Curation Engine</span>
              <div className="h-px w-12 bg-primary/20"></div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-on-surface leading-none">Invite Candidates</h1>
            <p className="text-on-surface-variant mt-2 font-medium opacity-70">Scale your recruitment process with automated assessments.</p>
          </div>
          <div className="flex items-center gap-4">
             <Link to="/candidates" className="px-8 py-4 bg-surface-container-low text-on-surface font-black rounded-2xl hover:bg-surface-dim transition-all text-sm uppercase tracking-widest active:scale-95">
              Back to Hub
            </Link>
            <button className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">upload_file</span>
              Bulk CSV Import
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* Input Panel - Sophisticated Sidebar Style */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 mb-8 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
              </div>
              <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">New Invitation</h3>
              <p className="text-sm text-on-surface-variant font-medium opacity-70 mb-10 leading-relaxed">
                Add candidate details to initiate the AI assessment journey.
              </p>
              
              <div className="space-y-6 font-sans">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Candidate Name</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 text-on-surface transition-all font-bold placeholder:text-on-surface-variant/40" placeholder="e.g. Marcus Aurelius" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Email Address</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 text-on-surface transition-all font-bold placeholder:text-on-surface-variant/40" placeholder="marcus@talent-ai.com" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Target Requisition</label>
                  <select className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 text-on-surface transition-all font-bold cursor-pointer appearance-none">
                    <option>Sales Manager at Kuantum</option>
                    <option>Senior Software Engineer (AI)</option>
                    <option>Product Designer</option>
                    <option>Staff Engineer</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { alert('Invitation sequence initiated.'); }}
              className="mt-12 w-full signature-gradient text-white py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95"
            >
              Dispatch Invite
            </button>
          </div>

          {/* Table Area - Invite Queue */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[2.8rem] overflow-hidden border border-outline-variant/10 shadow-sm">
            <div className="p-8 flex items-center justify-between border-b border-outline-variant/5 bg-surface-container-low/50 backdrop-blur-md">
              <div>
                <h3 className="text-[12px] font-black text-on-surface-variant uppercase tracking-widest">Active Invite Queue</h3>
              </div>
              <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-outline-variant/10 shadow-inner">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant opacity-60">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-xs font-bold w-48 placeholder:text-on-surface-variant/30" placeholder="Filter queue..." type="text" />
              </div>
            </div>
            
            <div className="overflow-x-auto font-sans">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-surface-container-low/20">
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-outline">Candidate Identifier</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-outline">Activity Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-outline">Timeframe</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-outline text-right">Sequence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {candidates.map((c, i) => (
                    <tr key={i} className="hover:bg-white/40 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform ${c.color}`}>{c.initials}</div>
                          <div>
                            <div className="font-black text-on-surface text-base tracking-tight">{c.name}</div>
                            <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                          c.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 
                          c.status === 'Opened' ? 'bg-tertiary-fixed text-tertiary shadow-lg shadow-tertiary/10' :
                          'bg-primary-fixed text-primary'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            c.status === 'Completed' ? 'bg-emerald-500' : 
                            c.status === 'Opened' ? 'bg-tertiary' :
                            'bg-primary'
                          } animate-pulse`}></span>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-on-surface-variant text-[11px] font-black uppercase tracking-widest opacity-40">
                        {c.date}
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline flex items-center justify-end gap-1 ml-auto group-hover:gap-2 transition-all">
                          <span className="material-symbols-outlined text-[16px]">refresh</span>
                          Re-dispatch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-10 text-center">
              <p className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase tracking-[0.3em]">Viewing 3 Recent Dispatches</p>
            </div>
          </div>
        </div>
        
        {/* Support Card */}
        <div className="bg-surface-container-low p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm flex items-center justify-between group">
           <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <div>
                <h4 className="text-xl font-black text-on-surface tracking-tight leading-none mb-2">Automated Follow-ups</h4>
                <p className="text-sm text-on-surface-variant font-medium opacity-60">The AI agent will automatically send three follow-up reminders to non-responsive candidates.</p>
              </div>
           </div>
           <button className="px-6 py-3 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/10 shadow-sm">
             Configure Interval
           </button>
        </div>
      </div>
    </Layout>
  );
};

export default Invite;
