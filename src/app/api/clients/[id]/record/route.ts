import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const response = await backendFetch(`/clients/${id}/medical-record`, {
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}

async function saveRecord(
  req: NextRequest,
  { params }: RouteContext,
  method: "POST" | "PUT"
) {
  const { id } = await params;
  const response = await backendFetch(`/clients/${id}/medical-record`, {
    method,
    token: getToken(req),
    body: await req.formData(),
    isFormData: true,
  });

  return proxyJsonResponse(response);
}

export function POST(req: NextRequest, context: RouteContext) {
  return saveRecord(req, context, "POST");
}

export function PUT(req: NextRequest, context: RouteContext) {
  return saveRecord(req, context, "PUT");
}
