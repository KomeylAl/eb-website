import { NextRequest, NextResponse } from "next/server";
import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const response = await backendFetch("/doctors", {
      method: "POST",
      token: getToken(req),
      body: formData,
      isFormData: true,
    });
    return proxyJsonResponse(response);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
