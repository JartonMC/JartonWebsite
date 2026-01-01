// src/app/api/votes/top/route.ts
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "edge";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function getMonthlyKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `votes:leaderboard:${y}-${m}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get("period") || "monthly").toLowerCase();

    // monthly = your site table
    // current = your old "all-time/current" key
    const key =
      period === "current" || period === "all" || period === "alltime"
        ? "votes:leaderboard"
        : getMonthlyKey();

    // Upstash zrange withScores returns [member, score, member, score...]
    const raw = await redis.zrange(key, 0, 9, { rev: true, withScores: true });

    const top: Array<{ username: string; votes: number }> = [];
    for (let i = 0; i < raw.length; i += 2) {
      const username = String(raw[i]);
      const votes = Number(raw[i + 1] ?? 0);
      if (username) top.push({ username, votes });
    }

    return NextResponse.json({
      version: "top-route-v2-1767282135",
      period: period === "current" || period === "all" || period === "alltime" ? "current" : "monthly",
        generatedUtc: new Date().toISOString(),
        top,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        period: "error",
        generatedUtc: new Date().toISOString(),
        top: [],
        error: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
