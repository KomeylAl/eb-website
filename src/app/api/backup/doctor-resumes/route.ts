import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message:
        "This endpoint has been removed: the backend no longer provides a doctor-resumes backup.",
    },
    { status: 410 }
  );
}
