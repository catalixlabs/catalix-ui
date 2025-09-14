import { NextResponse } from "next/server";
import registry from "../../../../registry.json";

export async function GET() {
  return NextResponse.json(registry);
}
