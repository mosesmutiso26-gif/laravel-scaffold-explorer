import { API_BASE_URL, getMode, getSession } from "./config";
import { demoRequest } from "./demo";

import { ApiError } from "./errors";
export { ApiError };

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

/** Single shared API client. All screens go through here. */
export async function apiRequest<T>(method: Method, path: string, body?: unknown): Promise<T> {
  if (getMode() === "demo") {
    return demoRequest<T>(method, path, body);
  }
  if (!API_BASE_URL) {
    throw new ApiError(0, "Laravel server address is not configured (VITE_API_BASE_URL). Switch to demo mode or set the address.");
  }
  const session = getSession();
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : null,
    });
  } catch {
    throw new ApiError(0, "Could not reach the Laravel server. Check that it is running and reachable.");
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, json.message ?? res.statusText, json.errors);
  }
  return (json.data ?? json) as T;
}

export const api = {
  get: <T,>(p: string) => apiRequest<T>("GET", p),
  post: <T,>(p: string, b?: unknown) => apiRequest<T>("POST", p, b ?? {}),
  patch: <T,>(p: string, b?: unknown) => apiRequest<T>("PATCH", p, b ?? {}),
  del: <T,>(p: string) => apiRequest<T>("DELETE", p),
};
