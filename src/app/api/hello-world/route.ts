import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  return NextResponse.json({ message: "Hello World", id });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}
