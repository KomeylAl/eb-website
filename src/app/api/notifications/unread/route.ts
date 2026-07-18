import { NextRequest } from "next/server";
import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";

export async function GET(req: NextRequest) {
  const response = await backendFetch("/notifications/unread", {
    token: getToken(req),
    query: listQueryFromRequest(req),
  });
  return proxyJsonResponse(response, { normalizeList: true });
}
