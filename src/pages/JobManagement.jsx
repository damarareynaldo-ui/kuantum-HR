import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchPublicJobs } from '../lib/publicJobsApi.js';

const COLORS = ['bg-primary/5 text-primary', 'bg-secondary/5 text-secondary', 'bg-on-surface-variant/5 text-on-surface-variant'];

function pickColor(i) {
  return COLORS[i % COLORS.length];
}

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchPublicJobs();
        if (!cancelled) setJobs(rows);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load jobs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = useMemo(() => {
    const n = jobs.length;
    return [
      { label: 'Active Jobs', value: loading ? '…' : String(n), sub: 'From API /api/jobs', icon: 'work' },
      { label: 'Total Candidates', value: '—', sub: 'Per-job counts not exposed in list', icon: 'group', highlight: true },
      { label: 'AI Precision Rate', value: '—', sub: 'Demo metric', icon: 'auto_awesome' },
    ];
  }, [jobs.length, loading]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Recruitment Pipeline</span>
              <div className="h-px w-12 bg-primary/20"></div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-on-surface leading-none">Jobs Management</h1>
            <p className="text-on-surface-variant mt-2 font-medium opacity-70">Orchestrate your talent acquisition with surgical precision.</p>
          </div>
          <Link
            to="/jobs/new"
            className="flex items-center gap-3 px-8 py-4 signature-gradient text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Create Job
          </Link>
        </header>

        {error && (
          <div className="rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm font-bold text-error">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-6xl">{metric.icon}</span>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant mb-4">{metric.label}</h3>
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-black text-on-surface">{metric.value}</p>
                {metric.highlight && <span className="text-xs font-black text-primary opacity-80">{metric.sub}</span>}
              </div>
              {!metric.highlight && <p className="text-[10px] font-bold text-on-surface-variant mt-2 uppercase tracking-wider opacity-60">{metric.sub}</p>}
            </div>
          ))}
        </div>

        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black tracking-tight text-on-surface uppercase tracking-widest text-[12px]">Job Inventory</h2>
          </div>

          {loading && <p className="text-sm font-bold text-on-surface-variant px-2">Loading jobs…</p>}

          {!loading && jobs.length === 0 && !error && (
            <p className="text-sm font-bold text-on-surface-variant px-2">Belum ada lowongan. Buat dari Create Job.</p>
          )}

          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job, idx) => {
              const id = job.id;
              const title = job.title || 'Untitled';
              const department = job.department || '—';
              const emp = job.employment_type || '—';
              const company = job.company_name || '—';
              return (
                <div key={id} className="bg-surface-container-lowest p-8 rounded-[2.2rem] border border-outline-variant/10 hover:border-primary/20 hover:shadow-2xl hover:shadow-black/[0.02] transition-all group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className={`w-16 h-16 ${pickColor(idx)} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <span className="material-symbols-outlined text-3xl">work</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-on-surface tracking-tight leading-none mb-2">{title}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <span className="text-xs font-bold text-on-surface-variant opacity-60 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[14px]">category</span> {department}
                          </span>
                          <span className="text-xs font-bold text-on-surface-variant opacity-60 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[14px]">schedule</span> {emp}
                          </span>
                          <span className="text-xs font-bold text-on-surface-variant opacity-60 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[14px]">corporate_fare</span> {company}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 self-end lg:self-center">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-50">Candidates</p>
                        <p className="text-lg font-black text-on-surface leading-none">—</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-50">AI Precision</p>
                        <p className="text-lg font-black text-primary leading-none">—</p>
                      </div>
                      <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/15 font-sans">
                        <Link
                          to={`/jobs/${id}`}
                          className="px-6 py-2.5 bg-surface-container-high rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface hover:bg-surface-dim transition-all active:scale-95 text-center"
                        >
                          Manage
                        </Link>
                        <Link
                          to="/interviews"
                          state={{ jobTitle: title }}
                          className="px-6 py-2.5 bg-tertiary-fixed text-tertiary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-tertiary-container transition-all active:scale-95 flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                          Generate AI Interview
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-6">
            <p className="text-xs font-bold text-on-surface-variant opacity-50 uppercase tracking-[0.2em]">
              {loading ? '' : `Showing ${jobs.length} role(s)`}
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default JobManagement;
