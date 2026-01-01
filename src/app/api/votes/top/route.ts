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
  return `${y}-${m}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = (searchParams.get("period") || "monthly").toLowerCase();
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "10", 10), 1), 50);

  const key =
    period === "current" || period === "all" || period === "alltime"
      ? "votes:leaderboard"
      : `votes:leaderboard:${utcMonthKey()}`;

  const raw = await redis.zrange(key, 0, limit - 1, { rev: true, withScores: true });

  const list: { username: string; votes: number }[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    list.push({ username: String(raw[i]), votes: Number(raw[i + 1]) });
  }

  return NextResponse.json(
    {
      period: period === "current" || period === "all" || period === "alltime" ? "current" : "monthly",
      generatedUtc: new Date().toISOString(),

      // ✅ your canonical field
      top: list,

      // ✅ compatibility fields (in case your vote page expects a different name)
      voters: list,
      data: list,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
