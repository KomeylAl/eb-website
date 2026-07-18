import { NextRequest } from "next/server";
import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";

export async function GET(req: NextRequest) {
  const response = await backendFetch("/departments", {
    token: getToken(req),
    query: listQueryFromRequest(req),
  });
  return proxyJsonResponse(response, { normalizeList: true });
}

export async function POST(req: NextRequest) {
  const response = await backendFetch("/departments", {
    method: "POST",
    token: getToken(req),
    body: await req.formData(),
    isFormData: true,
  });
  return proxyJsonResponse(response);
}
