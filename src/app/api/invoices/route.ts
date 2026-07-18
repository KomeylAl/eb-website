import {
  backendFetch,
  getToken,
  proxyJsonResponse,
} from "@/lib/backend";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = getToken(req);
  if (!token) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const response = await backendFetch("/invoices", { token });
  return proxyJsonResponse(response);
}
