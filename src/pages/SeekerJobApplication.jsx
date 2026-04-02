import React from 'react';
import { useParams, useNavigate } from 'react-router';
import SeekerLayout from '../components/SeekerLayout';

const SeekerJobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Mock successful submission
    alert('Application Submitted Successfully!');
    navigate('/seeker/dashboard');
  };

  const jobDetails = {
    1: { title: 'Senior Data Engineer', company: 'Fintech Nusantara' },
    2: { title: 'Frontend Developer', company: 'Digital Agency Kreatif' },
    3: { title: 'Product Designer', company: 'Kuantum Labs' },
    4: { title: 'Senior Solutions Architect', company: 'TechFlow Systems' },
    101: { title: 'Sales Manager', company: 'Kuantum' }
  };

  const currentJob = jobDetails[id] || { title: 'Sales Manager', company: 'Kuantum' };

  return (
    <SeekerLayout>
      <div className="max-w-4xl mx-auto w-full py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2 italic uppercase">
            {currentJob.title} at {currentJob.company}
          </h1>
          <p className="text-on-surface-variant font-bold opacity-60 uppercase tracking-[0.2em] text-[10px]">
            Step 3 of 3: Final Review & Submission
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-16 relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-surface-container-high -z-0"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm font-black">check</span>
              </div>
              <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">Contact</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm font-black">check</span>
              </div>
              <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">Resume</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                <span className="text-sm font-black">3</span>
              </div>
              <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">Preview</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-8">
            {/* Candidate Profile Card */}
            <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-start justify-between mb-10">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner border border-outline-variant/10 group-hover:rotate-3 transition-transform">
                    <img 
                      alt="Candidate Portrait" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_dtgUvPERoUZaRrcX5yMLSfE7aVs6Kn4C0pFM4fF7M_4guvd1vjqy69MeD4d0DSwVElTNwLFjetzcqyZxgGqVljAKsvL7VeQ1jyV4rt6X_3SJGNAp25WS3Dh6Yzw1GAyCR_hV7RZv6YZ9PMMKACB13Fu1MDDsxaMc5mGi3ANWpW9ZYMi0qEqKOqkWS8Caz_naTX9u6HBKWJrGtHwt4FYeHUeRQ3W2e8ACJLFWe6kJkOd4twbsoJAGozTYboirJRgF0ydBxaWVgAz0"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-on-surface tracking-tight uppercase italic">Andi Pratama</h2>
                    <p className="text-sm font-bold text-primary opacity-80 uppercase tracking-tighter">Senior Sales Strategist</p>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[10px] font-black text-on-surface-variant flex items-center gap-2 uppercase tracking-widest opacity-60">
                         <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span> andi@example.com
                       </span>
                    </div>
                  </div>
                </div>
                <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline active:scale-95 transition-all">Edit Info</button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black tracking-[0.25em] text-on-surface-variant uppercase mb-4 opacity-70">Professional Experience</h3>
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
                    <p className="text-sm leading-relaxed text-on-surface font-bold italic opacity-80 tracking-tight uppercase">
                      Proven sales leader with over 8 years of experience in driving revenue growth across Southeast Asian markets. Expert in building high-performing teams and implementing CRM frameworks that increased conversion rates by 40% in previous roles. Focused on data-driven decision making and strategic partnership development.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black tracking-[0.25em] text-on-surface-variant uppercase mb-4 opacity-70">AI-Parsed Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Sales Management', 'CRM', 'Team Leadership', 'Strategic Planning', 'Enterprise Sales'].map((skill, idx) => (
                      <span key={skill} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border 
                        ${idx < 3 ? 'bg-primary/5 border-primary/10 text-primary' : 'bg-surface-container-high border-outline-variant/10 text-on-surface-variant'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Precision Match Insight Banner */}
            <div className="bg-tertiary-fixed rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl shadow-tertiary/10 border border-tertiary-fixed-dim/20 group hover:scale-[1.01] transition-all">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="relative z-10 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-tertiary flex-shrink-0 shadow-xl border border-white/50">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-on-tertiary-fixed text-sm uppercase tracking-[0.2em] italic">Precision Match Insight</h4>
                  <p className="text-sm text-on-tertiary-fixed-variant font-bold leading-relaxed tracking-tighter uppercase opacity-90 italic">
                    Our AI curation system identifies a <span className="text-on-tertiary-fixed font-black underline decoration-2 decoration-tertiary/10">94% fit</span> for this role. Andi's background in Southeast Asian market scaling directly addresses Kuantum's Q3 growth objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            {/* Asset Sidebar */}
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <h3 className="text-[10px] font-black text-on-surface mb-6 uppercase tracking-[0.2em] opacity-60">Uploaded Assets</h3>
              <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 group cursor-pointer hover:bg-surface-container-high transition-all">
                <div className="w-12 h-12 rounded-xl bg-error/5 flex items-center justify-center text-error border border-error/10">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                </div>
                <div className="overflow-hidden space-y-0.5">
                  <p className="text-xs font-black truncate uppercase tracking-tighter text-on-surface">Andi_Pratama_CV.pdf</p>
                  <p className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">2.4 MB • Uploaded today</p>
                </div>
                <button className="ml-auto text-on-surface-variant hover:text-error transition-all active:scale-90">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>

            <div className="bg-surface-container-highest p-6 rounded-[2rem] border border-outline-variant/10">
              <p className="text-[10px] font-bold text-on-surface-variant leading-relaxed uppercase tracking-tighter opacity-70 italic">
                By clicking "Submit Application", you agree to our Terms of Service and Privacy Policy. Kuantum may contact you regarding this and similar opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleSubmit}
                className="w-full py-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                Submit Application
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="w-full py-5 bg-surface-container-highest text-on-surface rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-surface-dim active:scale-95 transition-all"
              >
                Back to Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
};

export default SeekerJobApplication;
