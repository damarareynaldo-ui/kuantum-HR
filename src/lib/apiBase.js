/** Base URL for kuantum-api (no trailing slash). */
export function getApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001').replace(/\/$/, '');
}

/** HR AI Analyzer (external) — `GET /result/interview/:applicationId`, `GET /result/cv-employer/:applicationId`. */
export function getHrAiAnalyzerBaseUrl() {
  const fromEnv = import.meta.env.VITE_HR_AI_ANALYZER_BASE_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, '');
  // Dev: proxy Vite `/hra` → lihat `vite.config.js`
  if (import.meta.env.DEV) return '/hra';
  return 'https://hrisaianalyzer-production.up.railway.app'.replace(/\/$/, '');
}
