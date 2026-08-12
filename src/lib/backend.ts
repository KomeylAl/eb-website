import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BASE = "http://localhost:8000";

/** Base URL for backend API including `/api/v1` (no trailing slash). */
export function getBackendBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BACKEND_API_URL || DEFAULT_BASE;
  const trimmed = raw.replace(/\/+$/, "");
  if (trimmed.endsWith("/api/v1")) return trimmed;
  if (trimmed.endsWith("/api")) return `${trimmed}/v1`;
  return `${trimmed}/api/v1`;
}

/** Build a full backend URL under `/api/v1`. */
export function backendUrl(
  path: string,
  query?: Record<string, string | number | undefined | null> | URLSearchParams
): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getBackendBaseUrl()}${normalized}`);

  if (query instanceof URLSearchParams) {
    query.forEach((value, key) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  } else if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export function getToken(req: NextRequest): string | undefined {
  return req.cookies.get("token")?.value;
}

type BackendFetchOptions = {
  method?: string;
  token?: string | null;
  body?: BodyInit | null;
  headers?: HeadersInit;
  /** When true, do not set Content-Type (e.g. FormData). */
  isFormData?: boolean;
  /** Forward Accept + optional Bearer. Default true. */
  json?: boolean;
};

/** Fetch against the backend with standard Accept / Auth headers. */
export async function backendFetch(
  path: string,
  options: BackendFetchOptions & {
    query?: Record<string, string | number | undefined | null> | URLSearchParams;
  } = {}
): Promise<Response> {
  const {
    method = "GET",
    token,
    body,
    headers: extraHeaders,
    isFormData = false,
    json = true,
    query,
  } = options;

  const headers = new Headers(extraHeaders);

  if (json && !headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (
    body &&
    !isFormData &&
    typeof body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(backendUrl(path, query), {
    method,
    headers,
    body: body ?? undefined,
  });
}

/**
 * Normalize paginated backend envelope:
 * `{ data: { items, meta } }` → `{ data: items, meta }` for existing UI.
 */
export function normalizePaginatedPayload(payload: any): any {
  if (
    payload &&
    typeof payload === "object" &&
    payload.data &&
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

/** Map backend user so UI can keep using `role` (= admin_role). */
export function normalizeUser(user: any): any {
  if (!user || typeof user !== "object") return user;
  return {
    ...user,
    role: user.admin_role ?? user.role ?? null,
  };
}

/** Forward a backend Response to NextResponse, preserving status and body. */
export async function proxyJsonResponse(
  response: Response,
  options: { normalizeList?: boolean } = {}
): Promise<NextResponse> {
  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const text = await response.text();
  if (!text) {
    return new NextResponse(null, { status: response.status });
  }

  try {
    let data = JSON.parse(text);
    if (options.normalizeList) {
      data = normalizePaginatedPayload(data);
    }
    return NextResponse.json(data, { status: response.status });
  } catch {
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "text/plain; charset=utf-8",
      },
    });
  }
}

/** Read list query params from BFF request (supports pageSize|size|per_page). */
export function listQueryFromRequest(req: NextRequest): Record<string, string> {
  const params = req.nextUrl.searchParams;
  const page = params.get("page") || "1";
  const perPage =
    params.get("per_page") ||
    params.get("pageSize") ||
    params.get("size") ||
    "15";

  const query: Record<string, string> = {
    page,
    per_page: perPage,
  };

  const passthrough = [
    "search",
    "status",
    "date",
    "doctor_id",
    "client_id",
    "payment_status",
    "category_id",
    "sort_by",
    "sort_direction",
    "type",
    "priority",
    "from_date",
    "to_date",
    "commentable_type",
    "commentable_id",
    "approved",
    "phone",
  ];

  for (const key of passthrough) {
    const value = params.get(key);
    if (value) query[key] = value;
  }

  // camelCase aliases used by some hooks
  const clientId = params.get("clientId");
  if (clientId && !query.client_id) query.client_id = clientId;
  const doctorId = params.get("doctorId");
  if (doctorId && !query.doctor_id) query.doctor_id = doctorId;

  // tag_ids[] may appear multiple times
  const tagIds = params.getAll("tag_ids[]");
  if (tagIds.length) {
    tagIds.forEach((id, index) => {
      query[`tag_ids[${index}]`] = id;
    });
  }

  return query;
}
