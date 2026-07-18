import { NextRequest } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; sessionId: string }> }
) {
  const { id, sessionId } = await params;
  const response = await backendFetch(
    `/workshops/${id}/sessions/${sessionId}`,
    { method: "DELETE", token: getToken(req) }
  );
  return proxyJsonResponse(response);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; sessionId: string }> }
) {
  const { id, sessionId } = await params;
  const response = await backendFetch(
    `/workshops/${id}/sessions/${sessionId}`,
    {
      method: "PUT",
      token: getToken(req),
      body: JSON.stringify(await req.json()),
    }
  );
  return proxyJsonResponse(response);
}
