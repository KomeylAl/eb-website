import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const response = await backendFetch(`/admins/${id}`, {
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}

async function updateAdmin(
  req: NextRequest,
  { params }: RouteContext,
  method: "PUT" | "PATCH"
) {
  const { id } = await params;
  const { role, ...body } = await req.json();
  const response = await backendFetch(`/admins/${id}`, {
    method,
    token: getToken(req),
    body: JSON.stringify({
      ...body,
      admin_role: body.admin_role ?? role,
    }),
  });

  return proxyJsonResponse(response);
}

export function PUT(req: NextRequest, context: RouteContext) {
  return updateAdmin(req, context, "PUT");
}

export function PATCH(req: NextRequest, context: RouteContext) {
  return updateAdmin(req, context, "PATCH");
}

// Keep the existing UI's POST call compatible while using backend PUT.
export function POST(req: NextRequest, context: RouteContext) {
  return updateAdmin(req, context, "PUT");
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params;
  const response = await backendFetch(`/admins/${id}`, {
    method: "DELETE",
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}
