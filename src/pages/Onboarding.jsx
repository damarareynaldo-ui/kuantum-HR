import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Onboarding = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2"></div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl w-full bg-surface-container-lowest rounded-[3.5rem] shadow-2xl border border-outline-variant/10 overflow-hidden relative"
        >
            <div className="grid grid-cols-12 h-[700px]">
                {/* Left Side: Illustration / Brand */}
                <div className="col-span-12 lg:col-span-5 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="flex items-center gap-4 relative">
                        <div className="w-12 h-12 signature-gradient rounded-2xl flex items-center justify-center font-black text-2xl">K</div>
                        <h2 className="text-xl font-extrabold tracking-tight">Kuantum</h2>
                    </div>

                    <div className="space-y-6 relative">
                        <h3 className="text-4xl font-bold leading-tight">Elevate Your Hiring Intelligence.</h3>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Welcome to the future of talent acquisition. Our AI agents curate the world's best talent while you focus on building great teams.
                        </p>
                    </div>

                    <div className="flex gap-2 relative">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1.5 rounded-full ${i === 1 ? 'w-8 bg-primary' : 'w-4 bg-slate-700'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Step Content */}
                <div className="col-span-12 lg:col-span-7 p-12 lg:p-16 flex flex-col justify-center">
                    <div className="space-y-10">
                        <div className="space-y-3">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 01 / 03</p>
                            <h4 className="text-3xl font-extrabold text-on-surface tracking-tight">Personalize Your Workspace</h4>
                            <p className="text-on-surface-variant font-medium">Tell us a bit about your role and organization.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-outline ml-1">Full Name</label>
                                <input 
                                    className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all" 
                                    placeholder="Sarah Morrison" 
                                    type="text" 
                                />
                            </div>
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-outline ml-1">Role / Job Title</label>
                                <input 
                                    className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all" 
                                    placeholder="Head of Talent Acquisition" 
                                    type="text" 
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-outline ml-1">Preferred Industry</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Engineering', 'Design', 'Product', 'Marketing', 'Sales'].map(tag => (
                                        <button key={tag} className="px-5 py-3 rounded-2xl bg-surface-container-low hover:bg-primary/10 hover:text-primary border border-outline-variant/10 text-xs font-bold transition-all">
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-between items-center">
                            <button className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Skip for now</button>
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="px-10 py-4 signature-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95 transition-all group"
                            >
                                <span>Continue</span>
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default Onboarding;
