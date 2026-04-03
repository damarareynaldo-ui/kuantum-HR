import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginSeekerByEmail } from "../lib/seekerApi";
import { getApiBaseUrl } from "../lib/apiBase.js";
import { loginRecruiter } from "../lib/recruiterApi.js";

/** Akun demo seeker (seed DB) — dipakai bila email dikosongkan. */
const DEFAULT_SEEKER_EMAIL = "priya.sharma@example.com";

const Login = () => {
  const [role, setRole] = useState("employer"); // 'employer' or 'seeker'
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (role === "employer") {
      try {
        setSubmitting(true);
        await loginRecruiter(getApiBaseUrl(), email, "Recruiter");
        navigate("/dashboard");
      } catch (err) {
        alert(
          err instanceof Error ? err.message : "Failed to sign in as recruiter",
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }

    try {
      setSubmitting(true);
      await loginSeekerByEmail(email.trim() || DEFAULT_SEEKER_EMAIL);
      navigate("/seeker/dashboard");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to login seeker");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-fixed-dim selection:text-on-primary-fixed relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-tertiary-fixed/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10">
        <div className="hidden md:flex flex-col flex-1 max-w-xl space-y-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white font-black text-xl">
              K
            </div>
            <span className="text-2xl font-black tracking-tighter text-on-background">
              Kuantum AI
            </span>
          </Link>
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
              {role === "employer" ? (
                <>
                  Hire with{" "}
                  <span className="text-primary signature-gradient bg-clip-text text-transparent">
                    surgical
                  </span>{" "}
                  precision.
                </>
              ) : (
                <>
                  Find your next role with{" "}
                  <span className="text-primary signature-gradient bg-clip-text text-transparent">
                    AI
                  </span>{" "}
                  precision.
                </>
              )}
            </h1>
            <p className="text-xl text-on-surface-variant font-medium leading-relaxed">
              {role === "employer"
                ? "The curator's workspace for high-stakes talent acquisition. Experience AI-powered curation that transcends generic dashboards."
                : "The professional's workspace for high-stakes career moves. Experience AI-powered matching that transcends generic job boards."}
            </p>
          </div>
          <div className="space-y-8 pt-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">
                  verified_user
                </span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">
                  Precision Curation
                </h3>
                <p className="text-on-surface-variant text-sm">
                  Every candidate profile is treated as an editorial entry,
                  scored for cultural and technical fit.
                </p>
              </div>
            </div>
            {/* ... other items ... */}
          </div>
        </div>

        <div className="w-full max-w-md flex flex-col">
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-2xl shadow-on-surface/5 flex flex-col border border-outline-variant/10">
            <div className="mb-8">
              <div className="flex bg-surface-container-low p-1 rounded-xl mb-8">
                <button
                  onClick={() => setRole("employer")}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${role === "employer" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant opacity-60 hover:opacity-100"}`}
                >
                  Recruiter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("seeker");
                    setEmail((prev) =>
                      prev.trim() === "" ? DEFAULT_SEEKER_EMAIL : prev,
                    );
                  }}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${role === "seeker" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant opacity-60 hover:opacity-100"}`}
                >
                  Job Seeker
                </button>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-on-surface">
                {role === "employer" ? "Welcome back" : "Candidate Portal"}
              </h2>
              <p className="text-on-surface-variant text-sm mt-2 font-medium">
                {role === "employer"
                  ? "Log in or create an account to start curating."
                  : "Log in to access your AI-powered application dashboard."}
              </p>
            </div>
            <div className="space-y-4">
              <Link
                to="/onboarding"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-container-low text-on-surface font-bold rounded-2xl hover:bg-surface-container transition-all duration-200 group border border-outline-variant/10"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span>Continue with Google</span>
              </Link>
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="flex-shrink mx-4 text-outline text-[10px] font-bold tracking-[0.2em] uppercase">
                  Or use email
                </span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    className="text-xs font-black tracking-widest text-on-surface-variant uppercase ml-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    id="email"
                    placeholder={
                      role === "employer"
                        ? "curator@kuantum.ai"
                        : DEFAULT_SEEKER_EMAIL
                    }
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label
                      className="text-xs font-black tracking-widest text-on-surface-variant uppercase"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a
                      className="text-[10px] font-black text-primary hover:underline tracking-widest uppercase"
                      href="#"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    className="w-full px-5 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-block text-center py-5 signature-gradient text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 text-lg disabled:opacity-60"
                >
                  {submitting
                    ? "Signing In..."
                    : role === "employer"
                      ? "Log In"
                      : "Enter Portal"}
                </button>
              </form>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant font-medium">
                Don't have an account?
                <a
                  className="text-primary font-black hover:underline ml-1"
                  href="#"
                >
                  Start free trial
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-between px-2">
            <div className="flex gap-6">
              <a
                className="text-[10px] font-black text-outline hover:text-on-surface transition-colors tracking-widest uppercase"
                href="#"
              >
                Privacy
              </a>
              <a
                className="text-[10px] font-black text-outline hover:text-on-surface transition-colors tracking-widest uppercase"
                href="#"
              >
                Terms
              </a>
            </div>
            <p className="text-[10px] font-black text-outline tracking-widest uppercase">
              © 2024 KUANTUM AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
