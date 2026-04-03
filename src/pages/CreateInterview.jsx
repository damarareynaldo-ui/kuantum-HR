import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchPublicJobs } from '../lib/publicJobsApi.js';

const CreateInterview = () => {
  const location = useLocation();
  const preJobId = location.state?.jobId;
  const preTitle = location.state?.jobTitle;
  const [jobs, setJobs] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [loadErr, setLoadErr] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchPublicJobs();
        if (cancelled) return;
        const list = Array.isArray(rows) ? rows : [];
        setJobs(list);
        const byId = preJobId && list.find((j) => String(j.id) === String(preJobId));
        const byTitle =
          preTitle &&
          list.find(
            (j) => String(j.title || '').toLowerCase() === String(preTitle).toLowerCase(),
          );
        const pick = byId || byTitle || list[0];
        setSelectedId(pick?.id ? String(pick.id) : '');
      } catch (e) {
        if (!cancelled) setLoadErr(e instanceof Error ? e.message : 'Failed to load jobs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [preJobId, preTitle]);

  const selected = jobs.find((j) => String(j.id) === String(selectedId));

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-on-surface-variant text-[10px] font-black tracking-[0.3em] uppercase">Phase I: Parameters</p>
            <h3 className="text-4xl font-black tracking-tight text-on-surface leading-none">Interview Setup</h3>
          </div>
          <div className="flex gap-4">
            <Link to="/interviews/setup" className="px-6 py-3 rounded-2xl text-sm font-bold bg-surface-container-low text-on-surface hover:bg-surface-variant transition-colors active:scale-95">
              Cancel
            </Link>
            <Link
              to="/interviews"
              state={{ jobTitle: selected?.title, jobId: selected?.id }}
              className={`px-8 py-3 rounded-2xl text-sm font-black text-white signature-gradient shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2 active:scale-95 uppercase tracking-widest ${!selected ? 'pointer-events-none opacity-50' : ''}`}
            >
              <span>Next: Configure Agent</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 font-sans">
          <div className="col-span-8 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">work_outline</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-on-surface mb-1">Select Job Requisition</h4>
                  <p className="text-sm text-on-surface-variant font-medium">Choose the position for this automated screening</p>
                  {loadErr && <p className="text-sm font-bold text-error mt-2">{loadErr}</p>}
                  {loading && <p className="text-sm text-on-surface-variant mt-2">Loading openings…</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {!loading &&
                  jobs.map((job) => {
                    const isActive = String(selectedId) === String(job.id);
                    const dept = job.department || '—';
                    const company = job.company_name || '';
                    return (
                      <button
                        type="button"
                        key={job.id}
                        onClick={() => setSelectedId(String(job.id))}
                        className={`text-left p-6 rounded-[2rem] border-2 transition-all flex flex-col justify-between min-h-[10rem] group ${
                          isActive
                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                            : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p
                              className={`text-[10px] uppercase font-black tracking-widest ${isActive ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}
                            >
                              {dept}
                            </p>
                            <h5 className="font-bold text-on-surface">{job.title || 'Role'}</h5>
                            {company ? (
                              <p className="text-xs font-medium text-on-surface-variant">{company}</p>
                            ) : null}
                          </div>
                          {isActive && (
                            <span className="material-symbols-outlined text-primary scale-110">check_circle</span>
                          )}
                        </div>
                        <div
                          className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary transition-colors'}`}
                        >
                          <span>Select</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
              {!loading && !loadErr && jobs.length === 0 && (
                <p className="text-sm font-bold text-on-surface-variant">No jobs posted yet. Create a job in the HR app first.</p>
              )}
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">settings_input_component</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-on-surface mb-1">Interview Parameters</h4>
                  <p className="text-sm text-on-surface-variant font-medium">
                    Defaults for length, persona, and focus areas come from the job record. Adjust them on the next screen
                    when you configure the live session.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-xl">preview</span>
                Questions
              </h4>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Interview prompts are generated from the selected job&apos;s description and requirements when you start a
                session from <span className="font-bold text-on-surface">Configure Agent</span>.
              </p>
            </div>

            <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 blur-2xl rounded-full group-hover:scale-150 transition-all duration-700"></div>
              <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-4">Next step</h4>
              <p className="text-lg font-extrabold leading-tight mb-6">
                Pair this requisition with a candidate session and launch the AI interviewer from the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateInterview;
