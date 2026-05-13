// src/app/api/city/route.ts
import { NextResponse } from "next/server";
import { CITIES } from "@/lib/cities";

export async function GET() {
  return NextResponse.json(CITIES);
}
