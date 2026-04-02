import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const InterviewResultsList = () => {
  const navigate = useNavigate();
  const results = [
    { name: 'Elena Costa', job: 'Senior Product Designer', match: 98, status: 'Elite Match', date: '2 hours ago', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrYpE2bRj3JDQ1jQFLVgFugZO9dtrDjs9YsOc-yg7wEQVNpVS-6_rGiNTrDVJ-pEkRuPHblcAk5UYGm0VYZDXLuqq2MBDDtHznt21j--5kZ8oC1-J2T5qY-vqYQQDAfhb89CEiYUyld-FQA8SiKr_6I5uwLJpzw20lslHqzQKxyL0_BVusZFzlboWmZJTh6RKnmnXdvNZpiMq3pJQyiWoyAWLnqBm9dNqWJrW15TBxMsWpdHq5An4w82yLL3UX2V6nYqz5x3MyMl96' },
    { name: 'Alex Rivera', job: 'Senior UX Designer', match: 87, status: 'Strong Match', date: '5 hours ago', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD-YVGzCUYiD4-rcRFlWyFzrSbBCxuLFUwhsdlCBFcttNXY0ipih5arR7VVu3QVvnldo67Xys6SCmA9fLEDtsvFmSH5HOmdo1espnZJP4ornEV9aXF9c5qCyaBTVI2nwKzvSYUuqccMCV2xX_myIu_6v-NWf6bwYnkO9ONTEVXiEyV0mER3Nhm9I0qVt_Qx2tbJcaqXpcSLEaaSemLG1_PLOkJQcvCKJ1v78VVP4XjUg-tOpUDkp5PZL3X5UtAdwHfRUkXl-pgvXBx' },
    { name: 'Marcus Thorne', job: 'Frontend Developer', match: 84, status: 'Good Match', date: 'Yesterday', initials: 'MT', color: 'bg-primary/10 text-primary' },
    { name: 'Juliana Silva', job: 'UX Researcher', match: 92, status: 'Elite Match', date: '2 days ago', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKejH43LX5nRPL88AcWab_eQdEceeGuf8FN9jez7atDxYbnBLDbygUgILNPeMvkQcQoD4-OwpNUdAi8WDGbC1_f5OMkAhLAhI_v-46BzWim-JjsfKcO3MY4JdTKmfpkMW1SGmS411X62hdW5z3GtyJ-YvFSFkH1p3-FWfCFL-tJXigO3RNmvazn6_L3UVy-Vhq0Y1qpP8sN8wMNhpDL57vI-lSLwWFx3qFFqyChYcOmq9jCC1fYOvXBvVmDQ7CNnnM8azKzEYEMrFQ' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Hub Header & Title */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Curation Insights</span>
              <div className="h-px w-12 bg-primary/20"></div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-on-surface leading-none">Interview Results</h1>
            <p className="text-on-surface-variant mt-3 font-medium opacity-70 max-w-xl">
              Real-time analysis and curation of AI-driven interview performance metrics across your talent pipeline.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-low px-6 py-4 rounded-[1.5rem] border border-outline-variant/5 shadow-sm">
               <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Active Pipeline</p>
               <p className="text-xl font-black text-on-surface">48 Candidates</p>
            </div>
          </div>
        </header>

        {/* Featured Elite Talent Card */}
        <div className="bg-tertiary-fixed p-10 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-tertiary/10 group cursor-pointer" onClick={() => navigate('/results/detail')}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 blur-[100px] -z-10 translate-x-1/4 -translate-y-1/3 group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden ring-8 ring-white/30 shadow-2xl group-hover:scale-105 transition-transform">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrYpE2bRj3JDQ1jQFLVgFugZO9dtrDjs9YsOc-yg7wEQVNpVS-6_rGiNTrDVJ-pEkRuPHblcAk5UYGm0VYZDXLuqq2MBDDtHznt21j--5kZ8oC1-J2T5qY-vqYQQDAfhb89CEiYUyld-FQA8SiKr_6I5uwLJpzw20lslHqzQKxyL0_BVusZFzlboWmZJTh6RKnmnXdvNZpiMq3pJQyiWoyAWLnqBm9dNqWJrW15TBxMsWpdHq5An4w82yLL3UX2V6nYqz5x3MyMl96" alt="Elena Costa" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-tertiary rounded-full border-4 border-white flex items-center justify-center text-white text-2xl font-bold">
                 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>

            <div className="space-y-6 flex-1 text-center lg:text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 backdrop-blur-md text-tertiary text-[10px] font-black uppercase tracking-widest">Elite Talent Identified</div>
                <h2 className="text-4xl font-black text-on-tertiary-fixed tracking-tight">Elena Costa</h2>
                <p className="text-on-tertiary-fixed-variant leading-relaxed font-medium text-lg max-w-2xl">
                  Elena has achieved a <span className="text-tertiary font-bold">98% AI Match Score</span> for the Product Designer role. Her responses demonstrate exceptional systems thinking and user advocacy.
                </p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {['Systems Thinking', 'User Centricity', 'Product Vision'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-on-tertiary-fixed-variant">{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-md p-8 rounded-[2rem] border border-white/30">
               <span className="text-[10px] font-black uppercase tracking-widest text-on-tertiary-fixed-variant opacity-60">Curator Score</span>
               <div className="text-6xl font-black text-tertiary tracking-tighter">98<span className="text-xl">%</span></div>
               <span className="text-[9px] font-black uppercase tracking-widest bg-tertiary text-white px-2 py-0.5 rounded-full">Top 1%</span>
            </div>
          </div>
        </div>

        {/* Results Inventory */}
        <div className="bg-white rounded-[3.5rem] overflow-hidden border border-outline-variant/10 shadow-2xl shadow-on-surface/5">
          <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-outline-variant/5">
             <div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight">Candidate Performance</h3>
                <p className="text-xs font-medium text-on-surface-variant opacity-50 uppercase tracking-widest mt-1">Showing 4 of 48 Recent Results</p>
             </div>
             <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-2xl w-full md:w-[400px]">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                   <span className="material-symbols-outlined text-outline">search</span>
                   <input className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full placeholder:text-outline/40" placeholder="Filter listing..." />
                </div>
                <button className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/5">
                   <span className="material-symbols-outlined">tune</span>
                </button>
             </div>
          </div>

          <div className="overflow-x-auto font-sans">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-surface-container-low/30">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Candidate</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Match Integrity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Status Label</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Evaluation Time</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {results.map((r, i) => (
                  <tr 
                    key={i} 
                    onClick={() => navigate('/results/detail')}
                    className="hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          {r.img ? (
                            <img className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform" src={r.img} alt={r.name} />
                          ) : (
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm shadow-md ring-4 ring-white ${r.color}`}>{r.initials}</div>
                          )}
                        </div>
                        <div>
                          <div className="text-on-surface font-black text-lg tracking-tight group-hover:text-primary transition-colors">{r.name}</div>
                          <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 mt-0.5">{r.job}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-32 h-2 bg-surface-container-low rounded-full overflow-hidden">
                             <div className="h-full signature-gradient transition-all duration-1000" style={{ width: `${r.match}%` }}></div>
                          </div>
                          <span className="text-md font-black text-on-surface tracking-tighter">{r.match}%</span>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest ${
                        r.status === 'Elite Match' ? 'bg-tertiary-fixed text-tertiary shadow-lg shadow-tertiary/10' : 
                        r.status === 'Strong Match' ? 'bg-primary-fixed text-primary' : 
                        'bg-surface-container-highest text-on-surface-variant opacity-60'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-8 py-8 text-on-surface-variant text-[11px] font-black uppercase tracking-widest opacity-40">
                      {r.date}
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button className="px-6 py-3 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/10 shadow-sm">
                          View Deep Analysis
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-10 text-center bg-surface-container-low/20">
             <button className="text-[11px] font-black text-primary uppercase tracking-[0.3em] hover:underline">Load 44 Additional Results</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewResultsList;
