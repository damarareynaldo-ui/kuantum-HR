import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Candidates = () => {
  const navigate = useNavigate();
  const candidates = [
    { name: 'Juliana Silva', email: 'juliana.s@techcorp.com', job: 'Senior UX Designer', score: 98, status: 'Completed', date: 'Oct 24, 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKejH43LX5nRPL88AcWab_eQdEceeGuf8FN9jez7atDxYbnBLDbygUgILNPeMvkQcQoD4-OwpNUdAi8WDGbC1_f5OMkAhLAhI_v-46BzWim-JjsfKcO3MY4JdTKmfpkMW1SGmS411X62hdW5z3GtyJ-YvFSFkH1p3-FWfCFL-tJXigO3RNmvazn6_L3UVy-Vhq0Y1qpP8sN8wMNhpDL57vI-lSLwWFx3qFFqyChYcOmq9jCC1fYOvXBvVmDQ7CNnnM8azKzEYEMrFQ' },
    { name: 'Marcus Reed', email: 'm.reed@designstack.io', job: 'Frontend Lead', score: 84, status: 'In Progress', date: 'Oct 25, 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTHTAF5sSUJ-jeh2cMl4M4yuGeijoPrsCf6oQkzt8O1J_Y5Idzf8160HBft0NbJGe4wANvk7kVAZYQ2sVVXIBZXNciF2h19LiIJSlvTckBvfi9l_Bb1erysJbMjs88HhSHOW0iAtJ6qRfMMmWTxL8JStxNdY8ie713RNMrspOwX2mtpAZsvbjCeUoCPFXeekPa6dIjNPLrFePlr7rllSfybOo0WlbCfUzSoRFf22596fmlhyoxo8UZQPFbGPcpsZp89n53eNtKq9JA' },
    { name: 'Aaron Lee', email: 'lee.aaron@global.net', job: 'Product Manager', score: null, status: 'Invited', date: 'Oct 27, 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy0fpiwBmXmYfBdRDEyxvTpi1NNe_8ZU5sMxyJGxXwZfyGZUVKimk7Hxv_gv6-_z0wry3bzISwqMZUqAE1THD11SlzNqjd8OlOwXN0QKKSrIFzY11kobv-QCq01SgdFRvihEBcRsJVw6cgjQMFD87WSblMRaZrLTP5LzhDAu1mUrrK-h4ATkApXNxrlrU5iVEZmFRx8wgYvVRSm6C7IWirT0EU7pAuu8_eU_wlg0JwdNpWYx7g82VDiqLmQ3Vs4X3l88fMkGzT2fTN' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Hub Header & Metrics */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Talent Matrix</span>
              <div className="h-px w-12 bg-primary/20"></div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-on-surface leading-none">Candidates Hub</h1>
            <p className="text-on-surface-variant mt-2 font-medium opacity-70">Review and manage your curated recruitment pipeline.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/invite" className="px-8 py-4 bg-surface-container-low text-on-surface font-black rounded-2xl hover:bg-surface-dim transition-all text-sm uppercase tracking-widest active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">person_add</span>
              Invite Candidate
            </Link>
            <Link to="/comparison" className="px-8 py-4 signature-gradient text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center gap-2">
              Compare Candidates
              <span className="material-symbols-outlined text-lg">analytics</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'All Candidates', value: '1,284', icon: 'groups' },
            { label: '90%+ AI Match', value: '12', icon: 'bolt', highlight: true },
            { label: 'Qualified', value: '482', icon: 'check_circle' },
            { label: 'Applied', value: '86', icon: 'send' }
          ].map((metric, i) => (
            <div key={i} className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
              <div className="flex items-center justify-between mb-4">
                <span className={`material-symbols-outlined text-2xl ${metric.highlight ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>{metric.icon}</span>
                {metric.highlight && <span className="bg-primary-fixed px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-primary animate-pulse">Critical</span>}
              </div>
              <p className="text-3xl font-black text-on-surface leading-none mb-1">{metric.value}</p>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">{metric.label}</h3>
            </div>
          ))}
        </div>

        {/* Filter & Management Area */}
        <div className="bg-surface-container-low rounded-[3rem] p-4 flex flex-col lg:flex-row items-center gap-4 border border-outline-variant/10 shadow-sm relative overflow-hidden">
          <div className="flex-1 flex items-center gap-4 bg-white/50 backdrop-blur-md rounded-[2.5rem] px-8 py-4 w-full shadow-inner">
            <span className="material-symbols-outlined text-on-surface-variant opacity-60">search</span>
            <input 
              placeholder="Search by name, email or job title..." 
              className="bg-transparent border-none text-sm font-bold focus:ring-0 w-full placeholder:text-on-surface-variant/40"
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 font-sans">
            <button className="px-6 py-4 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 whitespace-nowrap shadow-sm border border-outline-variant/5">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              All Jobs
            </button>
            <button className="px-6 py-4 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 whitespace-nowrap shadow-sm border border-outline-variant/5">
              <span className="material-symbols-outlined text-lg">swap_vert</span>
              Highest Score
            </button>
            <button className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        {/* Table Inventory */}
        <div className="bg-surface-container-lowest rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-2xl shadow-on-surface/5">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Candidate</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Applied Role</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Aura Match</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {candidates.map((c, i) => (
                <tr 
                  key={i} 
                  onClick={() => navigate('/results')}
                  className="hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <img className="w-14 h-14 rounded-[1.5rem] object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform" src={c.img} alt={c.name} />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-on-surface font-black text-lg tracking-tight group-hover:text-primary transition-colors">{c.name}</div>
                        <div className="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest opacity-60">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="space-y-1">
                      <div className="text-on-surface font-black text-sm">{c.job}</div>
                      <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">{c.date}</div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    {c.score ? (
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="20" className="stroke-slate-100 fill-none stroke-[4]" />
                            <circle cx="24" cy="24" r="20" className="stroke-primary fill-none stroke-[4]" strokeDasharray={`${c.score * 1.256} 125.6`} />
                          </svg>
                          <span className="absolute text-[10px] font-black text-primary">{c.score}%</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Match Found</span>
                      </div>
                    ) : (
                      <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">Processing...</div>
                    )}
                  </td>
                  <td className="px-8 py-8">
                    <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                      c.status === 'Completed' ? 'bg-tertiary-fixed text-tertiary shadow-lg shadow-tertiary/10' :
                      c.status === 'In Progress' ? 'bg-secondary-fixed text-secondary' :
                      'bg-surface-container-highest text-on-surface-variant opacity-60'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        c.status === 'Completed' ? 'bg-tertiary' :
                        c.status === 'In Progress' ? 'bg-secondary' :
                        'bg-on-surface-variant'
                      }`}></span>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 bg-surface-container-low rounded-xl text-on-surface-variant hover:text-primary hover:bg-white transition-all shadow-sm border border-outline-variant/5">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Insight Card */}
        <div className="bg-tertiary-fixed p-10 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-tertiary/10 group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 blur-[100px] -z-10 translate-x-1/4 -translate-y-1/3 group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="flex gap-10 items-center">
            <div className="flex-shrink-0 w-24 h-24 bg-white/40 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-tertiary shadow-xl relative animate-pulse">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-tertiary rounded-full border-4 border-white"></div>
            </div>
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <h4 className="text-[12px] font-black text-on-tertiary-fixed tracking-[0.3em] uppercase">Intelligence Curator</h4>
                <p className="text-on-tertiary-fixed leading-tight font-black text-3xl tracking-tight">
                  High-Precision Pattern Detected: <span className="underline decoration-4 decoration-tertiary/30 underline-offset-8">Juliana Silva</span>
                </p>
              </div>
              <p className="text-on-tertiary-fixed-variant leading-relaxed font-medium text-lg max-w-3xl">
                Analysis across Technical Proficiency and Communication reveals a 98% alignment with the Senior UX role. 
                Her <span className="font-bold text-tertiary">Scale-first mindset</span> perfectly offsets current team gaps.
              </p>
              <div className="flex gap-6">
                <Link to="/results" className="px-8 py-4 bg-tertiary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-tertiary/30 hover:scale-105 active:scale-95 transition-all">
                  Read Full Analysis
                </Link>
                <Link to="/results" className="px-8 py-4 bg-white/40 backdrop-blur-md text-tertiary rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/60 transition-all">
                  View Source Log
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Candidates;
