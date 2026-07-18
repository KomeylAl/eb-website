import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/assessments/${id}`, {
    method: "DELETE",
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}
