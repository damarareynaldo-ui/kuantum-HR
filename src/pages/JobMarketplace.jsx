import React from 'react';
import { Link } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';

const JobMarketplace = () => {
  const jobs = [
    {
      id: 1,
      title: 'Sales Manager',
      company: 'Kuantum',
      location: 'Remote',
      type: 'Full-time',
      salary: '$140k - $180k',
      description: 'Lead our global sales initiatives, defining precision-driven strategies for enterprise expansion. Perfect for growth-oriented leaders.',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFQyvS1blstOG4JqzcsweVrLmJTm7he1DTQzVumKrPgn_H1NmdDHe0vQPLjgSUyjV22hmzLFT_m1_SECRXT5rkpOyWrVc7XZRtjrgcVaxzq_GLf4FjXPPMdmA6b52LiEMGTMu1yl7cRsbd_N8BAV40y1VzOpCk_y-I0imhJgBr8kJIlPgPRuJ7lApz7xIbJbss6l2tVDdgEnl6Xk_qRTGkLyBu8hhGlhpp8LFVg3iBzAi9K6qxxfUTQWzFFmPbcYcQx2qGWiLb4RoT'
    },
    {
      id: 2,
      title: 'Senior Software Engineer (AI)',
      company: 'Kuantum',
      location: 'New York / Hybrid',
      type: 'Full-time',
      hot: true,
      description: 'Scale our core inference engines. Experience with Rust and high-performance distributed systems required.',
      icon: 'code'
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'Kuantum',
      location: 'Remote',
      type: 'Full-time',
      description: 'Shape the future of editorial hiring. Focus on craft, intentional asymmetry, and tonal design systems.',
      icon: 'palette'
    }
  ];

  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Open Positions</h1>
            <p className="text-on-surface-variant text-sm max-w-lg">Join Kuantum in building the next generation of precision-engineered talent solutions.</p>
          </div>
          <div className="flex items-center bg-white border border-outline-variant/15 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
            <span className="text-on-surface-variant mr-2">Sort by:</span>
            <select className="border-none bg-transparent p-0 focus:ring-0 font-bold text-on-surface text-sm cursor-pointer">
              <option>Newest First</option>
              <option>Salary Range</option>
            </select>
          </div>
        </header>

        {/* AI Match Insight */}
        <div className="relative overflow-hidden bg-tertiary-fixed rounded-3xl p-8 shadow-sm border border-tertiary-fixed-dim/20">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div className="relative z-10 flex items-start gap-6">
            <div className="bg-white/40 backdrop-blur-xl p-4 rounded-2xl">
              <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-tertiary-container text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">AI Insight</span>
                <h4 className="font-black text-on-tertiary-fixed text-xl">High Priority Fit: Sales Manager</h4>
              </div>
              <p className="text-on-tertiary-fixed-variant text-base leading-relaxed max-w-2xl opacity-90">
                Based on your recent experience at Linear and Stripe, your background in high-velocity sales and product-led growth makes you a top 1% candidate for our Sales Manager role.
              </p>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="group bg-surface-container-lowest p-8 rounded-3xl transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-outline-variant/10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
                  {job.logo ? (
                    <img alt={job.company} className="w-10 h-10 object-contain" src={job.logo} />
                  ) : (
                    <span className="material-symbols-outlined text-primary text-3xl">{job.icon}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-on-surface group-hover:text-primary transition-colors tracking-tight">{job.title} at {job.company}</h3>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{job.location}</span>
                    <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{job.type}</span>
                    {job.salary && (
                      <span className="text-on-surface-variant text-[11px] font-bold ml-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        {job.salary}
                      </span>
                    )}
                    {job.hot && (
                      <span className="bg-tertiary-container text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Hot Job</span>
                    )}
                  </div>
                  <p className="text-on-surface-variant text-sm font-medium max-w-xl leading-relaxed opacity-80">{job.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link to={`/seeker/job/${job.id}`} className="px-6 py-3 text-sm font-black text-on-surface-variant hover:text-primary transition-all uppercase tracking-widest">
                  View Details
                </Link>
                <Link to={`/seeker/apply/${job.id}`} className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl text-sm font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SeekerLayout>
  );
};

export default JobMarketplace;
