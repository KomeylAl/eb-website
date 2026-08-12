import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/comments/${id}`, {
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/comments/${id}`, {
    method: "PATCH",
    token: getToken(req),
    body: JSON.stringify(await req.json()),
  });

  return proxyJsonResponse(response);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/comments/${id}`, {
    method: "DELETE",
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}
