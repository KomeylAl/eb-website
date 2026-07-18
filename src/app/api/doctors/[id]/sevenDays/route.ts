import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // Backend endpoint has no pagination/query; ignore page/size params.
    const response = await backendFetch(
      `/doctors/${id}/appointments/last-7-days`,
      { token: getToken(req) }
    );
    return proxyJsonResponse(response);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
