import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

// Side-effectful GET (creates a backup); never cache or prefetch.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const response = await backendFetch("/backup/posts", {
      token: getToken(req),
    });
    if (!response.ok) return proxyJsonResponse(response);

    const payload = await response.json();
    // Expose `url` at top level for hook compatibility.
    return NextResponse.json(
      { ...payload, url: payload?.data?.url },
      { status: response.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
