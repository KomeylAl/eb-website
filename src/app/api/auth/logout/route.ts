import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const token = getToken(req);

  try {
    if (token) {
      await backendFetch("/auth/logout", {
        method: "POST",
        token,
      });
    }

    const res = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    res.cookies.delete("token");
    res.cookies.delete("role");

    return res;
  } catch (error: any) {
    const res = NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
    res.cookies.delete("token");
    res.cookies.delete("role");
    return res;
  }
}
