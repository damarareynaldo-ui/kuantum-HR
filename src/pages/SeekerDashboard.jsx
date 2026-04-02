import React from 'react';
import SeekerLayout from '../components/SeekerLayout';

const SeekerDashboard = () => {
  const applications = [
    {
      title: 'Sales Manager',
      team: 'Global Sales Team',
      company: 'Kuantum',
      status: 'Invited',
      date: 'Oct 24, 2023',
      icon: 'corporate_fare',
      primary: true
    },
    {
      title: 'Technical Product Lead',
      team: 'Logistics Core',
      company: 'Velocity AI',
      status: 'Reviewing',
      date: 'Oct 20, 2023',
      icon: 'blur_on'
    },
    {
      title: 'Customer Success Dir.',
      team: 'Enterprise Solutions',
      company: 'Nexo Systems',
      status: 'Reviewing',
      date: 'Oct 15, 2023',
      icon: 'token'
    }
  ];

  return (
    <SeekerLayout>
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">My Applications</h1>
          <p className="text-on-surface-variant text-base">Welcome back, <span className="font-semibold text-on-surface">Alex Rivers</span>. Tracking your high-precision career matches.</p>
        </header>

        {/* Application Table */}
        <div className="bg-surface-container-low rounded-[2rem] overflow-hidden p-1 shadow-sm border border-outline-variant/10">
          <div className="bg-surface-container-lowest rounded-[1.8rem] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Job Title</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Company</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {applications.map((app, i) => (
                  <tr key={i} className="group transition-colors hover:bg-surface-container-low/30">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-on-surface">{app.title}</span>
                        <span className="text-xs text-on-surface-variant font-medium opacity-70">{app.team}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-outline text-xl">{app.icon}</span>
                        </div>
                        <span className="text-sm font-bold text-on-surface">{app.company}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${app.status === 'Invited' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {app.primary ? (
                        <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                          Start Interview
                        </button>
                      ) : (
                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Match Insight */}
        <div className="mt-10 relative overflow-hidden rounded-[2rem] bg-tertiary-fixed p-8 flex flex-col md:flex-row gap-8 items-center shadow-xl border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
          <div className="z-10 flex-shrink-0 bg-white/30 backdrop-blur-md rounded-2xl p-4">
            <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div className="z-10 flex-1">
            <h3 className="text-xl font-black text-on-tertiary-fixed mb-2">Precision Match: Sales Manager at Kuantum</h3>
            <p className="text-on-tertiary-fixed-variant text-base leading-relaxed max-w-2xl font-medium">
              Our AI curator identifies a <span className="font-black underline decoration-4 underline-offset-4">94% match</span> based on your recent success at CloudScale. Your experience in vertical SaaS sales directly aligns with Kuantum's expansion goals for Q4.
            </p>
          </div>
          <div className="z-10">
            <button className="px-8 py-4 bg-on-tertiary-fixed text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/10 hover:opacity-90 transition-all">
              Review Insight
            </button>
          </div>
        </div>

        {/* Timeline & Next Steps */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/10">
            <h2 className="text-2xl font-black mb-8 text-on-surface tracking-tight">Application Timeline</h2>
            <div className="space-y-10">
              <div className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary z-10 ring-4 ring-primary/20"></div>
                  <div className="w-0.5 h-full bg-outline-variant/30 absolute top-4"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-base font-black text-on-surface">Interview Invitation Received</h4>
                  <p className="text-sm text-on-surface-variant font-medium opacity-70">Today, 09:45 AM • Kuantum Recruiting</p>
                </div>
              </div>
              <div className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-outline-variant z-10"></div>
                  <div className="w-0.5 h-full bg-outline-variant/30 absolute top-4"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-base font-black text-on-surface opacity-70">Application Submitted</h4>
                  <p className="text-sm text-on-surface-variant font-medium opacity-50">Oct 24, 2023 • Applied via Precision Curator</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-outline-variant z-10"></div>
                </div>
                <div className="pb-2">
                  <h4 className="text-base font-black text-on-surface opacity-70">Profile Matches Job Requirements</h4>
                  <p className="text-sm text-on-surface-variant font-medium opacity-50">Oct 24, 2023 • AI Scoring: 94/100</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-highest rounded-[2rem] p-10 flex flex-col justify-between border border-outline-variant/10 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 text-on-surface tracking-tight">Next Step</h2>
              <p className="text-base text-on-surface-variant leading-relaxed font-medium opacity-80">Prepare for your initial screening with Kuantum. Focus on your enterprise sales methodology and GTM strategy.</p>
            </div>
            <div className="mt-8 relative z-10">
              <img 
                alt="Interview Preparation" 
                className="w-full h-40 object-cover rounded-2xl mb-6 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl" 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
              />
              <button className="w-full text-primary text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 group hover:gap-4 transition-all">
                View Interview Guide 
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerDashboard;
