import { NextRequest } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const formData = await req.formData();
  formData.set("_method", "PUT");
  const response = await backendFetch(`/departments/${slug}`, {
    method: "POST",
    token: getToken(req),
    body: formData,
    isFormData: true,
  });
  return proxyJsonResponse(response);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const response = await backendFetch(`/departments/${slug}`, {
    method: "DELETE",
    token: getToken(req),
  });
  return proxyJsonResponse(response);
}
