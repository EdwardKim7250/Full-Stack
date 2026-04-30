import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Scenario from "@/lib/models/Scenario";
import { nanoid } from "nanoid";

// GET /api/scenarios?code=abc123 — fetch a saved scenario
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing share code" }, { status: 400 });
  }

  try {
    await connectDB();
    const scenario = await Scenario.findOne({ share_code: code });
    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }
    return NextResponse.json({ data: scenario });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch scenario" }, { status: 500 });
  }
}

// POST /api/scenarios — save a new scenario, return share code
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { selections, projected_odds } = body;

    if (!selections) {
      return NextResponse.json({ error: "Missing selections" }, { status: 400 });
    }

    await connectDB();

    const share_code = nanoid(8);
    const scenario = await Scenario.create({
      share_code,
      selections,
      projected_odds: projected_odds || [],
    });

    return NextResponse.json({
      data: { share_code: scenario.share_code },
      share_url: `${process.env.NEXT_PUBLIC_APP_URL}/simulator?code=${share_code}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save scenario" }, { status: 500 });
  }
}
