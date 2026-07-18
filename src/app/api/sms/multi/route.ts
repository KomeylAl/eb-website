import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { phones, message, text } = await req.json();
  const response = await backendFetch("/sms/multi", {
    method: "POST",
    token: getToken(req),
    body: JSON.stringify({ phones, message: message ?? text }),
  });

  return proxyJsonResponse(response);
}
