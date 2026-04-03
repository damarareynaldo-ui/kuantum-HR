import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchPublicJobs } from '../lib/publicJobsApi.js';
import { fetchComparison } from '../lib/hrApi.js';

const Comparison = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const [jobId, setJobId] = React.useState('');
  const [payload, setPayload] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const j = await fetchPublicJobs();
        if (cancelled) return;
        setJobs(j);
        if (j[0]?.id) setJobId(j[0].id);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load jobs');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (!jobId) return;
    let cancelled = false;
    (async () => {
      try {
        const d = await fetchComparison(jobId);
        if (!cancelled) setPayload(d);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load comparison');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex items-center gap-4">
          <h1 className="text-3xl font-black">Candidate Comparison</h1>
          <select className="bg-surface-container-low rounded-xl p-3" value={jobId} onChange={(e) => setJobId(e.target.value)}>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </header>
        {error && <p className="text-sm font-bold text-error">{error}</p>}
        <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-highest">
              <tr>
                <th className="px-6 py-4 text-xs uppercase">Profile</th>
                <th className="px-6 py-4 text-xs uppercase">Tech</th>
                <th className="px-6 py-4 text-xs uppercase">Solve</th>
                <th className="px-6 py-4 text-xs uppercase">Comm</th>
                <th className="px-6 py-4 text-xs uppercase">Score</th>
              </tr>
            </thead>
            <tbody>
              {(payload?.rows || []).map((r) => (
                <tr
                  key={r.sessionId}
                  onClick={() => navigate(`/results/detail?sessionId=${encodeURIComponent(String(r.sessionId))}`)}
                  className="cursor-pointer hover:bg-surface-container-lowest border-t border-outline-variant/10"
                >
                  <td className="px-6 py-4 font-bold">{r.name}</td>
                  <td className="px-6 py-4">{r.tech?.toFixed?.(1) ?? r.tech}</td>
                  <td className="px-6 py-4">{r.solve?.toFixed?.(1) ?? r.solve}</td>
                  <td className="px-6 py-4">{r.comm?.toFixed?.(1) ?? r.comm}</td>
                  <td className="px-6 py-4 font-black">{r.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Comparison;
