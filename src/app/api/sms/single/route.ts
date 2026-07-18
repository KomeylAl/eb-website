import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { phone, message, text } = await req.json();
  const response = await backendFetch("/sms/single", {
    method: "POST",
    token: getToken(req),
    body: JSON.stringify({ phone, message: message ?? text }),
  });

  return proxyJsonResponse(response);
}
