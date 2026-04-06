import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchInterviewList } from '../lib/hrApi.js';

const PAGE_SIZE = 10;

const InterviewResultsList = () => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetchInterviewList({ completedOnly: false, page, pageSize: PAGE_SIZE }).catch(() => ({
        items: [],
        total: 0,
        page: 1,
        pageSize: PAGE_SIZE,
        totalPages: 0,
      }));
      if (cancelled) return;
      setResults(res.items);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      if (typeof res.page === 'number' && res.page !== page) setPage(res.page);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, total);

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
               <p className="text-xl font-black text-on-surface">{total} Interview{total === 1 ? '' : 's'}</p>
            </div>
          </div>
        </header>

        {/* Featured Elite Talent Card */}
        <div className="bg-tertiary-fixed p-10 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-tertiary/10 group cursor-pointer" onClick={() => results[0] && navigate(`/results/detail?sessionId=${encodeURIComponent(String(results[0].id))}`)}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 blur-[100px] -z-10 translate-x-1/4 -translate-y-1/3 group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden ring-8 ring-white/30 shadow-2xl group-hover:scale-105 transition-transform">
                <div className="w-full h-full object-cover bg-primary/20 flex items-center justify-center font-black text-primary text-2xl">{String(results[0]?.name || 'NA').slice(0,2).toUpperCase()}</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-tertiary rounded-full border-4 border-white flex items-center justify-center text-white text-2xl font-bold">
                 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>

            <div className="space-y-6 flex-1 text-center lg:text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 backdrop-blur-md text-tertiary text-[10px] font-black uppercase tracking-widest">Elite Talent Identified</div>
                <h2 className="text-4xl font-black text-on-tertiary-fixed tracking-tight">{results[0]?.name || 'Top candidate'}</h2>
                <p className="text-on-tertiary-fixed-variant leading-relaxed font-medium text-lg max-w-2xl">
                  Candidate has achieved a <span className="text-tertiary font-bold">{results[0]?.score || '--'}</span> for {results[0]?.job || 'the role'}.
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
               <div className="text-6xl font-black text-tertiary tracking-tighter">{String(results[0]?.score || '--').replace('%','')}<span className="text-xl">%</span></div>
               <span className="text-[9px] font-black uppercase tracking-widest bg-tertiary text-white px-2 py-0.5 rounded-full">Top 1%</span>
            </div>
          </div>
        </div>

        {/* Results Inventory */}
        <div className="bg-white rounded-[3.5rem] overflow-hidden border border-outline-variant/10 shadow-2xl shadow-on-surface/5">
          <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-outline-variant/5">
             <div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight">Candidate Performance</h3>
                <p className="text-xs font-medium text-on-surface-variant opacity-50 uppercase tracking-widest mt-1">
                  {loading
                    ? 'Loading…'
                    : total === 0
                      ? 'No interviews yet'
                      : `Showing ${rangeStart}–${rangeEnd} of ${total}`}
                </p>
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
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-16 text-center text-on-surface-variant text-sm font-bold">
                      Loading interviews…
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-16 text-center text-on-surface-variant text-sm font-bold">
                      No interviews in the pipeline yet.
                    </td>
                  </tr>
                ) : (
                  results.map((r) => (
                    <tr 
                      key={String(r.id)} 
                      onClick={() => navigate(`/results/detail?sessionId=${encodeURIComponent(String(r.id))}`)}
                      className="hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-sm shadow-md ring-4 ring-white text-primary">{String(r.name || '?').slice(0,2).toUpperCase()}</div>
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
                               <div className="h-full signature-gradient transition-all duration-1000" style={{ width: `${Number(String(r.score || '').replace('%','')) || 0}%` }}></div>
                            </div>
                            <span className="text-md font-black text-on-surface tracking-tighter">{r.score}</span>
                         </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest ${
                          r.status === 'Completed' ? 'bg-tertiary-fixed text-tertiary shadow-lg shadow-tertiary/10' :
                          r.status === 'In Progress' ? 'bg-primary-fixed text-primary' :
                          'bg-surface-container-highest text-on-surface-variant opacity-60'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-8 py-8 text-on-surface-variant text-[11px] font-black uppercase tracking-widest opacity-40">
                        {r.date}
                      </td>
                      <td className="px-10 py-8 text-right">
                         <button type="button" className="px-6 py-3 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/10 shadow-sm">
                            View Deep Analysis
                         </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface-container-low/20 border-t border-outline-variant/5">
            <p className="text-[11px] font-medium text-on-surface-variant opacity-60">
              Page {totalPages === 0 ? 0 : page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={loading || page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white border border-outline-variant/15 text-on-surface-variant hover:text-primary disabled:opacity-40 disabled:pointer-events-none shadow-sm"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={loading || totalPages === 0 || page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary text-on-primary hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none shadow-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewResultsList;
