import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = body?.username;

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "Invalid username" },
        { status: 400 }
      );
    }

    // Increment vote count
    await redis.zincrby("votes:leaderboard", 1, username);

    return NextResponse.json({
      success: true,
      username,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to record vote" },
      { status: 500 }
    );
  }
}
