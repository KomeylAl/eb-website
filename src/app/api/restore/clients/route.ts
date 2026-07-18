import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    // Accept either a raw array or a `{ data: [...] }` envelope.
    const items = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.data)
      ? raw.data
      : null;
    if (!items) {
      return NextResponse.json(
        { message: "Body must be an array or { data: [...] }" },
        { status: 400 }
      );
    }

    const body: Record<string, unknown> = { data: items };
    if (!Array.isArray(raw) && raw?.type) body.type = raw.type;

    const response = await backendFetch("/restore/clients", {
      method: "POST",
      token: getToken(req),
      body: JSON.stringify(body),
    });
    return proxyJsonResponse(response);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
