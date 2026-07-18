import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken, normalizeUser } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const token = getToken(req);

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const response = await backendFetch("/auth/me", {
      method: "GET",
      token,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    const user = normalizeUser(payload?.data ?? payload);

    return NextResponse.json(
      {
        message: payload.message,
        data: user,
        // backward-compatible for callers expecting user at root
        ...user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
