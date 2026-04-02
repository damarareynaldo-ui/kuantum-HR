import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import SeekerLayout from '../components/SeekerLayout';

const JobMarketplace = () => {
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const aiRecommendedJobs = [
    {
      id: 1,
      title: 'Senior Data Engineer',
      company: 'Fintech Nusantara',
      score: 90,
      matchReason: "Your background in building financial pipelines at Stripe makes you perfect for Nusantara's internal architectural lead for their data mesh initiative.",
      featured: true,
      color: 'from-primary to-[#0038a8]',
      icon: 'bolt',
      insightLabel: 'High Priority Fit: Senior Data Engineer',
      insightText: 'Because of your recent work with Stripe and high-velocity financial systems, you are the ideal candidate for Nusantara\'s ledger scaling project.'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Agency Kreatif',
      score: 80,
      matchReason: "Your React.js and Next.js experience is highly relevant to this scale. Your previous complex web projects demonstrate high-quality frontend skills.",
      featured: false,
      color: 'from-[#4361EE] to-[#3F37C9]',
      icon: 'code',
      insightLabel: 'Strong Talent Match: Frontend Developer',
      insightText: 'Your specialized experience in high-fidelity design implementation at Vercel aligns perfectly with Kreatif\'s "Precision First" development cycle.'
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'Kuantum Labs',
      score: 95,
      matchReason: "Exceptional match for your editorial design system experience. Your focus on tonal branding aligns with our 'Precision' philosophy.",
      featured: false,
      color: 'from-[#7209B7] to-[#560BAD]',
      icon: 'palette',
      insightLabel: 'Elite Design Fit: Product Designer',
      insightText: 'Your unique portfolio in editorial SaaS systems makes you a top 1% candidate for Kuantum\'s new visual identity roadmap.'
    },
    {
      id: 4,
      title: 'Senior Solutions Architect',
      company: 'TechFlow Systems',
      score: 85,
      matchReason: "Your background with distributed systems and enterprise infrastructure makes you a strong technical lead candidate for this scale.",
      featured: false,
      color: 'from-[#4CC9F0] to-[#4895EF]',
      icon: 'architecture',
      insightLabel: 'Infrastructure Expert: Solutions Architect',
      insightText: 'Your deep architectural knowledge of AWS and distributed microservices makes you the perfect lead for TechFlow\'s global expansion.'
    }
  ];

  const recentJobs = [
    {
      id: 101,
      title: 'Sales Manager',
      company: 'Kuantum',
      location: 'Remote',
      type: 'Full-time',
      salary: '$140k - $180k',
      description: 'Lead our global sales initiatives, defining precision-driven strategies for enterprise expansion.',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFQyvS1blstOG4JqzcsweVrLmJTm7he1DTQzVumKrPgn_H1NmdDHe0vQPLjgSUyjV22hmzLFT_m1_SECRXT5rkpOyWrVc7XZRtjrgcVaxzq_GLf4FjXPPMdmA6b52LiEMGTMu1yl7cRsbd_N8BAV40y1VzOpCk_y-I0imhJgBr8kJIlPgPRuJ7lApz7xIbJbss6l2tVDdgEnl6Xk_qRTGkLyBu8hhGlhpp8LFVg3iBzAi9K6qxxfUTQWzFFmPbcYcQx2qGWiLb4RoT',
    },
    {
      id: 102,
      title: 'Senior Software Engineer (AI)',
      company: 'Kuantum',
      location: 'New York / Hybrid',
      type: 'Full-time',
      salary: '$160k - $220k',
      hot: true,
      description: 'Scale our core inference engines. Experience with Rust and high-performance distributed systems required.',
      icon: 'code'
    },
    {
      id: 103,
      title: 'Product Designer',
      company: 'Kuantum Labs',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $170k',
      description: 'Shape the future of editorial hiring. Focus on craft, intentional asymmetry, and tonal design systems.',
      icon: 'palette'
    }
  ];

  // Logic to handle career selection and centering
  const selectJob = (index) => {
    setActiveIndex(index);
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % aiRecommendedJobs.length;
    selectJob(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + aiRecommendedJobs.length) % aiRecommendedJobs.length;
    selectJob(prevIndex);
  };

  return (
    <SeekerLayout>
      <div className="space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 italic drop-shadow-sm">Open Positions</h1>
            <p className="text-on-surface-variant text-sm max-w-lg font-medium opacity-70">
              Join Kuantum in building the next generation of precision-engineered talent solutions.
            </p>
          </div>
          <div className="flex items-center bg-surface-container-low border border-outline-variant/15 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all hover:bg-surface-container-high cursor-pointer">
            <span className="text-on-surface-variant mr-3 uppercase tracking-widest text-[10px] font-black opacity-60">Sort by:</span>
            <select className="border-none bg-transparent p-0 focus:ring-0 font-black text-on-surface text-sm cursor-pointer uppercase tracking-tighter">
              <option>Newest First</option>
              <option>Salary Range</option>
              <option>Match Score</option>
            </select>
          </div>
        </header>

        {/* AI Recommended Interactive Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h2 className="text-xl font-black text-on-surface tracking-tight italic">AI-Curated For You</h2>
              <span className="bg-primary-container/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.3em] ml-2 animate-pulse">Live Optimization</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-all active:scale-90 group shadow-sm"
              >
                <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-all active:scale-90 group shadow-sm"
              >
                <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform">chevron_right</span>
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="no-scrollbar flex gap-8 overflow-x-auto pb-12 snap-x px-[10%] xl:px-[20%]"
          >
            {aiRecommendedJobs.map((job, idx) => (
              <div 
                key={job.id} 
                ref={el => cardRefs.current[idx] = el}
                onClick={() => selectJob(idx)}
                className={`snap-center shrink-0 w-[400px] min-h-[460px] rounded-[3rem] p-10 flex flex-col justify-between transition-all duration-700 cursor-pointer relative overflow-hidden active:scale-95 group-selection
                  ${activeIndex === idx 
                    ? `bg-gradient-to-br ${job.color} text-white shadow-[0_45px_100px_-20px_rgba(37,99,235,0.4)] scale-105 z-20` 
                    : 'bg-surface-container-lowest text-on-surface shadow-xl border border-outline-variant/10 opacity-40 scale-90 hover:opacity-100 hover:scale-[0.95] z-10'
                  }`}
              >
                {/* Background Art */}
                <div className={`absolute top-0 right-0 p-12 transition-transform duration-[2000ms] pointer-events-none 
                  ${activeIndex === idx ? 'opacity-20 scale-110 rotate-12' : 'opacity-0 scale-50'}`}
                >
                  <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>{job.icon}</span>
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                       <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] backdrop-blur-md mb-4 inline-block shadow-lg
                        ${activeIndex === idx ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                        {idx === 0 ? 'Top Priority' : `Candidate Match #${idx + 1}`}
                      </span>
                      <h3 className={`text-3xl font-black leading-tight tracking-tight uppercase italic ${activeIndex === idx ? 'text-white' : 'text-on-surface'}`}>
                        {job.title}
                      </h3>
                      <p className={`text-base font-bold tracking-tight ${activeIndex === idx ? 'text-primary-fixed opacity-90' : 'text-primary'}`}>
                        {job.company}
                      </p>
                    </div>
                    
                    {/* SVG Match Progress */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90">
                        <circle 
                          className={`${activeIndex === idx ? 'text-white/10' : 'text-surface-container'}`} 
                          cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" 
                        />
                        <circle 
                          className={`${activeIndex === idx ? 'text-white' : 'text-primary'}`} 
                          cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" 
                          strokeDasharray="251.2" 
                          strokeDashoffset={251.2 * (1 - job.score / 100)}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className={`text-2xl font-black ${activeIndex === idx ? 'text-white' : 'text-on-surface'}`}>{job.score}%</span>
                        <span className={`text-[8px] font-black uppercase tracking-widest opacity-60 ${activeIndex === idx ? 'text-white' : 'text-on-surface-variant'}`}>Alignment</span>
                      </div>
                    </div>
                  </div>

                  <div className={`backdrop-blur-xl border rounded-[2rem] p-8 transition-all duration-700
                    ${activeIndex === idx ? 'bg-white/10 border-white/10 translate-y-0' : 'bg-primary-container/[0.03] border-primary/5 translate-y-4 opacity-0'}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                       <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Merit Reason</span>
                    </div>
                    <p className="text-sm leading-relaxed font-bold italic opacity-95 tracking-tight uppercase text-shadow">
                      "{job.matchReason}"
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 relative z-10 transition-all duration-700
                  ${activeIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                  <button 
                    onClick={() => navigate(`/seeker/job/${job.id}`)}
                    className={`flex-1 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] border transition-all active:scale-95
                    ${activeIndex === idx ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'hidden'}`}>
                    Details
                  </button>
                  <button 
                    onClick={() => navigate(`/seeker/apply/${job.id}`)}
                    className={`flex-1 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95
                    ${activeIndex === idx ? 'bg-white text-primary hover:scale-[1.03] shadow-white/10' : 'hidden'}`}>
                    Launch Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic AI Insight Banner (Synchronized with Carousel) */}
        <div 
          className="relative overflow-hidden bg-tertiary-fixed rounded-[4rem] p-12 shadow-2xl shadow-tertiary/20 border border-tertiary-fixed-dim/20 transition-all duration-700 group"
          key={activeIndex} // Force re-render for animation
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-[2000ms]">
            <span className="material-symbols-outlined text-[160px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-inner border border-white/30 rotate-3 group-hover:rotate-0 transition-transform duration-[1000ms]">
              <span className="material-symbols-outlined text-6xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <div className="text-center lg:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <span className="bg-tertiary-container text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.4em] shadow-2xl shadow-tertiary/30">AI Insight Match</span>
                <h4 className="font-black text-on-tertiary-fixed text-4xl italic tracking-tighter uppercase leading-none">
                  {aiRecommendedJobs[activeIndex].insightLabel}
                </h4>
              </div>
              <p className="text-on-tertiary-fixed-variant text-lg leading-relaxed max-w-4xl font-black opacity-80 tracking-tighter uppercase italic text-shadow">
                {aiRecommendedJobs[activeIndex].insightText}
              </p>
            </div>
            <div className="lg:ml-auto">
               <button 
                onClick={() => navigate(`/seeker/apply/${aiRecommendedJobs[activeIndex].id}`)}
                className="bg-on-surface text-surface px-12 py-6 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all whitespace-nowrap"
              >
                Fast-Track Prep
              </button>
            </div>
          </div>
        </div>

        {/* Global Recent Opportunities List */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-on-surface tracking-tight italic uppercase tracking-widest">Recent Opportunities</h2>
            <div className="h-0.5 flex-1 bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
          </div>
          
          <div className="grid gap-6">
            {recentJobs.map((job) => (
              <div key={job.id} className="group bg-surface-container-lowest p-12 rounded-[3.5rem] transition-all hover:bg-surface-bright flex flex-col xl:flex-row xl:items-center justify-between gap-10 border border-outline-variant/10 shadow-sm hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.06)] relative overflow-hidden active:scale-[0.99]">
                <div className="flex items-start gap-10">
                  <div className={`w-24 h-24 rounded-[2rem] ${job.logo ? 'bg-surface-container' : 'bg-primary/5'} flex items-center justify-center shrink-0 border border-outline-variant/10 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    {job.logo ? (
                      <img src={job.logo} alt={job.title} className="w-14 h-14 object-contain" />
                    ) : (
                      <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>{job.icon}</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-on-surface group-hover:text-primary transition-colors tracking-tighter italic uppercase">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                      <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-sm">{job.location}</span>
                      <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-sm">{job.type}</span>
                      {job.hot && (
                        <span className="bg-primary text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-2xl shadow-primary/20 animate-pulse">Hot Opportunity</span>
                      )}
                      <span className="text-on-surface-variant text-base flex items-center gap-2 font-black italic opacity-60 ml-3 uppercase tracking-tighter">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                        {job.salary}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-lg max-w-3xl leading-relaxed font-bold opacity-60 tracking-tight uppercase italic">
                      {job.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => navigate(`/seeker/job/${job.id}`)}
                    className="px-10 py-5 text-xs font-black text-on-surface-variant hover:text-primary transition-all uppercase tracking-[0.2em] hover:scale-105 active:scale-95"
                  >
                    Role Specs
                  </button>
                  <button 
                    onClick={() => navigate(`/seeker/apply/${job.id}`)}
                    className="bg-on-surface text-surface px-12 py-6 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SeekerLayout>
  );
};

export default JobMarketplace;
