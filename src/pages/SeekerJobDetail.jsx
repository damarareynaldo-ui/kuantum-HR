import React from 'react';
import { useParams, useNavigate } from 'react-router';
import SeekerLayout from '../components/SeekerLayout';

const SeekerJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const jobDetails = {
    1: { 
      title: 'Senior Data Engineer', 
      company: 'Fintech Nusantara',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpPSPRgEp6ZrJTAn4rcddxxLmrG2gDUP42BwovyzNfrTTti5Y_VR3-_WrYCDhvf6gu8BrpntnTppQdMwoqWfZZTFL4TPKSlIA-TxsYLV35JMnxqAYOcMVQxtBuAU2Cuz2v1cBtGRjoTxJ6aqjFSqBzAlxtkjNsrNlPAU3P4y14hXYJ1rioSR9y3Mx2p48fXkd3W-qy6F50qBf4-7KgWo52msgzbV5PeLJ93v2l6AYm6zh_WcibitfCJ8BEoa5aw4jqt46I4J3fhzsc',
      matchScore: '94%',
      insight: "Based on your experience at **Stripe** and your background in **B2B SaaS scalability**, you are in the top 2% of candidates for this role. Nusantara is specifically looking for data leaders who have managed ledger-based transitions.",
      description: "Fintech Nusantara is seeking a Senior Data Engineer to architect our next-gen financial ledger system. You will lead the data strategy for high-throughput transactional pipelines.",
      requirements: [
        { label: 'Experience', value: '6+ years in distributed systems with deep expertise in Apache Spark and Kafka.' },
        { label: 'Cloud Native', value: 'Strong background in AWS/Azure infrastructure and Kubernetes orchestration.' },
        { label: 'Data Integrity', value: 'Obsessive focus on data consistency and idempotent pipeline design.' },
        { label: 'Leadership', value: 'Experience mentoring mid-level engineers and defining architectural standards.' }
      ],
      responsibilities: [
        "Design and implement high-availability data pipelines for Nusantara's core ledger.",
        "Collaborate with Fintech product leads to define data mesh requirements.",
        "Ensure SOC2 compliance across all financial data transformations.",
        "Optimize query performance for real-time risk assessment engines."
      ],
      metadata: { location: 'Jakarta / Remote', type: 'Full-time', salary: 'Competitive', seniority: 'Senior' }
    },
    2: { 
        title: 'Frontend Developer', 
        company: 'Digital Agency Kreatif',
        matchScore: '85%',
        insight: "Your specialized experience in high-fidelity design implementation at Vercel makes you a strong visual-first contributor for Kreatif's luxury client accounts.",
        description: "We are looking for a creative Frontend Developer who treats code as craft. You will build high-impact digital experiences for global luxury brands.",
        requirements: [
            { label: 'Technical', value: 'Mastery of React, Next.js, and complex CSS/Tailwind animations.' },
            { label: 'Design Eye', value: 'Ability to translate Figma prototypes into pixel-perfect, liquid transitions.' }
        ],
        responsibilities: [
            "Develop fluid, motion-rich user interfaces for creative campaigns.",
            "Maintain our internal 'Precision' UI library."
        ],
        metadata: { location: 'Remote', type: 'Full-time', salary: '$120k - $140k', seniority: 'Mid-Senior' }
    }
  };

  const currentJob = jobDetails[id] || jobDetails[1];

  return (
    <SeekerLayout>
      <div className="max-w-7xl mx-auto w-full py-8">
        {/* Breadcrumb */}
        <div 
          onClick={() => navigate(-1)}
          className="mb-10 flex items-center gap-3 text-on-surface-variant cursor-pointer hover:text-primary transition-all group"
        >
          <span className="material-symbols-outlined text-sm font-black group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Marketplace</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Role Evaluation */}
          <div className="flex-grow space-y-16">
            {/* Header */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="flex items-start gap-8">
                <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center shadow-2xl shadow-black/5 border border-outline-variant/10 shrink-0">
                  <img src={currentJob.logo} alt={currentJob.company} className="w-14 h-14 object-contain" />
                </div>
                <div className="space-y-3">
                  <h1 className="text-5xl font-black text-on-surface tracking-tighter italic uppercase leading-none">{currentJob.title}</h1>
                  <p className="text-2xl text-primary font-black tracking-tight uppercase italic">{currentJob.company}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="w-14 h-14 rounded-2xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all active:scale-90 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>share</span>
                </button>
                <button className="w-14 h-14 rounded-2xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all active:scale-90 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>bookmark_border</span>
                </button>
              </div>
            </section>

            {/* AI Match Banner */}
            <div className="bg-tertiary-fixed rounded-[3rem] p-10 relative overflow-hidden shadow-[0_45px_100px_-20px_rgba(249,115,22,0.2)] border border-tertiary-fixed-dim/20 group">
               <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]">
                <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="relative z-10 flex items-start gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="w-16 h-16 rounded-3xl bg-white/40 backdrop-blur-3xl flex items-center justify-center text-tertiary shrink-0 border border-white/40 shadow-xl">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                    <span className="bg-tertiary text-on-tertiary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-tertiary/20">AI Match Insight</span>
                    <span className="text-on-tertiary-fixed font-black text-lg underline decoration-4 decoration-tertiary/10">Top {id === '1' ? '2%' : '8%'} Alignment</span>
                   </div>
                   <p className="text-on-tertiary-fixed-variant text-lg font-bold leading-relaxed tracking-tighter uppercase italic opacity-95">
                    {currentJob.insight}
                   </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-16">
              <section className="space-y-6">
                <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">About the Role</h2>
                <div className="h-0.5 w-20 bg-primary/20"></div>
                <p className="text-xl text-on-surface-variant leading-relaxed font-bold tracking-tighter uppercase opacity-70 italic max-w-4xl">
                   {currentJob.description}
                </p>
              </section>

              <section className="space-y-8">
                <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">Responsibilities</h2>
                <div className="grid gap-4">
                  {currentJob.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-6 group">
                      <div className="mt-4 w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="text-lg text-on-surface-variant leading-relaxed font-black tracking-tighter uppercase italic opacity-60 group-hover:opacity-100 transition-opacity">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-10">
                <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">Candidate Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentJob.requirements.map((req, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 hover:bg-surface-bright transition-all group">
                      <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 opacity-60 group-hover:opacity-100">{req.label}</h3>
                      <p className="text-base text-on-surface-variant font-bold leading-relaxed tracking-tighter uppercase italic">
                        {req.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <aside className="lg:w-[400px] shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="bg-surface-container-lowest p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-outline-variant/10 space-y-10">
                <div>
                   <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-on-surface-variant/50 mb-8">Job Summary</h3>
                   <div className="space-y-6">
                     {[
                        { icon: 'location_on', label: 'Location', value: currentJob.metadata.location },
                        { icon: 'schedule', label: 'Work Type', value: currentJob.metadata.type },
                        { icon: 'payments', label: 'Salary', value: currentJob.metadata.salary },
                        { icon: 'verified', label: 'Seniority', value: currentJob.metadata.seniority }
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4 text-on-surface-variant">
                             <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</span>
                          </div>
                          <span className="text-sm font-black text-on-surface uppercase tracking-tight italic">{item.value}</span>
                        </div>
                     ))}
                   </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => navigate(`/seeker/apply/${id}`)}
                    className="w-full py-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-[2rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] hover:scale-[1.03] active:scale-95 transition-all text-shadow"
                  >
                    Apply Now
                  </button>
                  <div className="pt-6 border-t border-outline-variant/10 text-center">
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.2em] opacity-50 italic">Posted 2 days ago • 142 applicants</p>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant/10 space-y-6">
                <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-60">About {currentJob.company}</h4>
                <p className="text-sm leading-relaxed text-on-surface font-bold tracking-tighter uppercase italic opacity-80">
                  {currentJob.company} is an industry leader in enterprise solutions, helping Fortune 500 companies build resilient systems through precision engineering.
                </p>
                <button className="text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:gap-4 transition-all active:scale-95">
                  View company profile
                  <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerJobDetail;
