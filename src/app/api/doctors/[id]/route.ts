import { NextRequest, NextResponse } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const response = await backendFetch(`/doctors/${id}`, {
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

async function update(req: NextRequest, id: string): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    // Laravel cannot parse multipart bodies on PUT; use POST + method spoofing.
    formData.set("_method", "PUT");
    const response = await backendFetch(`/doctors/${id}`, {
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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return update(req, id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return update(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const response = await backendFetch(`/doctors/${id}`, {
      method: "DELETE",
      token: getToken(req),
    });
    // Backend returns 204 with an empty body; proxyJsonResponse handles it
    // without attempting to parse JSON.
    return proxyJsonResponse(response);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
