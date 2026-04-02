import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const JobApplicantsDetail = () => {
  const { id } = useParams();

  // Mock data for the specific job
  const job = {
    title: 'Senior Product Designer',
    department: 'Design Department',
    status: 'Active',
    description: "Lead the creative direction for our core platform and design systems. We're looking for an editorial-focused visual thinker.",
    metrics: {
      totalApplicants: 124,
      daysOpen: 12
    }
  };

  const applicants = [
    {
      id: 1,
      name: 'Julian Casablancas',
      role: 'Formerly at Spotify • 8 yrs',
      match: 92,
      status: 'Screening',
      date: 'Oct 12, 2023',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5iZn_eqgR3se1ND2KkJ9j03IQmxBY5mou1STl4VO08T-SLYU6Qqd-in3A-iKfZbbU7iNMXAlQXjut9WaSYa_j0-2JmprWkBWhbfCijUf2VdrsUCJqq___nvyDgOPIhIaqUrXh5AEcF9VAHN0qsna6wPnqLzWNc5HHIYx0thNTlXlqcOYsX91tOewsL3EepcfvMrdNoosiZ52-4JxJ--2Fem-nb5Fzwgljq6a7DQT_5WqjwizAYeNDLDs-7qYVBeEEVWE00mpKeBBp'
    },
    {
      id: 2,
      name: 'Amara Okafor',
      role: 'Formerly at Airbnb • 5 yrs',
      match: 88,
      status: 'Applied',
      date: 'Oct 14, 2023',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLUjn2FEl73qT7o1_v7-oTaCg-vVBd81rCuVjP9G2K6Iiqy7zzIFQDkbt6v1NRw7h3XdbKB2ozIfqHdCo1nXHpEI9kvfcbowfGq6Ftvs7V2g2RPtNNxVSq_9EF_tgz3tTuDmIktsiHr1v1IhLTfGaD5HnHiKkXQiSssojtnTdT6P590suG2F3keLU5yRT1mLizfyd6LyFK-T8Fmw621ca2J6ZI03nKGNqBHLdP7dWMWDhB_J1YQzHTc3-qegCB0O-E9j2NKaGvCbYf'
    },
    {
      id: 3,
      name: 'Satoshi Kon',
      role: 'Design Lead • 12 yrs',
      match: 76,
      status: 'Shortlisted',
      date: 'Oct 15, 2023',
      initials: 'SK'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Job Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-primary/5">
                {job.department}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100/50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                {job.status}
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-on-surface leading-none">{job.title}</h1>
            <p className="text-on-surface-variant font-medium max-w-xl leading-relaxed text-lg opacity-70">
              {job.description}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-surface-container-low px-8 py-6 rounded-3xl border border-outline-variant/5 flex flex-col items-start min-w-[170px] shadow-sm">
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-2">Total Applicants</span>
              <span className="text-4xl font-black text-on-surface leading-none">{job.metrics.totalApplicants}</span>
            </div>
            <div className="bg-surface-container-low px-8 py-6 rounded-3xl border border-outline-variant/5 flex flex-col items-start min-w-[170px] shadow-sm">
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-2">Days Open</span>
              <span className="text-4xl font-black text-on-surface leading-none">{job.metrics.daysOpen}</span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-10 border-b border-outline-variant/10">
          {['All Candidates (124)', 'Shortlisted (12)', 'Interviewing (4)', 'Rejected (32)'].map((tab, i) => (
            <button 
              key={i} 
              className={`text-sm font-black uppercase tracking-widest pb-6 -mb-[1px] transition-all ${i === 0 ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant opacity-40 hover:opacity-100'}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Featured Match (Elena Vance) */}
        <div className="bg-tertiary-fixed p-1 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-tertiary/10 group">
          <div className="bg-white/60 backdrop-blur-3xl p-10 rounded-[2.2rem] flex flex-col md:flex-row items-center gap-10 border border-white/40">
            <div className="relative shrink-0">
              <img 
                alt="Elena Vance" 
                className="w-24 h-24 rounded-3xl object-cover shadow-xl group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9KTDX9iUdN5s2Zfdm_2pVftc3ggIzDRxEt4avCbZTWpUMUVbDizakye4jwDzQ4yrEy5VICmTcktqpaL2QOqzV2OE0--pGHnNPWlG_o4OEmdA6Q75-kBRKf1RALR9av4RbFTKnv4dkpIC9jPe6-EG5YU33x-gedkfPmGcxdA6nsdNFAjR4bO3PsGY_kkKk7UUqJhYHF3_6uxv6KMi6la-2NBFk22OpkLAaN1JubPWr5bq91qxylOlmDqM_ZL1_5FvM0emyCxI6NjK" 
              />
              <div className="absolute -bottom-3 -right-3 bg-tertiary text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-4 border-white shadow-lg">
                98%
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-black text-on-surface">Elena Vance</h3>
                <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary text-[10px] font-black uppercase tracking-widest rounded-full">Top AI Match</span>
              </div>
              <p className="text-lg font-medium text-on-surface-variant leading-relaxed max-w-2xl opacity-80">
                Elena matches 9/10 of your core design requirements. She has extensive experience with the <span className="font-black">Linear design system</span> and complex dashboard architectures. Recommended for immediate interview.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link 
                to="/interviews/agent"
                className="bg-primary px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Invite for AI Interview
              </Link>
              <button className="w-14 h-14 bg-white/80 hover:bg-white rounded-2xl flex items-center justify-center text-on-surface-variant transition-all hover:shadow-md">
                <span className="material-symbols-outlined text-2xl">more_horiz</span>
              </button>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 w-48 h-48 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-[180px] font-thin" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
        </div>

        {/* Applicant Management Table */}
        <div className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-sm border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50">
              <tr className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] border-b border-outline-variant/5">
                <th className="px-10 py-6">Candidate</th>
                <th className="px-10 py-6">AI Match Intensity</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6">Applied</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {applicants.map((applicant, i) => (
                <tr key={applicant.id} className={`hover:bg-primary/5 transition-all duration-300 group ${i % 2 !== 0 ? 'bg-surface-container-low/20' : ''}`}>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      {applicant.avatar ? (
                        <img alt={applicant.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" src={applicant.avatar} />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                          {applicant.initials}
                        </div>
                      )}
                      <div>
                        <p className="text-lg font-black text-on-surface leading-tight mb-1">{applicant.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium opacity-50 uppercase tracking-wider">{applicant.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-[140px] h-2 bg-on-surface-variant/5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${applicant.match}%` }}></div>
                      </div>
                      <span className="text-base font-black text-on-surface">{applicant.match}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 bg-on-surface-variant/5 text-on-surface-variant text-[10px] font-black uppercase tracking-[0.1em] rounded-full`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-sm text-on-surface-variant font-medium opacity-60 uppercase tracking-widest">{applicant.date}</td>
                  <td className="px-10 py-8 text-right space-x-6">
                    <Link to="/results/detail" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View Result</Link>
                    <button className="text-on-surface-variant/40 hover:text-error text-[10px] font-black uppercase tracking-widest transition-colors">Reject</button>
                    <button className="p-2 text-on-surface-variant/20 hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Global Footer Notification (Optional Pagination) */}
        <div className="flex items-center justify-between px-4 py-6">
          <p className="text-xs font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">Showing 3 of 124 curated talent</p>
          <div className="flex gap-3">
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${n === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobApplicantsDetail;
