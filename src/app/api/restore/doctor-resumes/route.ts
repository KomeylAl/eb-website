import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message:
        "This endpoint has been removed: the backend no longer provides a doctor-resumes restore.",
    },
    { status: 410 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      message:
        "This endpoint has been removed: the backend no longer provides a doctor-resumes restore.",
    },
    { status: 410 }
  );
}
