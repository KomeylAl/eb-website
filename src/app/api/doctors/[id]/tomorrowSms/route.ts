import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message:
        "This endpoint has been removed: the backend no longer supports sending tomorrow's appointment SMS from the doctor panel.",
    },
    { status: 410 }
  );
}
