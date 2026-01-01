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

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const raw = typeof body?.username === "string" ? body.username : "";
    const username = raw.trim();

    if (!username || username.length > 32) {
      return NextResponse.json(
        { success: false, error: "Invalid username" },
        { status: 400 }
      );
    }

    const currentKey = "votes:leaderboard";
    const monthKey = `votes:leaderboard:${utcMonthKey()}`;

    await Promise.all([
      redis.zincrby(currentKey, 1, username),
      redis.zincrby(monthKey, 1, username),
    ]);

    return NextResponse.json({
      version: "push-route-v3",
      success: true,
      username,
      keys: { currentKey, monthKey },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
