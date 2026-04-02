import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const CreateJob = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Content Header with Actions */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-on-surface-variant text-xs font-black tracking-[0.2em] uppercase">New Requisition</p>
            <h3 className="text-4xl font-extrabold tracking-tight text-on-surface">Staff Engineer</h3>
          </div>
          <div className="flex gap-4">
            <Link to="/dashboard" className="px-6 py-2.5 rounded-xl text-sm font-bold bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors">
              Save Draft
            </Link>
            <Link to="/interviews" className="px-6 py-2.5 rounded-xl text-sm font-black text-white signature-gradient shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
              <span>Save & Generate Interview</span>
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </Link>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">corporate_fare</span>
                    Company Info
                  </h4>
                  <div className="space-y-4">
                    <div className="group">
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Company Name</label>
                      <input className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all" readOnly type="text" value="Kuantum Labs" />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Industry</label>
                      <input className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all" readOnly type="text" value="Technology" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">assignment_ind</span>
                    Job Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Job Title</label>
                      <input className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all" type="text" defaultValue="Staff Engineer" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Department</label>
                      <input className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all" type="text" defaultValue="Engineering" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Type</label>
                      <select className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all">
                        <option>Full-time</option>
                        <option>Contract</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10 relative">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">description</span>
                  Job Description
                </h4>
                <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-all">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Generate with AI
                </button>
              </div>
              <textarea className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-medium leading-relaxed p-6 focus:ring-4 focus:ring-primary/10 transition-all min-h-[300px]" placeholder="Describe the role, impact, and day-to-day responsibilities..."></textarea>
            </div>
          </div>
          {/* Sidebar Area */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                Requirements
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Leadership', 'SQL', '5+ years'].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-wider">
                    {tag}
                    <span className="material-symbols-outlined text-sm cursor-pointer opacity-50 hover:opacity-100">close</span>
                  </span>
                ))}
              </div>
              <div className="relative">
                <input className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 pl-5 pr-12 focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Add requirement..." type="text" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary p-2">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>
            </div>
            {/* Weight Section */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-lg">analytics</span>
                Evaluation Weight
              </h4>
              <div className="space-y-6">
                {[
                  { label: 'Communication', val: 4 },
                  { label: 'Tech Skills', val: 5 },
                  { label: 'Culture Fit', val: 3 },
                ].map(item => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-on-surface-variant">{item.label}</span>
                      <span className="text-primary">{item.val} / 5</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full signature-gradient" style={{ width: `${(item.val / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateJob;
