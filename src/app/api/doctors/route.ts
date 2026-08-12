import { NextRequest, NextResponse } from "next/server";
import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";

/** Public doctor list (e.g. online appointment form). */
export async function GET(req: NextRequest) {
  try {
    const response = await backendFetch("/doctors", {
      token: getToken(req),
      query: listQueryFromRequest(req),
    });
    return proxyJsonResponse(response, { normalizeList: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
