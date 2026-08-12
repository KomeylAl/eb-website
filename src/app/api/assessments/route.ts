import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

/** Public free assessment / appointment request from the site. */
export async function POST(req: NextRequest) {
  const response = await backendFetch("/assessments", {
    method: "POST",
    token: getToken(req),
    body: JSON.stringify(await req.json()),
  });

  return proxyJsonResponse(response);
}
