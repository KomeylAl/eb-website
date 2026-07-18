import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await backendFetch("/payments", {
    token: getToken(req),
    query: listQueryFromRequest(req),
  });

  return proxyJsonResponse(response, { normalizeList: true });
}
