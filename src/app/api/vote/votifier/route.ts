import { NextRequest, NextResponse } from "next/server";
import { addVote } from "@/lib/votesStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const username = (body.username || body.user || "").toString();
    const source = (body.source || "votifier").toString();
    if (!username) {
      return NextResponse.json({ ok: false, error: "missing username" }, { status: 400 });
    }
    addVote({ source, usernameOrId: username, receivedAt: Date.now() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


