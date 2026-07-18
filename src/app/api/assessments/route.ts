import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await backendFetch("/assessments", {
    token: getToken(req),
    query: listQueryFromRequest(req),
  });

  return proxyJsonResponse(response, { normalizeList: true });
}

export async function POST(req: NextRequest) {
  const response = await backendFetch("/assessments", {
    method: "POST",
    token: getToken(req),
    body: JSON.stringify(await req.json()),
  });

  return proxyJsonResponse(response);
}
