import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import {
  ensureRecruiterUserId,
  recruiterAuthHeaders,
} from "../lib/recruiterApi";
import { getApiBaseUrl } from "../lib/apiBase.js";

const CreateAIInterview = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const API_BASE_URL = getApiBaseUrl();
  const jobTitleFromState = location.state?.jobTitle;
  const jobIdFromState = location.state?.jobId || searchParams.get("jobId");
  const applicationIdFromQuery = searchParams.get("applicationId");

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    jobId: "",
    jobApplicantId: "",
    agentPersona: "Technical Advisor",
    interviewLengthMinutes: 30,
    dynamicProbing: true,
  });

  useEffect(() => {
    let cancelled = false;
    async function loadJobs() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        if (!res.ok) throw new Error(`Failed to load jobs (${res.status})`);
        const data = await res.json();
        if (cancelled) return;
        const rows = Array.isArray(data) ? data : [];
        setJobs(rows);

        const matched = rows.find((j) => {
          if (!jobTitleFromState) return false;
          return (
            String(j.title || "").toLowerCase() ===
            String(jobTitleFromState).toLowerCase()
          );
        });
        const matchedById =
          jobIdFromState &&
          rows.find((j) => String(j.id) === String(jobIdFromState));
        setForm((prev) => ({
          ...prev,
          jobId: matchedById?.id || matched?.id || rows[0]?.id || "",
        }));
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load jobs");
      } finally {
        if (!cancelled) setLoadingJobs(false);
      }
    }
    loadJobs();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL, jobTitleFromState, jobIdFromState]);

  useEffect(() => {
    let cancelled = false;
    async function loadApplications() {
      if (!form.jobId) {
        setApplications([]);
        setForm((prev) => ({ ...prev, jobApplicantId: "" }));
        setLoadingApplications(false);
        return;
      }
      setLoadingApplications(true);
      try {
        const recruiterId = await ensureRecruiterUserId(API_BASE_URL);
        const res = await fetch(
          `${API_BASE_URL}/api/jobs/${form.jobId}/applications`,
          { headers: recruiterAuthHeaders(recruiterId) },
        );
        if (!res.ok) throw new Error(`Failed to load applications (${res.status})`);
        const data = await res.json();
        if (cancelled) return;
        const rows = Array.isArray(data) ? data : [];
        setApplications(rows);
        const open = rows.filter((a) => !a.session_id);
        const pickFromUrl =
          applicationIdFromQuery &&
          open.some((a) => String(a.id) === String(applicationIdFromQuery))
            ? applicationIdFromQuery
            : "";
        setForm((prev) => ({
          ...prev,
          jobApplicantId: pickFromUrl || open[0]?.id || "",
        }));
      } catch (e) {
        if (!cancelled) {
          setApplications([]);
          setError(e.message || "Failed to load applications");
        }
      } finally {
        if (!cancelled) setLoadingApplications(false);
      }
    }
    loadApplications();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL, form.jobId, applicationIdFromQuery]);

  const selectedJob = useMemo(
    () => jobs.find((j) => String(j.id) === String(form.jobId)),
    [jobs, form.jobId],
  );
  const pageJobTitle =
    selectedJob?.title || jobTitleFromState || "Selected Role";

  const openApplications = useMemo(
    () => applications.filter((a) => !a.session_id),
    [applications],
  );

  async function handleActivateAgent() {
    setError("");
    setResult(null);
    if (!form.jobId) {
      setError("Please select a job first.");
      return;
    }
    if (!form.jobApplicantId) {
      setError(
        "Pilih lamaran kandidat (applicant harus sudah apply; belum punya sesi wawancara).",
      );
      return;
    }
    setSubmitting(true);
    try {
      const recruiterId = await ensureRecruiterUserId(API_BASE_URL);
      const payload = {
        jobApplicantId: form.jobApplicantId,
        agentPersona: form.agentPersona,
        interviewLengthMinutes: Number(form.interviewLengthMinutes),
        dynamicProbing: Boolean(form.dynamicProbing),
      };
      const res = await fetch(`${API_BASE_URL}/api/sessions`, {
        method: "POST",
        headers: recruiterAuthHeaders(recruiterId),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data?.error || `Failed to create interview session (${res.status})`,
        );
      }
      setResult(data);
    } catch (e) {
      setError(e.message || "Failed to create interview session");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Orchestration Phase II
              </span>
              <div className="h-px w-12 bg-primary/20"></div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-on-surface leading-none">
              Configure Interview Agent
            </h1>
            <p className="text-on-surface-variant mt-2 font-medium opacity-70">
              Define how the AI agent interacts with candidates for the{" "}
              <span className="text-primary font-bold">{pageJobTitle}</span>{" "}
              role.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/interviews/setup"
              className="px-8 py-4 bg-surface-container-low text-on-surface font-black rounded-2xl hover:bg-surface-dim transition-all text-sm uppercase tracking-widest active:scale-95"
            >
              Back to Setup
            </Link>
            <button
              onClick={handleActivateAgent}
              disabled={submitting || loadingJobs}
              className="px-8 py-4 signature-gradient text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center gap-2 disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Activate Agent"}
              <span className="material-symbols-outlined text-lg">bolt</span>
            </button>
          </div>
        </header>
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm font-bold">
            {error}
          </div>
        ) : null}
        {result ? (
          <div className="bg-emerald-50 border border-emerald-200 px-6 py-5 rounded-2xl space-y-3">
            <p className="text-emerald-800 text-sm font-black uppercase tracking-widest">
              Sesi dibuat — bagikan ke kandidat
            </p>
            <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-widest">Internal redirect</p>
            <p className="text-xs text-emerald-700 font-bold break-all">{result.interviewUrl || "—"}</p>
            <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-widest">URL eksternal (jika dikonfigurasi di API)</p>
            <p className="text-xs text-emerald-700 font-bold break-all">{result.externalInterviewUrl || "— (set EXTERNAL_INTERVIEW_REDIRECT_URL_TEMPLATE di backend)"}</p>
            <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-widest">Access code ID (untuk verifikasi / undangan)</p>
            <p className="text-xs text-emerald-700 font-bold break-all">{result?.accessCode?.id || "—"}</p>
            <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-widest">Session code (pendek)</p>
            <p className="text-xs text-emerald-700 font-bold break-all">{result?.accessCode?.sessionCode || "—"}</p>
            <p className="text-[10px] text-emerald-800 font-medium leading-relaxed pt-2">
              Kandidat bisa verifikasi kode di aplikasi: <span className="font-black">/seeker/interview/access</span> lalu melanjutkan ke ruang wawancara.
            </p>
          </div>
        ) : null}

        {/* Configuration Grid */}
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-8 space-y-10">
            {/* Agent Identity */}
            <section className="bg-surface-container-lowest p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">
                    psychology
                  </span>
                </div>
                <h2 className="text-xl font-black text-on-surface tracking-tight uppercase tracking-widest text-[14px]">
                  Agent Identity
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">
                    Target Job
                  </label>
                  <select
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all text-on-surface"
                    value={form.jobId}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        jobId: e.target.value,
                        jobApplicantId: "",
                      }))
                    }
                    disabled={loadingJobs}
                  >
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">
                    Agent Persona
                  </label>
                  <select
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
                    value={form.agentPersona}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        agentPersona: e.target.value,
                      }))
                    }
                  >
                    <option>Technical Advisor</option>
                    <option>Peer Engineer</option>
                    <option>Product Leader</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 mt-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">
                    Job application (must apply first; no session yet)
                  </label>
                  <select
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all text-on-surface"
                    value={form.jobApplicantId}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        jobApplicantId: e.target.value,
                      }))
                    }
                    disabled={loadingJobs || loadingApplications || !form.jobId}
                  >
                    <option value="">
                      {loadingApplications
                        ? "Loading applications…"
                        : openApplications.length === 0
                          ? "No open applications for this job"
                          : "Select applicant"}
                    </option>
                    {openApplications.map((a) => (
                      <option key={a.id} value={a.id}>
                        {(a.name || "Applicant") + " — " + (a.email || "")}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-on-surface-variant font-medium px-1 opacity-70">
                    Only applications without an interview session are listed. Use
                    GET /api/jobs/:jobId/applications to inspect all.
                  </p>
                </div>
              </div>
            </section>

            {/* System Instructions */}
            <section className="bg-surface-container-lowest p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-2xl">
                    terminal
                  </span>
                </div>
                <h2 className="text-xl font-black text-on-surface tracking-tight uppercase tracking-widest text-[14px]">
                  System Instructions
                </h2>
              </div>

              <div className="space-y-6">
                <textarea
                  rows="10"
                  className="w-full bg-surface-container-low border-none rounded-[2rem] p-8 text-sm font-medium text-on-surface leading-relaxed focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                  placeholder="Define behavioral guardrails and specialized probing logic..."
                  defaultValue={`
                    ROLE
                    Anda adalah seorang HR Interviewer profesional yang melakukan wawancara tahap awal kepada kandidat. Gunakan bahasa yang sopan, profesional, singkat, dan jelas. Jaga percakapan tetap natural seperti wawancara manusia. Jangan berbicara terlalu panjang dalam satu waktu.
                    
                    TUJUAN WAWANCARA
                    Tujuan wawancara ini adalah untuk:
                    
                    * Mengenal kandidat
                    * Memahami pengalaman kerja kandidat
                    * Menilai kemampuan komunikasi, teknikal, pemecahan masalah, dan culture fit
                    * Mengetahui ekspektasi kandidat terhadap pekerjaan
                    
                    ATURAN PERCAKAPAN
                    
                    * Gunakan bahasa yang sopan dan profesional
                    * Ajukan pertanyaan satu per satu
                    * Berikan waktu kepada kandidat untuk menjawab
                    * Jika jawaban kandidat terlalu singkat, ajukan pertanyaan lanjutan untuk memperjelas
                    * Jangan menyebutkan range salary perusahaan
                    * Jaga percakapan tetap fokus pada wawancara
                    
                    ALUR WAWANCARA
                    
                    1. PEMBUKAAN
                      Mulai wawancara dengan memperkenalkan diri secara singkat sebagai HR dari perusahaan.
                    
                    Contoh:
                    
                    * Sapa kandidat dengan ramah
                    * Ucapkan terima kasih karena telah meluangkan waktu untuk interview
                    
                    2. PENJELASAN PERUSAHAAN
                      Jelaskan secara singkat tentang perusahaan, termasuk:
                    
                    * Perusahaan bergerak di bidang apa
                    * Produk atau layanan utama perusahaan
                    * Culture kerja perusahaan
                    * Benefit utama yang diberikan kepada karyawan
                    
                    Gunakan penjelasan singkat dan jelas.
                    
                    3. PENJELASAN POSISI
                      Jelaskan posisi yang dilamar oleh kandidat, termasuk:
                    
                    * Tanggung jawab utama posisi tersebut
                    * Peran posisi tersebut dalam tim
                    * Teknologi atau area kerja utama
                    
                    Jangan menyebutkan informasi terkait range salary perusahaan.
                    
                    4. PERKENALAN KANDIDAT
                      Persilakan kandidat untuk memperkenalkan diri secara singkat.
                    
                    Contoh pertanyaan:
                    “Bisa tolong perkenalkan diri Anda secara singkat, termasuk pengalaman kerja Anda sejauh ini?”
                    
                    5. PENGALAMAN KERJA
                      Tanyakan kepada kandidat mengenai pengalaman kerja sebelumnya.
                    
                    Contoh pertanyaan:
                    
                    * Project apa saja yang pernah Anda kerjakan di perusahaan sebelumnya?
                    * Apa peran Anda dalam project tersebut?
                    * Tantangan apa yang Anda hadapi dalam project tersebut?
                    
                    Jika diperlukan, ajukan pertanyaan lanjutan untuk memperdalam jawaban kandidat.
                    
                    6. ALASAN KELUAR DARI PERUSAHAAN SEBELUMNYA
                      Tanyakan alasan kandidat meninggalkan perusahaan sebelumnya.
                    
                    Contoh pertanyaan:
                    “Apa alasan Anda memutuskan untuk meninggalkan perusahaan sebelumnya?”
                    
                    7. PERTANYAAN PENILAIAN KANDIDAT
                    
                    Ajukan beberapa pertanyaan untuk menilai karakteristik kandidat dalam hal berikut:
                    
                    Komunikasi
                    
                    * Bagaimana Anda biasanya menjelaskan ide teknis kepada anggota tim yang non-teknis?
                    
                    Teknikal
                    
                    * Bisa ceritakan salah satu tantangan teknis yang pernah Anda hadapi dan bagaimana Anda menyelesaikannya?
                    
                    Problem Solving
                    
                    * Ceritakan situasi dimana Anda harus menyelesaikan masalah yang cukup kompleks dalam pekerjaan Anda.
                    
                    Culture Fit
                    
                    * Bagaimana cara Anda bekerja dalam tim ketika ada perbedaan pendapat?
                    
                    Gunakan pertanyaan lanjutan jika diperlukan untuk menggali jawaban lebih dalam.
                    
                    8. EKSPEKTASI KANDIDAT
                      Tanyakan kepada kandidat mengenai ekspektasi mereka.
                    
                    Contoh:
                    
                    * Berapa ekspektasi salary Anda untuk posisi ini?
                    * Benefit seperti apa yang Anda harapkan dari perusahaan?
                    
                    9. SESI PERTANYAAN KANDIDAT
                      Berikan kesempatan kepada kandidat untuk bertanya.
                    
                    Contoh:
                    “Apakah ada pertanyaan yang ingin Anda tanyakan kepada kami mengenai perusahaan atau posisi ini?”
                    
                    Jawab pertanyaan kandidat secara singkat dan profesional.
                    
                    10. PENUTUP
                        Jika kandidat tidak memiliki pertanyaan lagi:
                    
                    * Ucapkan terima kasih atas waktu yang telah diberikan
                    * Sampaikan bahwa tim akan meninjau hasil wawancara
                    * Informasikan bahwa kandidat akan dihubungi kembali untuk tahapan selanjutnya jika sesuai
                    
                    Akhiri wawancara dengan sopan dan professional.`}
                />

                <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                  <span className="material-symbols-outlined text-primary text-xl">
                    auto_awesome
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">
                    AI has optimized these instructions based on the current job
                    requirement.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-10">
            {/* Supporting Data */}
            <section className="bg-surface-container-low p-10 rounded-[2.8rem] border border-outline-variant/10 shadow-sm">
              <h2 className="text-[12px] font-black text-on-surface uppercase tracking-[0.25em] mb-8">
                Supporting Data
              </h2>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-outline-variant/30 rounded-[2rem] p-10 text-center space-y-4 hover:border-primary/40 hover:bg-white/50 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-on-surface-variant mx-auto shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">
                      attach_file
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-black text-on-surface uppercase tracking-widest">
                      Upload Role Docs
                    </h4>
                    <p className="text-[10px] font-bold text-on-surface-variant opacity-60 mt-1">
                      PDF, DOCX up to 10MB
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">
                    Context URL
                  </label>
                  <input
                    type="url"
                    placeholder="Engineering blog, project spec..."
                    className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                  />
                </div>
              </div>
            </section>

            {/* Match Context Card */}
            <div className="bg-tertiary-fixed p-10 rounded-[2.8rem] relative overflow-hidden group shadow-2xl shadow-tertiary/5">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 blur-3xl rounded-full group-hover:scale-150 transition-all duration-700"></div>

              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary text-2xl">
                  auto_awesome
                </span>
                <span className="text-[12px] font-black uppercase tracking-widest text-on-tertiary-fixed">
                  Match Architect
                </span>
              </div>

              <h3 className="text-2xl font-black text-on-tertiary-fixed leading-tight mb-4">
                Optimized Probing Logic
              </h3>
              <p className="text-on-tertiary-fixed-variant leading-relaxed font-medium text-[13px]">
                This agent will automatically prioritize candidates who discuss{" "}
                <span className="font-black underline decoration-2 underline-offset-4 decoration-tertiary">
                  tradeoffs
                </span>{" "}
                rather than just solutions, specifically for technical
                leadership patterns.
              </p>

              <div className="mt-8 pt-8 border-t border-on-tertiary-fixed/10">
                <p className="text-[10px] font-black text-on-tertiary-fixed opacity-60 uppercase tracking-widest">
                  Activation Window
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-black text-on-tertiary-fixed">
                    14 Days
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/40 px-3 py-1 rounded-full text-on-tertiary-fixed">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Standard Lead
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAIInterview;
