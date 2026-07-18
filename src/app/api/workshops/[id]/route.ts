import { NextRequest } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/workshops/${id}`, {
    token: getToken(req),
  });
  return proxyJsonResponse(response);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/workshops/${id}`, {
    method: "DELETE",
    token: getToken(req),
  });
  return proxyJsonResponse(response);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await req.formData();
  formData.set("_method", "PUT");
  const response = await backendFetch(`/workshops/${id}`, {
    method: "POST",
    token: getToken(req),
    body: formData,
    isFormData: true,
  });
  return proxyJsonResponse(response);
}
