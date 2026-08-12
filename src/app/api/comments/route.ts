import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

/** Public comment submission from site pages. */
export async function POST(req: NextRequest) {
  const response = await backendFetch("/comments", {
    method: "POST",
    token: getToken(req),
    body: JSON.stringify(await req.json()),
  });

  return proxyJsonResponse(response);
}
