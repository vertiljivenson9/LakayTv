import { NextResponse } from "next/server";

// Required for Cloudflare Pages
export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({ message: "LakayTV API - Streaming Haitien" });
}