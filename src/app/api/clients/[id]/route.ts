import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const response = await backendFetch(`/clients/${id}`, {
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}

async function updateClient(
  req: NextRequest,
  { params }: RouteContext,
  method: "PUT" | "PATCH"
) {
  const { id } = await params;
  const response = await backendFetch(`/clients/${id}`, {
    method,
    token: getToken(req),
    body: JSON.stringify(await req.json()),
  });

  return proxyJsonResponse(response);
}

export function PUT(req: NextRequest, context: RouteContext) {
  return updateClient(req, context, "PUT");
}

export function PATCH(req: NextRequest, context: RouteContext) {
  return updateClient(req, context, "PATCH");
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const response = await backendFetch(`/clients/${id}`, {
    method: "DELETE",
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}
