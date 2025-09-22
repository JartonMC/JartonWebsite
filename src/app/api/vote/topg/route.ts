import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";
import { addVote } from "@/lib/votesStore";

type VoteEvent = {
  source: "topg";
  usernameOrId: string;
  voterIp: string;
  receivedAt: number;
};

// Very small in-memory store. Replace with DB in production.
const votes: VoteEvent[] = [];

async function resolveTopgIp(): Promise<string> {
  try {
    const addr = await dns.lookup("monitor.topg.org");
    return addr.address;
  } catch {
    return "";
  }
}

export async function GET(req: NextRequest) {
  // TopG calls as GET with params: p_resp, ip
  const { searchParams } = new URL(req.url);
  const pResp = searchParams.get("p_resp") || "";
  const ipParam = searchParams.get("ip") || "";

  // Basic sanitization (letters, numbers, underscore, hyphen)
  const usernameOrId = pResp.replace(/[^A-Za-z0-9_\-]+/g, "");
  const voterIp = ipParam.replace(/[^0-9\.]+/g, "");

  // Verify source IP against monitor.topg.org
  const requestIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.ip || "";
  const topgIp = await resolveTopgIp();

  // Allow skipping IP check locally via env
  const skipIpCheck = process.env.TOPG_SKIP_IP_CHECK === "true";

  if (!skipIpCheck && topgIp && requestIp !== topgIp) {
    return NextResponse.json({ ok: false, error: "Invalid source IP" }, { status: 403 });
  }

  if (!usernameOrId) {
    return NextResponse.json({ ok: false, error: "Missing p_resp" }, { status: 400 });
  }

  // Optional: enforce 12h cooldown per user
  const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
  const recent = votes.findLast(v => v.usernameOrId === usernameOrId && v.receivedAt >= twelveHoursAgo);
  if (!process.env.SKIP_VOTE_COOLDOWN && recent) {
    // Still accept but mark as duplicate within window
    return NextResponse.json({ ok: true, duplicate: true });
  }

  addVote({ source: "topg", usernameOrId, voterIp, receivedAt: Date.now() });

  return NextResponse.json({ ok: true });
}

// Snapshot moved to shared lib


