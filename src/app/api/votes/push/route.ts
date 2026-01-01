import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const username = body?.username;

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  await redis.zincrby("votes:leaderboard", 1, username);

  return NextResponse.json({ success: true, username });
}
