/** Client/server helper for direct public fetches to backend `/api/v1`. */

const DEFAULT_BASE = "http://localhost:8000";

export function getPublicApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_BACKEND_API_URL || DEFAULT_BASE;
  const trimmed = raw.replace(/\/+$/, "");
  if (trimmed.endsWith("/api/v1")) return trimmed;
  if (trimmed.endsWith("/api")) return `${trimmed}/v1`;
  return `${trimmed}/api/v1`;
}

export function publicApiUrl(
  path: string,
  query?: Record<string, string | number | undefined | null>
): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getPublicApiBase()}${normalized}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

/**
 * Normalize paginated envelope for UI that expects `{ data: [], meta }`.
 */
export function normalizeList(payload: any): any {
  if (
    payload?.data &&
    typeof payload.data === "object" &&
    Array.isArray(payload.data.items) &&
    payload.data.meta
  ) {
    return {
      message: payload.message,
      data: payload.data.items,
      meta: payload.data.meta,
    };
  }
  return payload;
}

const emptyList = {
  message: "Success",
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  },
};

export async function publicGet(
  path: string,
  query?: Record<string, string | number | undefined | null>
): Promise<any> {
  try {
    const res = await fetch(publicApiUrl(path, query), {
      headers: { Accept: "application/json" },
      // Allow ISR during build; pages stay fresh enough for public content.
      next: { revalidate: 60 },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Keep build/prerender resilient when backend is down or returns 404.
      if (res.status === 404) {
        return { message: data?.message, data: null };
      }
      return emptyList;
    }
    return normalizeList(data);
  } catch {
    return emptyList;
  }
}
