import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface selection:bg-primary/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white font-black text-xl">K</div>
            <span className="text-2xl font-black tracking-tighter text-on-background">Kuantum AI</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors tracking-tight">Features</a>
            <a href="#about" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors tracking-tight">About</a>
            <a href="#pricing" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors tracking-tight">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors px-4 py-2">Log In</Link>
            <Link to="/dashboard" className="px-6 py-2.5 signature-gradient text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Introducing the Match Insight 2.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-on-surface leading-[1] mb-8">
            Hire with <br />
            <span className="text-primary signature-gradient bg-clip-text text-transparent">Surgical</span> precision.
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-on-surface-variant font-medium leading-relaxed mb-12">
            The curator's workspace for high-stakes talent acquisition. Experience AI-powered curation that transcends generic dashboards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 signature-gradient text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all text-lg">
              Launch Dashboard
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-on-surface font-bold rounded-2xl shadow-xl hover:bg-surface-bright transition-all text-lg border border-outline-variant/10">
              Book a Demo
            </button>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[140px]"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
