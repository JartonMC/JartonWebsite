import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  const top = await redis.zrange("votes:leaderboard", 0, 9, {
    rev: true,
    withScores: true,
  });

  const formatted = [];

  for (let i = 0; i < top.length; i += 2) {
    formatted.push({
      username: top[i],
      votes: Number(top[i + 1]),
    });
  }

  return NextResponse.json({
    period: "current",
    generatedUtc: new Date().toISOString(),
    top: formatted,
  });
}
