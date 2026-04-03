import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getApiBaseUrl } from '../lib/apiBase.js';
import { fetchPublicCompanies } from '../lib/publicJobsApi.js';
import { createJob } from '../lib/recruiterApi.js';

const CreateJob = () => {
  const navigate = useNavigate();
  const apiBase = getApiBaseUrl();
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    companyId: '',
    title: '',
    department: '',
    employmentType: 'full-time',
    description: '',
    requirementInput: '',
    requirements: [],
  });
  const [weights, setWeights] = useState({
    communication: 4,
    techSkills: 5,
    cultureFit: 3,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchPublicCompanies();
        if (cancelled) return;
        setCompanies(rows);
        const first = rows[0]?.id;
        setForm((prev) => ({
          ...prev,
          companyId: first || '',
        }));
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load companies');
      } finally {
        if (!cancelled) setLoadingCompanies(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function addRequirement() {
    const t = form.requirementInput.trim();
    if (!t) return;
    setForm((prev) => ({
      ...prev,
      requirements: [...prev.requirements, t],
      requirementInput: '',
    }));
  }

  function removeRequirement(tag) {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((x) => x !== tag),
    }));
  }

  async function handleSaveAndInterview(e) {
    e.preventDefault();
    setError('');
    if (!form.companyId) {
      setError('Pilih perusahaan atau buat company di API terlebih dahulu.');
      return;
    }
    if (!form.title.trim()) {
      setError('Judul pekerjaan wajib diisi.');
      return;
    }
    setSubmitting(true);
    try {
      await createJob(apiBase, {
        companyId: form.companyId,
        title: form.title.trim(),
        department: form.department.trim(),
        employmentType: form.employmentType,
        description: form.description.trim(),
        requirements: form.requirements,
        evaluationWeights: {
          communication: weights.communication,
          techSkills: weights.techSkills,
          cultureFit: weights.cultureFit,
        },
        priority: 'standard',
      });
      navigate('/interviews', { state: { jobTitle: form.title.trim() } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan lowongan');
    } finally {
      setSubmitting(false);
    }
  }

  const companyName =
    companies.find((c) => c.id === form.companyId)?.name || '—';
  const industry =
    companies.find((c) => c.id === form.companyId)?.industry || '—';

  return (
    <Layout>
      <form className="max-w-6xl mx-auto space-y-10" onSubmit={handleSaveAndInterview}>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-on-surface-variant text-xs font-black tracking-[0.2em] uppercase">New Requisition</p>
            <h3 className="text-4xl font-extrabold tracking-tight text-on-surface">Create Job</h3>
          </div>
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors"
            >
              Save Draft
            </Link>
            <button
              type="submit"
              disabled={submitting || loadingCompanies}
              className="px-6 py-2.5 rounded-xl text-sm font-black text-white signature-gradient shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span>{submitting ? 'Saving…' : 'Save & Generate Interview'}</span>
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm font-bold text-error">
            {error}
          </div>
        )}

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
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Company</label>
                      <select
                        className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all"
                        value={form.companyId}
                        onChange={(e) => setForm((p) => ({ ...p, companyId: e.target.value }))}
                        disabled={loadingCompanies || companies.length === 0}
                      >
                        {companies.length === 0 && <option value="">No companies — seed DB first</option>}
                        {companies.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Company Name</label>
                      <input
                        className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5"
                        readOnly
                        type="text"
                        value={companyName}
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Industry</label>
                      <input
                        className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5"
                        readOnly
                        type="text"
                        value={industry}
                      />
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
                      <input
                        className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all"
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Department</label>
                      <input
                        className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all"
                        type="text"
                        value={form.department}
                        onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Type</label>
                      <select
                        className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 px-5 focus:ring-4 focus:ring-primary/10 transition-all"
                        value={form.employmentType}
                        onChange={(e) => setForm((p) => ({ ...p, employmentType: e.target.value }))}
                      >
                        <option value="full-time">Full-time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10 relative">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">description</span>
                  Job Description
                </h4>
              </div>
              <textarea
                className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-medium leading-relaxed p-6 focus:ring-4 focus:ring-primary/10 transition-all min-h-[300px]"
                placeholder="Describe the role, impact, and day-to-day responsibilities..."
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                Requirements
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {form.requirements.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-wider"
                  >
                    {tag}
                    <button type="button" className="material-symbols-outlined text-sm cursor-pointer opacity-50 hover:opacity-100" onClick={() => removeRequirement(tag)}>
                      close
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-low border-none rounded-2xl text-sm font-bold py-4 pl-5 pr-12 focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="Add requirement..."
                  type="text"
                  value={form.requirementInput}
                  onChange={(e) => setForm((p) => ({ ...p, requirementInput: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addRequirement();
                    }
                  }}
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary p-2" onClick={addRequirement}>
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-lg">analytics</span>
                Evaluation Weight
              </h4>
              <div className="space-y-6">
                {[
                  { key: 'communication', label: 'Communication' },
                  { key: 'techSkills', label: 'Tech Skills' },
                  { key: 'cultureFit', label: 'Culture Fit' },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-on-surface-variant">{item.label}</span>
                      <span className="text-primary">
                        {weights[item.key]} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={weights[item.key]}
                      onChange={(e) =>
                        setWeights((w) => ({
                          ...w,
                          [item.key]: Number(e.target.value),
                        }))
                      }
                      className="w-full accent-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateJob;
