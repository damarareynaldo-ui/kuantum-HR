import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Comparison = () => {
  const navigate = useNavigate();
  const finalists = [
    { name: 'Alex Rivera', initials: 'AR', technical: 8.5, communication: 9.2, solving: 8.0, culture: 'Strong', score: 87, status: 'Interviewed', color: 'bg-primary/10 text-primary' },
    { 
      name: 'Elena Costa', 
      initials: 'EC', 
      technical: 9.4, 
      communication: 9.5, 
      solving: 9.8, 
      culture: 'Exceptional', 
      score: 94, 
      status: 'Finalist', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrYpE2bRj3JDQ1jQFLVgFugZO9dtrDjs9YsOc-yg7wEQVNpVS-6_rGiNTrDVJ-pEkRuPHblcAk5UYGm0VYZDXLuqq2MBDDtHznt21j--5kZ8oC1-J2T5qY-vqYQQDAfhb89CEiYUyld-FQA8SiKr_6I5uwLJpzw20lslHqzQKxyL0_BVusZFzlboWmZJTh6RKnmnXdvNZpiMq3pJQyiWoyAWLnqBm9dNqWJrW15TBxMsWpdHq5An4w82yLL3UX2V6nYqz5x3MyMl96', 
      top: true 
    },
    { name: 'Marcus Thorne', initials: 'MT', technical: 7.8, communication: 8.9, solving: 9.1, culture: 'Moderate', score: 84, status: 'On Hold', color: 'bg-on-surface-variant/10 text-on-surface-variant' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header section with Hero Insight */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-8 px-2">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Evaluation Matrix</span>
              <div className="h-px w-12 bg-primary/20"></div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-on-surface leading-none">Candidate Comparison</h1>
            <p className="text-on-surface-variant mt-3 font-medium opacity-70 max-w-xl">
              Cross-referencing behavioral patterns and technical scores for the <span className="font-bold text-on-surface">Senior Product Design</span> role.
            </p>
          </div>
          <div className="md:col-span-4 bg-tertiary-fixed p-8 rounded-[2.8rem] relative overflow-hidden group shadow-2xl shadow-tertiary/10 flex flex-col justify-between h-48 md:h-auto">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
             <div>
                <span className="bg-white/40 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-tertiary">Match Architect</span>
                <p className="text-on-tertiary-fixed font-black text-xl leading-tight mt-3">
                  Elena Costa dominates in Problem Solving (9.8).
                </p>
             </div>
             <Link to="/results" className="text-[10px] font-black uppercase tracking-widest text-tertiary flex items-center gap-2 hover:underline group-hover:gap-4 transition-all">
               View Full Matrix Insights <span className="material-symbols-outlined text-sm">arrow_forward</span>
             </Link>
          </div>
        </header>

        {/* Matrix Table */}
        <div className="bg-surface-container-low rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-2xl shadow-on-surface/5">
          <div className="overflow-x-auto font-sans">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Profile</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Technical</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Solving</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Culture</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-right">Aura Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {finalists.map((f, i) => (
                  <tr 
                    key={i} 
                    onClick={() => navigate('/results')}
                    className={`group transition-all duration-300 cursor-pointer ${f.top ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-white'}`}
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          {f.img ? (
                            <img className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform" src={f.img} alt={f.name} />
                          ) : (
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm shadow-md ring-4 ring-white ${f.color}`}>{f.initials}</div>
                          )}
                          {f.top && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-tertiary rounded-full border-4 border-white flex items-center justify-center text-white">
                              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className={`font-black text-lg tracking-tight ${f.top ? 'text-primary' : 'text-on-surface'}`}>{f.name}</div>
                          <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">{f.status}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-3">
                          <span className="text-xl font-black text-on-surface tracking-tighter">{f.technical}</span>
                          <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                             <div className={`h-full ${f.top ? 'signature-gradient' : 'bg-primary-fixed'} transition-all duration-1000`} style={{ width: `${f.technical * 10}%` }}></div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-3">
                          <span className="text-xl font-black text-on-surface tracking-tighter">{f.solving}</span>
                          <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                             <div className={`h-full ${f.top ? 'signature-gradient' : 'bg-primary-fixed'} transition-all duration-1000`} style={{ width: `${f.solving * 10}%` }}></div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                        f.culture === 'Exceptional' ? 'bg-tertiary-fixed text-tertiary shadow-lg shadow-tertiary/10' : 'bg-surface-container-highest text-on-surface-variant opacity-60'
                      }`}>
                        {f.culture}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="text-5xl font-black tracking-tighter text-on-surface group-hover:scale-110 transition-transform">
                         {f.score}<span className="text-lg opacity-40">%</span>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Board Footer */}
        <footer className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-2xl shadow-on-surface/5 flex flex-col lg:flex-row items-center justify-between gap-10">
           <div className="flex items-center gap-10">
              <div className="flex -space-x-6">
                {finalists.map((f, i) => (
                  <div key={i} className={`w-16 h-16 rounded-full border-8 border-white flex items-center justify-center font-black text-xs uppercase shadow-xl transition-transform hover:translate-y-[-10px] ${f.top ? 'signature-gradient text-white z-20' : 'bg-surface-container text-on-surface-variant z-10'}`}>
                    {f.initials}
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-3xl font-black text-on-surface tracking-tight leading-none mb-2">Offer Stage Ready</h4>
                <p className="text-sm text-on-surface-variant font-bold uppercase tracking-[0.2em] opacity-40">3 Operational finalists selected</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4 w-full lg:w-auto">
              <button className="flex-1 lg:px-10 py-6 rounded-[1.8rem] bg-surface-container-low text-on-surface-variant font-black text-xs uppercase tracking-widest hover:bg-surface-dim transition-all active:scale-95">
                Schedule Panel
              </button>
              <button 
                onClick={() => { alert('Proceeding to Offer Phase for Elena Costa.'); }}
                className="flex-1 lg:px-12 py-6 rounded-[1.8rem] signature-gradient text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
              >
                Dispatch Offer
              </button>
           </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Comparison;
