import { NextRequest } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  const { id, participantId } = await params;
  const response = await backendFetch(
    `/workshops/${id}/participants/${participantId}`,
    { method: "DELETE", token: getToken(req) }
  );
  return proxyJsonResponse(response);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  const { id, participantId } = await params;
  const response = await backendFetch(
    `/workshops/${id}/participants/${participantId}`,
    {
      method: "PUT",
      token: getToken(req),
      body: JSON.stringify(await req.json()),
    }
  );
  return proxyJsonResponse(response);
}
