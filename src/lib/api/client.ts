import { ApiListResponse } from "@/types/api";

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const json = await res.json();

  // list routes: { success, data, pagination }
  // [id] routes: raw object (Issue #4 — asymmetry documented)
  return (json.data ?? json) as T;
}

export async function apiGetList<T>(
  url: string,
  params?: Record<string, string | number>
): Promise<ApiListResponse<T>> {
  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  const res = await fetch(url + query, {
    credentials: "include",
    cache: "no-store",
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error ?? "Request failed");
  }

  return json as ApiListResponse<T>;
}

export async function apiPost<T>(
  url: string,
  body: unknown
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error ?? "Request failed");
  }

  return json.data as T;
}

export async function apiPut<T>(
  url: string,
  body: unknown
): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error ?? "Request failed");
  }

  return json.data as T;
}

export async function apiPatch<T>(
  url: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error ?? "Request failed");
  }

  return json.data as T;
}