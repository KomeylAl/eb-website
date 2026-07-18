import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const response = await backendFetch(`/doctors/${id}/resume`, {
      token: getToken(req),
    });
    return proxyJsonResponse(response);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const formData = await req.formData();
    const response = await backendFetch(`/doctors/${id}/resume`, {
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
