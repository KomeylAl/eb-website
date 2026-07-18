import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await backendFetch("/admins", {
    token: getToken(req),
    query: listQueryFromRequest(req),
  });

  return proxyJsonResponse(response, { normalizeList: true });
}

export async function POST(req: NextRequest) {
  const { role, ...body } = await req.json();
  const response = await backendFetch("/admins", {
    method: "POST",
    token: getToken(req),
    body: JSON.stringify({
      ...body,
      admin_role: body.admin_role ?? role,
    }),
  });

  return proxyJsonResponse(response);
}
