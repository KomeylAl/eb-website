import { NextRequest } from "next/server";
import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await backendFetch(`/notifications/${id}/read`, {
    method: "POST",
    token: getToken(req),
  });
  return proxyJsonResponse(response);
}
