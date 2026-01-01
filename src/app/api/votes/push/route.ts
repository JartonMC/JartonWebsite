import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const AUTH_TOKEN = process.env.VOTE_AUTH_TOKEN;

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");

  if (!AUTH_TOKEN || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { username } = body;

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const key = `votes:${username.toLowerCase()}`;

  await redis.incr(key);
  await redis.zincrby("votes:leaderboard", 1, username.toLowerCase());

  return NextResponse.json({ success: true });
}
