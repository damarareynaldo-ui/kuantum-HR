import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchDashboard } from '../lib/hrApi.js';

const Dashboard = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await fetchDashboard();
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load dashboard');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = data?.stats || { jobs: 0, sessionsTotal: 0, invited: 0, inProgress: 0, completed: 0 };

  return (
    <Layout>
      <div className="space-y-10">
        <section className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Employer Dashboard</h1>
            <p className="text-on-surface-variant mt-1 font-medium italic">
              Welcome back, {data?.greetingName || 'Recruiter'}.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/interviews" className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest text-on-surface font-semibold rounded-xl hover:bg-surface-dim transition-colors text-sm">
              <span className="material-symbols-outlined text-sm">add</span>
              Create Interview
            </Link>
            <Link to="/jobs/new" className="flex items-center gap-2 px-6 py-2.5 signature-gradient text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-sm">
              <span className="material-symbols-outlined text-sm">work</span>
              Create Job
            </Link>
          </div>
        </section>

        {error && <p className="text-sm font-bold text-error">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            ['Jobs', stats.jobs],
            ['Sessions', stats.sessionsTotal],
            ['Invited', stats.invited],
            ['In Progress', stats.inProgress],
            ['Completed', stats.completed],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10">
              <p className="text-xs uppercase font-black opacity-60">{k}</p>
              <p className="text-2xl font-black">{v}</p>
            </div>
          ))}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
            <h3 className="font-black mb-4">Job Highlights</h3>
            <div className="space-y-3">
              {(data?.jobHighlights || []).map((j) => (
                <Link key={j.id} to={`/jobs/${j.id}`} className="block p-4 bg-surface-container-lowest rounded-xl hover:bg-surface-container-highest transition-colors">
                  <p className="font-black">{j.title}</p>
                  <p className="text-xs opacity-70">{j.department} • candidates: {j.candidateCount} • avg: {j.avgScore ?? '-'} </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
            <h3 className="font-black mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {(data?.recentActivity || []).map((a, i) => (
                <div key={i} className="p-4 bg-surface-container-lowest rounded-xl">
                  <p className="font-bold text-sm">{a.message}</p>
                  <p className="text-xs opacity-60">{a.at || ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
