import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/comments/${id}/unapprove`, {
    method: "PATCH",
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}
