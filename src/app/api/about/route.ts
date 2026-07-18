import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await backendFetch("/about", {
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  if (!formData.has("latitude") && formData.has("lat")) {
    formData.set("latitude", formData.get("lat")!);
  }
  if (!formData.has("longitude") && formData.has("long")) {
    formData.set("longitude", formData.get("long")!);
  }
  if (!formData.has("logo") && formData.has("image")) {
    formData.set("logo", formData.get("image")!);
  }

  formData.delete("lat");
  formData.delete("long");
  formData.delete("image");

  const response = await backendFetch("/about", {
    method: "POST",
    token: getToken(req),
    body: formData,
    isFormData: true,
  });

  return proxyJsonResponse(response);
}
