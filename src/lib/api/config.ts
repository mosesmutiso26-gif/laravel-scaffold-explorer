// Data mode: "demo" uses the clearly labelled in-browser demo dataset;
// "live" calls the Laravel API at VITE_API_BASE_URL + /api/v1.
export type DataMode = "demo" | "live";

export const API_BASE_URL = (import.meta.env["VITE_API_BASE_URL"] as string | undefined)?.replace(/\/$/, "") ?? "";

const MODE_KEY = "ra_data_mode";
const SESSION_KEY = "ra_session";

export function getMode(): DataMode {
  if (typeof window === "undefined") return "demo";
  const stored = window.localStorage.getItem(MODE_KEY) as DataMode | null;
  if (stored === "live" || stored === "demo") return stored;
  return API_BASE_URL ? "live" : "demo";
}

export function setMode(mode: DataMode) {
  window.localStorage.setItem(MODE_KEY, mode);
}

export type Session = { token: string; role: string; name: string; email: string; mode: DataMode };

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function saveSession(s: Session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}
