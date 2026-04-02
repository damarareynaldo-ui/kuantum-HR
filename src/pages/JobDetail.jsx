import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';

const JobDetail = () => {
  const { id } = useParams();
  
  // Mock job data
  const job = {
    title: 'Sales Manager',
    company: 'Kuantum',
    location: 'Remote',
    type: 'Full-time',
    salary: 'Competitive',
    seniority: 'Manager',
    description: 'Kuantum is seeking a visionary Sales Manager to lead our growing enterprise team. You will be responsible for driving revenue growth, mentoring a team of account executives, and refining our go-to-market strategy. This is a pivotal role for an individual who thrives in a fast-paced environment and possesses a deep understanding of the AI-driven analytics landscape.',
    responsibilities: [
      'Lead and mentor a high-performing team of 8+ Account Executives to exceed quarterly targets.',
      'Develop and execute a strategic plan to achieve sales targets and expand our customer base.',
      'Collaborate with Marketing and Product teams to refine messaging and product-market fit.',
      'Manage complex sales cycles and navigate enterprise-level decision-making processes.'
    ],
    requirements: [
      { title: 'Experience', detail: '5+ years in Enterprise B2B SaaS sales with 2+ years in a leadership role.' },
      { title: 'Communication', detail: 'Exceptional verbal and written communication skills with the ability to influence C-suite executives.' },
      { title: 'Data Driven', detail: 'Proficiency in CRM management (Salesforce) and data-driven sales forecasting.' },
      { title: 'Culture Fit', detail: 'Entrepreneurial mindset with a bias for action and a passion for AI technology.' }
    ],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpPSPRgEp6ZrJTAn4rcddxxLmrG2gDUP42BwovyzNfrTTti5Y_VR3-_WrYCDhvf6gu8BrpntnTppQdMwoqWfZZTFL4TPKSlIA-TxsYLV35JMnxqAYOcMVQxtBuAU2Cuz2v1cBtGRjoTxJ6aqjFSqBzAlxtkjNsrNlPAU3P4y14hXYJ1rioSR9y3Mx2p48fXkd3W-qy6F50qBf4-7KgWo52msgzbV5PeLJ93v2l6AYm6zh_WcibitfCJ8BEoa5aw4jqt46I4J3fhzsc'
  };

  return (
    <SeekerLayout>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link to="/seeker/marketplace" className="mb-8 flex items-center gap-2 text-on-surface-variant cursor-pointer hover:text-primary transition-colors group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-sm font-black uppercase tracking-widest">Back to search</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column */}
          <div className="flex-grow space-y-12">
            <section>
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-surface-container-lowest flex items-center justify-center shadow-xl shadow-black/5 border border-outline-variant/10 p-4">
                    <img alt="Kuantum Logo" className="w-full h-full object-contain" src={job.logo} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-on-surface leading-tight mb-1">{job.title}</h1>
                    <p className="text-xl text-primary font-black tracking-tight">{job.company}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-container-low text-on-surface hover:bg-surface-dim transition-all active:scale-95">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-container-low text-on-surface hover:bg-surface-dim transition-all active:scale-95">
                    <span className="material-symbols-outlined">bookmark_border</span>
                  </button>
                </div>
              </div>

              {/* AI Match Insight */}
              <div className="bg-tertiary-fixed p-8 rounded-[2rem] relative overflow-hidden border border-white/20 shadow-lg">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <span className="text-xs font-black tracking-[0.2em] uppercase text-tertiary">AI Match Insight</span>
                  </div>
                  <p className="text-on-tertiary-fixed-variant leading-relaxed text-base font-medium">
                    Based on your experience at <span className="font-black">Stripe</span> and your background in <span className="font-black">B2B SaaS scalability</span>, you are in the top 2% of candidates for this role. Kuantum is specifically looking for managers who have led high-growth sales teams through Series B transitions.
                  </p>
                </div>
              </div>
            </section>

            {/* Description Section */}
            <div className="space-y-12">
              <section className="space-y-6">
                <h2 className="text-2xl font-black tracking-tight text-on-surface">About the Role</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg font-medium opacity-90">
                  {job.description}
                </p>
              </section>

              <section className="space-y-8">
                <h2 className="text-2xl font-black tracking-tight text-on-surface">Responsibilities</h2>
                <div className="space-y-5">
                  {job.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <p className="text-on-surface-variant leading-relaxed font-medium opacity-80">{resp}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <h2 className="text-2xl font-black tracking-tight text-on-surface">Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.requirements.map((req, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">{req.title}</h3>
                      <p className="text-sm font-bold text-on-surface-variant leading-relaxed opacity-90">{req.detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-outline-variant/10">
                <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant mb-8 px-1">Job Summary</h3>
                <div className="space-y-6 mb-10">
                  {[
                    { label: 'Location', value: job.location, icon: 'location_on' },
                    { label: 'Type', value: job.type, icon: 'schedule' },
                    { label: 'Salary', value: job.salary, icon: 'payments' },
                    { label: 'Seniority', value: job.seniority, icon: 'verified' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-on-surface-variant opacity-70">
                        <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-sm font-black text-on-surface">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/seeker/apply/${id}`} className="w-full inline-block text-center py-5 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-white font-black text-lg shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                  Apply Now
                </Link>
                <div className="mt-6 text-center opacity-40">
                  <p className="text-xs font-medium">Posted 2 days ago • 142 applicants</p>
                </div>
              </div>

              <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10">
                <h4 className="text-xs font-black uppercase tracking-widest text-on-surface mb-4">About {job.company}</h4>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed font-medium opacity-80">
                  Kuantum is an AI-first talent acquisition platform helping Fortune 500 companies build world-class teams through predictive analytics and editorial curation.
                </p>
                <Link to="#" className="text-xs font-black text-primary flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                  View company profile
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default JobDetail;
