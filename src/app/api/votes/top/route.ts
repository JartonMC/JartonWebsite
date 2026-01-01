import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function utcMonthKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`; // e.g. 2026-01
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = (searchParams.get("period") || "current").toLowerCase();
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "10", 10), 1), 50);

  const key =
    period === "monthly"
      ? `votes:leaderboard:${utcMonthKey()}`
      : "votes:leaderboard";

  const top = await redis.zrange(key, 0, limit - 1, {
    rev: true,
    withScores: true,
  });

  const formatted: { username: string; votes: number }[] = [];
  for (let i = 0; i < top.length; i += 2) {
    formatted.push({
      username: String(top[i]),
      votes: Number(top[i + 1]),
    });
  }

  return NextResponse.json({
    version: "top-route-v3",
    period,
    keyUsed: key,
    generatedUtc: new Date().toISOString(),
    top: formatted,
  });
}
