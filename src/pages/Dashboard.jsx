import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Header Section */}
        <section className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Employer Dashboard</h1>
            <p className="text-on-surface-variant mt-1 font-medium italic">Welcome back, Sarah. You have 12 interviews scheduled today.</p>
          </div>
          {/* Quick Actions */}
          <div className="flex gap-3">
            <Link to="/interviews" className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest text-on-surface font-semibold rounded-xl hover:bg-surface-dim transition-colors text-sm">
              <span className="material-symbols-outlined text-sm">add</span>
              Create Interview
            </Link>
            <Link to="/jobs" className="flex items-center gap-2 px-6 py-2.5 signature-gradient text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-sm">
              <span className="material-symbols-outlined text-sm">work</span>
              Create Job
            </Link>
          </div>
        </section>

        {/* Active Jobs Bento Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Active Recruitment</h2>
            <button className="text-primary font-bold text-sm hover:underline">View all jobs</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Card 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between mb-4">
                <span className="bg-tertiary-container/10 text-tertiary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Urgent Fill</span>
                <span className="material-symbols-outlined text-slate-300 hover:text-slate-500 cursor-pointer">more_vert</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">Senior UI Designer</h3>
              <p className="text-on-surface-variant text-sm mb-6">Product & Design • Full-time</p>
              <div className="flex items-end justify-between">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtfciBMEIBDBowqFwlNhmAMNJr3KVs7EMp_6KJW6cQmydZiJJMnNvkzfTk8YQpbIMtPWBBdwvNHskcfRd92yC2ZFhO9i3WDMXXnzGevu8U6GR2wnCTAnjgp9TOn8sgjERuQSfVMAOpqKcsNvxBNm6uVz-kD-21fYwn-6uM8IpTS8nF3B_9FSAiMWS4KeV_cGsBfw5cwMy1qhKVSz4RsIo_ZjsuFExZWVMjPY4aVBlv5u3HxSwnCtVuxsRZ7Q4KgbQB0MUKgtQZvNHw" alt="Candidate 1" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClnVOjAA_J9RMMKvsTV00TXIOayQEU2aoxOVYMg_UkK7pcSVpkHxpeoLOAXbGQBjqWyCG9psuXG2Qx7oHzx7ShdylZKaRomhlVVYH-hbxexp_GaY7Uxv_KSYuVgI8kk704UBT0n0as8wmZHquWbEgm0XyOaBabvAAPSUkMAUEo3wyY7JkbW9hOdem5ioTP2mEkjPAYs7CmV-fSwYb64N6gkEa8G9mAM9LBfEYu6inUG3QcRWOxSoI2y_VLeM9xEESsSuY3NflQJO23" alt="Candidate 2" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwEYRd76250exwyzT_feFsoVd2PX2aOYMS6yrfSLj95waa0vRCJ5rkVzZVeSrdWdVkHQ6bPqY-eQeLPLDhPekGHZNMTWER6A0GUaL_IermvTcuVWuYKljhofSDRHBKjvXCBohol4H5t7PmUwRtqy_DAtPXHRET3JcjwRs-sYMeAFLBKSN4AhYc7LZuSi7ORrPRq1SkDJVukyrT0nZTZucx-oAWDLlw9EKcL-OATdCsHf72mpShykZayqEzkriVKnCVlLQRJRclULL8" alt="Candidate 3" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold">+14</div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Score</span>
                  <span className="text-xl font-black text-primary">8.4<span className="text-xs text-slate-400 font-medium">/10</span></span>
                </div>
              </div>
            </div>
            {/* ... other cards would go here ... */}
          </div>
        </section>

        {/* Pipeline & Activity Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Candidate Pipeline */}
          <section className="col-span-12 lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Priority Candidate Pipeline</h2>
            <div className="grid grid-cols-4 gap-4 overflow-x-auto pb-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Invited (4)</span>
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl space-y-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-slate-300">
                    <p className="text-xs font-bold mb-1">Alex Rivera</p>
                    <p className="text-[10px] text-slate-500">Sales Manager</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-blue-500">In Progress (7)</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl space-y-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-primary relative overflow-hidden">
                    <p className="text-xs font-bold mb-1">Elena Costa</p>
                    <p className="text-[10px] text-slate-500">Senior UI Designer</p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <span className="block h-full w-2/3 bg-primary"></span>
                      </span>
                      <span className="text-[8px] font-bold">66%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* ... other columns ... */}
            </div>
          </section>

          {/* Activity Feed */}
          <section className="col-span-12 lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
            <div className="bg-surface-container-low rounded-2xl p-6 space-y-6">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl">video_call</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Interview Completed</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Marcus Thorne finished the AI coding assessment.</p>
                </div>
              </div>
              {/* AI Match Card */}
              <div className="bg-tertiary-fixed p-4 rounded-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-sm text-tertiary">auto_awesome</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-tertiary">AI Insight</span>
                  </div>
                  <p className="text-xs font-medium text-on-tertiary-fixed-variant leading-relaxed">
                    <span className="font-bold">Sophia Chen</span> matches 98% of your core culture values.
                  </p>
                  <Link to="/results" className="mt-3 text-[10px] font-bold text-tertiary flex items-center gap-1 hover:underline">
                    Read Analysis <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
