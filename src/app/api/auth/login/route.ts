import { NextRequest, NextResponse } from "next/server";
import { backendFetch, normalizeUser } from "@/lib/backend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, password, type = "admin" } = body;

    const response = await backendFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, password, type }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    const token = payload?.data?.token;
    const user = normalizeUser(payload?.data?.user);

    if (!token || !user) {
      return NextResponse.json(
        { message: "Invalid login response from server" },
        { status: 502 }
      );
    }

    const role = user.admin_role ?? user.role ?? "";

    const res = NextResponse.json(
      {
        message: payload.message,
        data: {
          token,
          token_type: payload?.data?.token_type ?? "Bearer",
          user,
        },
        // backward-compatible top-level fields for existing login page
        user,
        access_token: token,
        token,
      },
      { status: 200 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7200,
      sameSite: "lax",
    });
    res.cookies.set("role", String(role), {
      httpOnly: true,
      path: "/",
      maxAge: 7200,
      sameSite: "lax",
    });

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
