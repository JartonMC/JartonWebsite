import { NextResponse } from "next/server";
import { getMonthlyLeaderboard } from "@/lib/votesStore";

export async function GET() {
  return NextResponse.json({ leaderboard: getMonthlyLeaderboard(50) });
}


