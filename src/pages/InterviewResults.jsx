import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const InterviewResults = () => {
  const navigate = useNavigate();
  
  const transcript = [
    { role: 'AI', name: 'Kuantum Interviewer', time: '10:02 AM', text: "Good morning, Alex. To start, could you walk me through a complex design system challenge you've solved recently, specifically regarding cross-functional handoff?" },
    { role: 'Candidate', name: 'Alex Rivera', time: '10:03 AM', text: "That's a great question. At my last role, we were moving from a monolithic design file to a federated library system. The biggest hurdle wasn't the components themselves, but the documentation parity between Figma and our React storybook. I implemented a 'Tokens-First' workflow that synced directly via GitHub Actions.", user: true },
    { role: 'AI', name: 'Kuantum Interviewer', time: '10:05 AM', text: "Interesting approach. How did you handle the friction from engineers who were resistant to changing their established local styling workflow?" },
    { role: 'Candidate', name: 'Alex Rivera', time: '10:06 AM', text: "I focused on highlighting the 'WIIFM'—What's In It For Them. By showing them how the automation reduced their PR revision time by nearly 40%, the resistance turned into advocacy. We ran a series of brown-bag lunches to demo the time savings.", user: true }
  ];

  const scores = [
    { label: 'Communication', score: 8, offset: 35.2 },
    { label: 'Technical', score: 7, offset: 52.8 },
    { label: 'Problem Solving', score: 6, offset: 70.4 },
    { label: 'Culture Fit', score: 8, offset: 35.2 }
  ];

  return (
    <Layout>
      <div className="h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Page Header */}
        <header className="flex items-center justify-between px-2">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-dim transition-all active:scale-95">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="h-10 w-px bg-outline-variant/20"></div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-on-surface leading-none">Interview Results: Senior Product Designer</h1>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mt-1 opacity-60">Candidate ID: #UX-88291 • Alex Rivera</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-3 text-on-surface-variant hover:text-primary transition-colors">
               <span className="material-symbols-outlined">notifications</span>
             </button>
             <button className="p-3 text-on-surface-variant hover:text-primary transition-colors">
               <span className="material-symbols-outlined">settings</span>
             </button>
             <img 
               className="w-10 h-10 rounded-full border-2 border-primary/20" 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF2ekXqzVc7K9LaLjgjvGcgrcUCCN5ZrSHAnXENh67sTMGcOZf6qlwdFgys2G3KiXgzuiluY4SohQo8UoXJbqcAldidk-dDU1_iKdbxC6VnQaZebtXbhkiDzThfe4aVKTFURr5GVLsEIkxwAXx7XAGnA9N44CANxIZccCDfAcC38WEPfUhQ58_iKJgh4-FKQZbqSODaxg1gUXAyQRNhkk5Ft9vhdRDsug5TweIzgYAcGDlQUW6QiP7zVHcpCcTEr6OekUX5vI8x66s" 
               alt="Recruiter" 
             />
          </div>
        </header>

        {/* Split Layout */}
        <div className="flex-1 flex overflow-hidden gap-8">
          {/* LEFT: Transcript Section */}
          <section className="flex-1 flex flex-col bg-surface-container-low rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-sm">
            <div className="p-6 bg-surface-container-lowest flex items-center justify-between border-b border-outline-variant/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                   <span className="material-symbols-outlined text-xl">forum</span>
                </div>
                <h3 className="font-black text-on-surface tracking-tight uppercase tracking-widest text-[12px]">Interview Transcript</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] px-3 py-1 bg-secondary/10 text-secondary rounded-full font-black tracking-widest uppercase animate-pulse">Live Recording</span>
                <button className="material-symbols-outlined text-outline opacity-40 hover:opacity-100 transition-opacity">more_vert</button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar font-sans">
              {transcript.map((chat, idx) => (
                <div key={idx} className="flex gap-6 max-w-3xl">
                  {chat.user ? (
                    <div className="w-10 h-10 shrink-0 rounded-2xl bg-primary/10 overflow-hidden ring-2 ring-white">
                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD-YVGzCUYiD4-rcRFlWyFzrSbBCxuLFUwhsdlCBFcttNXY0ipih5arR7VVu3QVvnldo67Xys6SCmA9fLEDtsvFmSH5HOmdo1espnZJP4ornEV9aXF9c5qCyaBTVI2nwKzvSYUuqccMCV2xX_myIu_6v-NWf6bwYnkO9ONTEVXiEyV0mER3Nhm9I0qVt_Qx2tbJcaqXpcSLEaaSemLG1_PLOkJQcvCKJ1v78VVP4XjUg-tOpUDkp5PZL3X5UtAdwHfRUkXl-pgvXBx" alt="Candidate" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 shrink-0 rounded-2xl bg-surface-container-highest flex items-center justify-center text-[10px] font-black text-on-surface-variant shadow-sm ring-2 ring-white uppercase">AI</div>
                  )}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className={`text-[12px] font-black uppercase tracking-widest ${chat.user ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>{chat.name}</span>
                      <span className="text-[10px] text-on-surface-variant opacity-40 font-bold">{chat.time}</span>
                    </div>
                    <div className={`p-6 rounded-[1.8rem] text-sm leading-relaxed shadow-sm border border-outline-variant/5 ${chat.user ? 'bg-white text-on-surface' : 'bg-transparent text-on-surface-variant italic'}`}>
                      {chat.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: Analysis Panel */}
          <section className="w-[440px] flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-2">
            {/* Score Breakdown */}
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant mb-10 flex items-center gap-3">
                 <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                 Score Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {scores.map((s, i) => (
                  <div key={i} className="flex flex-col items-center p-6 rounded-3xl bg-surface-container-low border border-outline-variant/5 group hover:bg-white transition-all hover:shadow-xl hover:shadow-on-surface/5">
                    <div className="relative flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle className="text-surface-container" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeWidth="4" />
                        <circle className="text-primary transition-all duration-1000" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeDasharray="226" strokeDashoffset={226 - (s.score / 10 * 226)} strokeWidth="4" />
                      </svg>
                      <span className="absolute text-base font-black text-on-surface">{s.score}/10</span>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 text-center leading-tight h-8">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="bg-tertiary-fixed p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-tertiary/10">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 translate-x-1/4 -translate-y-1/4 transition-all duration-700">
                 <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-on-tertiary-fixed-variant mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                 AI Evaluation Insight
              </h3>
              <p className="text-sm text-on-tertiary-fixed-variant leading-relaxed font-medium">
                Candidate demonstrates strong empathy-driven design logic and deep technical proficiency in modern handoff workflows. High scores in communication suggest a strong potential for cross-functional leadership.
              </p>
            </div>

            {/* Asymmetric Bento: Strengths & Weaknesses */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-primary shadow-sm">
                <h4 className="text-[11px] font-black text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">thumb_up</span>
                  Key Strengths
                </h4>
                <ul className="space-y-4">
                  {['Systematic design thinking', 'Articulate communication', 'Strong technical bridge'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                       <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border-l-8 border-error shadow-sm">
                <h4 className="text-[11px] font-black text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-lg">priority_high</span>
                  Growth Areas
                </h4>
                <ul className="space-y-4">
                  {[ 'Hesitation on scaling ops', 'Limited KPI exposure'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                       <span className="material-symbols-outlined text-error text-[16px]">cancel</span>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Final Decision & Decision Bar */}
            <div className="mt-4 space-y-6">
              <div className="w-full bg-[#10b981] text-white p-10 rounded-[2.8rem] flex flex-col items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 transform hover:scale-[1.02] transition-all cursor-default relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                 <div className="space-y-1 text-center">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80">Machine Recommendation</span>
                    <h2 className="text-2xl font-black leading-none tracking-tighter">RECOMMENDED FOR HIRE</h2>
                 </div>
              </div>
              
              <div className="flex gap-4">
                 <button 
                   onClick={() => navigate('/candidates')}
                   className="flex-1 py-5 rounded-[1.8rem] bg-surface-container-low text-on-surface-variant font-black text-[10px] uppercase tracking-[0.2em] hover:bg-surface-dim transition-all active:scale-95"
                 >
                   Archive
                 </button>
                 <Link 
                   to="/invite"
                   className="flex-[2] py-5 rounded-[1.8rem] bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                 >
                   Schedule Next Round
                   <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                 </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewResults;
