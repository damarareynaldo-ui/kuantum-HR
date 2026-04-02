import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const JobManagement = () => {
  const jobs = [
    {
      id: 1,
      title: 'Sales Manager at Kuantum',
      department: 'Sales & Growth',
      type: 'Full-time',
      location: 'London, UK',
      candidates: 124,
      precision: '92%',
      status: 'Active',
      color: 'bg-primary/5 text-primary'
    },
    {
      id: 2,
      title: 'Senior Software Engineer (AI)',
      department: 'Engineering',
      type: 'Remote',
      location: 'San Francisco, CA',
      candidates: 86,
      precision: '88%',
      status: 'Active',
      color: 'bg-secondary/5 text-secondary'
    },
    {
      id: 3,
      title: 'Product Designer',
      department: 'Creative',
      type: 'Full-time',
      location: 'Berlin, DE',
      candidates: 42,
      precision: '84%',
      status: 'On Hold',
      color: 'bg-on-surface-variant/5 text-on-surface-variant'
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Page Header */}
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Active Jobs', value: '12', sub: 'Across 4 departments', icon: 'work' },
            { label: 'Total Candidates', value: '282', sub: '+12% this week', icon: 'group', highlight: true },
            { label: 'AI Precision Rate', value: '87.4%', sub: 'Optimized matching', icon: 'auto_awesome' }
          ].map((metric, i) => (
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

        {/* Inventory Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black tracking-tight text-on-surface uppercase tracking-widest text-[12px]">Job Inventory</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                <input 
                  className="bg-surface-container-low border-none rounded-full pl-10 pr-6 py-2.5 text-xs w-64 focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-400"
                  placeholder="Filter by title..."
                />
              </div>
              <button className="p-2.5 bg-surface-container-low rounded-xl text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-surface-container-lowest p-8 rounded-[2.2rem] border border-outline-variant/10 hover:border-primary/20 hover:shadow-2xl hover:shadow-black/[0.02] transition-all group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className={`w-16 h-16 ${job.color} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <span className="material-symbols-outlined text-3xl">work</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-on-surface tracking-tight leading-none mb-2">{job.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <span className="text-xs font-bold text-on-surface-variant opacity-60 flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[14px]">category</span> {job.department}
                        </span>
                        <span className="text-xs font-bold text-on-surface-variant opacity-60 flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> {job.type}
                        </span>
                        <span className="text-xs font-bold text-on-surface-variant opacity-60 flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[14px]">location_on</span> {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 self-end lg:self-center">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-50">Candidates</p>
                      <p className="text-lg font-black text-on-surface leading-none">{job.candidates}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-50">AI Precision</p>
                      <p className="text-lg font-black text-primary leading-none">{job.precision}</p>
                    </div>
                    <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/15 font-sans">
                      <button className="px-6 py-2.5 bg-surface-container-high rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface hover:bg-surface-dim transition-all active:scale-95">
                        Manage
                      </button>
                      <Link 
                        to="/interviews" 
                        state={{ jobTitle: job.title }}
                        className="px-6 py-2.5 bg-tertiary-fixed text-tertiary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-tertiary-container transition-all active:scale-95 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        Generate AI Interview
                      </Link>
                      <button className="p-2.5 text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <p className="text-xs font-bold text-on-surface-variant opacity-50 uppercase tracking-[0.2em]">Showing 3 of 12 open roles</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default JobManagement;
