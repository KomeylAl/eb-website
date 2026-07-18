import { backendFetch, getToken, proxyJsonResponse } from "@/lib/backend";
import { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

function mapAppointmentBody(body: Record<string, unknown>) {
  const { doctor, client, amount_status, ...rest } = body;
  return {
    ...rest,
    doctor_id: rest.doctor_id ?? doctor,
    client_id: rest.client_id ?? client,
    payment_status: rest.payment_status ?? amount_status,
  };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const response = await backendFetch(`/appointments/${id}`, {
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}

async function updateAppointment(
  req: NextRequest,
  { params }: RouteContext,
  method: "PUT" | "PATCH"
) {
  const { id } = await params;
  const response = await backendFetch(`/appointments/${id}`, {
    method,
    token: getToken(req),
    body: JSON.stringify(mapAppointmentBody(await req.json())),
  });

  return proxyJsonResponse(response);
}

export function PUT(req: NextRequest, context: RouteContext) {
  return updateAppointment(req, context, "PUT");
}

export function PATCH(req: NextRequest, context: RouteContext) {
  return updateAppointment(req, context, "PATCH");
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const response = await backendFetch(`/appointments/${id}`, {
    method: "DELETE",
    token: getToken(req),
  });

  return proxyJsonResponse(response);
}