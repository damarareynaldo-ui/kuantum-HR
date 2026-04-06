import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getHrAiAnalyzerBaseUrl } from "../lib/apiBase.js";
import { getMyApplications } from "../lib/seekerApi.js";

function parseTime(value) {
  const t = Number(new Date(value || 0));
  return Number.isFinite(t) ? t : 0;
}

function getLatestApplication(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const withId = rows.filter((r) => r?.id);
  if (withId.length === 0) return null;
  const sorted = [...withId].sort((a, b) => {
    const ta = parseTime(a?.createdAt) || parseTime(a?.updatedAt);
    const tb = parseTime(b?.createdAt) || parseTime(b?.updatedAt);
    return tb - ta;
  });
  return sorted[0] || withId[withId.length - 1];
}

function normalizeApplications(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.applications)) return payload.applications;
  if (Array.isArray(payload?.data?.applications))
    return payload.data.applications;
  return [];
}

const SeekerSidebar = () => {
  const fileInputRef = useRef(null);
  const [cvFile, setCvFile] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [postStatus, setPostStatus] = useState("");
  const navItems = [
    { label: "Marketplace", icon: "explore", path: "/seeker/marketplace" },
    {
      label: "My Applications",
      icon: "dashboard_customize",
      path: "/seeker/dashboard",
    },
    {
      label: "Interview Schedule",
      icon: "calendar_today",
      path: "/seeker/schedule",
    },
    { label: "Match Profile", icon: "account_circle", path: "/seeker/profile" },
    { label: "Settings", icon: "settings", path: "/seeker/settings" },
  ];

  const handleUploadCv = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitCv = async () => {
    setIsPosting(true);
    setPostStatus("");
    try {
      if (!cvFile) {
        throw new Error("Pilih file CV (PDF) terlebih dahulu");
      }
      const payload = await getMyApplications();
      const rows = normalizeApplications(payload);
      const latest = getLatestApplication(rows);
      if (!latest?.id) {
        throw new Error("Belum ada application untuk diproses");
      }

      const form = new FormData();
      form.append("applicationId", String(latest.id));
      form.append("jobId", String(latest?.jobId ?? latest?.job_id ?? ""));
      form.append(
        "jobTitle",
        String(latest?.jobTitle ?? latest?.job_title ?? latest?.job?.title ?? "Role"),
      );
      form.append(
        "jobRequirements",
        String(
          latest?.jobRequirements ??
            latest?.job_requirements ??
            latest?.job?.description ??
            "—",
        ),
      );
      form.append(
        "jobIndustry",
        String(
          latest?.jobIndustry ??
            latest?.job_industry ??
            latest?.company_industry ??
            latest?.job?.company_industry ??
            "General",
        ),
      );
      form.append("jobs", JSON.stringify([]));
      form.append("cvFile", cvFile, cvFile.name);

      const base = getHrAiAnalyzerBaseUrl();
      const res = await fetch(`${base}/recomend-jobs`, {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data?.error || data?.message || `Request failed (${res.status})`,
        );
      }
      setPostStatus(`Upload CV sukses (${latest.id})`);
    } catch (error) {
      setPostStatus(error instanceof Error ? error.message : "Upload CV gagal");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-100 dark:bg-slate-900 flex flex-col gap-2 p-4 transition-all duration-200 ease-in-out border-r border-outline-variant/10">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white font-black text-xl">
          K
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 leading-none">
            Kuantum AI
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">
            Professional Seeker
          </p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-tight transition-all duration-200 ${
                isActive
                  ? "bg-white dark:bg-slate-800 text-primary shadow-lg shadow-primary/5"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10">
        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4">
          Andi Pratama
        </p>
        <button
          type="button"
          onClick={handleUploadCv}
          className="w-full signature-gradient text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Pilih CV
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setCvFile(f || null);
            setPostStatus("");
          }}
        />
        {cvFile ? (
          <>
            <p
              className="mt-3 text-[10px] font-bold text-on-surface-variant tracking-tight truncate"
              title={cvFile.name}
            >
              {cvFile.name}
            </p>
            <button
              type="button"
              onClick={handleSubmitCv}
              disabled={isPosting}
              className="mt-2 w-full bg-slate-900 dark:bg-slate-700 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPosting ? "Uploading..." : "Upload Sekarang"}
            </button>
          </>
        ) : null}
        {postStatus && (
          <p className="mt-3 text-[10px] font-bold text-on-surface-variant tracking-tight">
            {postStatus}
          </p>
        )}
      </div>
    </aside>
  );
};

export default SeekerSidebar;
