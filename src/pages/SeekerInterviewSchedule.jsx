import React from 'react';
import { useNavigate } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';

const SeekerInterviewSchedule = () => {
  const navigate = useNavigate();

  const secondaryInterviews = [
    {
      id: '2',
      title: 'Senior Account Executive',
      status: 'Ready to start',
      icon: 'corporate_fare',
      expiry: '3 days'
    },
    {
      id: '3',
      title: 'Channel Partnership Lead',
      status: 'Ready to start',
      icon: 'hub',
      expiry: '3 days'
    }
  ];

  return (
    <SeekerLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2 italic drop-shadow-sm">Interview Schedule</h2>
            <div className="flex items-center gap-2">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">3 UPCOMING</span>
              <span className="text-on-surface-variant text-sm font-medium opacity-80">AI-led interviews • Conduct yours whenever you're ready</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface rounded-xl font-bold hover:bg-surface-container-high transition-all shadow-sm active:scale-95">
              <span className="material-symbols-outlined text-lg">sync</span>
              Sync Calendar
            </button>
          </div>
        </header>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main Schedule Column */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Featured Interview Card (Priority Match) */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-tertiary-fixed p-10 flex flex-col justify-between min-h-[360px] shadow-2xl border border-white/20 group">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[240px] absolute -right-12 -top-12 rotate-12 group-hover:rotate-45 transition-transform duration-1000">stars</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="bg-tertiary text-on-tertiary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-tertiary/20">High Priority Match</span>
                  <span className="text-on-tertiary-fixed-variant font-bold text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    98% AI Alignment
                  </span>
                </div>
                <h3 
                  onClick={() => navigate('/seeker/job/1')}
                  className="text-4xl font-black text-on-tertiary-fixed mb-2 tracking-tight leading-none cursor-pointer hover:underline underline-offset-8 transition-all"
                >
                  Sales Manager at Kuantum
                </h3>
                <p className="text-on-tertiary-fixed-variant opacity-80 text-xl font-medium max-w-lg leading-relaxed">
                  Final round briefing for the Global Sales Team expansion initiative.
                </p>
              </div>

              <div className="relative z-10 bg-white/40 backdrop-blur-2xl p-8 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/30 shadow-inner">
                <div className="flex gap-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.2em] mb-1.5">Availability</span>
                    <span className="text-xl font-black text-on-surface leading-none">Available Now</span>
                    <span className="text-[10px] font-black text-tertiary uppercase mt-1.5 tracking-widest text-shadow">Link expires in 3 days</span>
                  </div>
                  <div className="flex flex-col border-l border-outline-variant/30 pl-12">
                    <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.2em] mb-1.5">Duration</span>
                    <span className="text-xl font-black text-on-surface leading-none tracking-tighter">45 mins</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/seeker/interview/prepare/1')}
                  className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-primary/30"
                >
                  Start Interview Now 
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Secondary Interviews List */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-on-surface-variant/70 uppercase tracking-[0.3em] px-4">Upcoming Interactions</h4>
              
              {secondaryInterviews.map((item, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-8 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6 group hover:bg-surface-bright transition-all cursor-pointer shadow-sm border border-outline-variant/10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-surface-container flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                      <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                    </div>
                    <div 
                      onClick={() => navigate(`/seeker/job/${item.id}`)}
                      className="cursor-pointer group/title"
                    >
                      <h5 className="text-2xl font-black text-on-surface mb-1 tracking-tight group-hover/title:text-primary transition-all underline-offset-4 group-hover/title:underline">{item.title}</h5>
                      <div className="flex items-center gap-4 text-on-surface-variant text-sm font-bold">
                        <span className="flex items-center gap-1.5 opacity-70">
                          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> 
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex flex-col items-end gap-1.5 flex-1 sm:flex-initial pr-2">
                       <span className="text-[10px] font-black text-on-surface-variant/50 flex items-center gap-1.5 uppercase tracking-widest whitespace-nowrap">
                        <span className="material-symbols-outlined text-sm">schedule</span> 
                        Link expires in {item.expiry}
                      </span>
                    </div>
                    <button 
                      onClick={() => navigate(`/seeker/interview/prepare/${item.id}`)}
                      className="px-8 py-3.5 bg-surface-container-low text-on-surface rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      Start Interview
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Content Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Preparation Hub Card */}
            <div className="bg-surface-container-low p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <h4 className="text-2xl font-black text-on-surface mb-8 tracking-tight italic">Preparation Hub</h4>
              <div className="space-y-4">
                <div className="p-5 bg-surface-container-lowest rounded-2xl flex items-center gap-5 border-l-4 border-primary group hover:translate-x-1 transition-transform cursor-pointer shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">description</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-on-surface">Interview Briefing.pdf</p>
                    <p className="text-[10px] text-on-surface-variant/50 uppercase font-bold tracking-wider mt-0.5">Read 2 days ago</p>
                  </div>
                </div>
                <div className="p-5 bg-surface-container-lowest rounded-2xl flex items-center gap-5 border-l-4 border-tertiary group hover:translate-x-1 transition-transform cursor-pointer shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-2xl">video_library</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-on-surface">Role Overview Video</p>
                    <p className="text-[10px] text-on-surface-variant/50 uppercase font-bold tracking-wider mt-0.5">Not started</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-10 p-5 bg-on-surface text-surface rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-black/10 active:scale-95">
                Go to Preparation Center
              </button>
            </div>

            {/* AI Pro-Tip */}
            <div className="relative overflow-hidden p-10 rounded-[2.5rem] bg-primary-container text-white shadow-2xl shadow-primary/20">
              <div className="absolute -bottom-10 -right-10 opacity-20 pointer-events-none">
                <span className="material-symbols-outlined text-[160px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <h5 className="text-xl font-black mb-4 tracking-tight drop-shadow-md">AI Pro-Tip</h5>
              <p className="text-sm leading-relaxed font-bold opacity-90 tracking-tight">
                Since this is an AI-led interview, you can take it at any time. Find a quiet space and test your audio before you begin. You have <span className="underline decoration-2">3 days</span> to complete the session.
              </p>
            </div>

            {/* Empty State Suggestion */}
            <div className="p-10 border-2 border-dashed border-outline-variant/30 rounded-[2.5rem] text-center bg-surface-container-low/30">
              <span className="material-symbols-outlined text-5xl text-outline-variant/50 mb-4" style={{ fontVariationSettings: "'wght' 300" }}>search_off</span>
              <p className="text-on-surface-variant/70 font-bold mb-6 text-sm">No other scheduled interviews yet.</p>
              <button 
                onClick={() => navigate('/seeker/marketplace')}
                className="text-primary font-black text-xs uppercase tracking-widest hover:underline flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all"
              >
                Browse Jobs
                <span className="material-symbols-outlined text-base">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerInterviewSchedule;
