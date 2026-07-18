import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const token = getToken(req);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const response = await backendFetch(`/doctors/${id}/password`, {
      method: "POST",
      token,
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });
    return proxyJsonResponse(response);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
