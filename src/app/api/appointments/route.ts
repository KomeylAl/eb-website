import {
  backendFetch,
  getToken,
  listQueryFromRequest,
  proxyJsonResponse,
} from "@/lib/backend";
import { NextRequest } from "next/server";

function mapAppointmentBody(body: Record<string, unknown>) {
  const { doctor, client, amount_status, ...rest } = body;
  return {
    ...rest,
    doctor_id: rest.doctor_id ?? doctor,
    client_id: rest.client_id ?? client,
    payment_status: rest.payment_status ?? amount_status,
  };
}

export async function GET(req: NextRequest) {
  const response = await backendFetch("/appointments", {
    token: getToken(req),
    query: listQueryFromRequest(req),
  });

  return proxyJsonResponse(response, { normalizeList: true });
}

export async function POST(req: NextRequest) {
  const response = await backendFetch("/appointments", {
    method: "POST",
    token: getToken(req),
    body: JSON.stringify(mapAppointmentBody(await req.json())),
  });

  return proxyJsonResponse(response);
}
