import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  ctx: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const paramsId = ctx.params.id;

  return NextResponse.json({ message: "Hello World", id, paramsId });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}
