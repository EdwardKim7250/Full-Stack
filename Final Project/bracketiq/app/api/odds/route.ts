import { NextRequest, NextResponse } from "next/server";
import {
  fetchStandings,
  fetchInjuries,
  calculateOdds,
  normalizeOdds,
} from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const overridesParam = searchParams.get("overrides");

    let overrides;

    try {
      overrides = overridesParam ? JSON.parse(overridesParam) : undefined;
    } catch {
      overrides = undefined;
    }

    const [standings, injuries] = await Promise.all([
      fetchStandings(),
      fetchInjuries(),
    ]);

    const raw = calculateOdds(standings, injuries, overrides);
    const normalized = normalizeOdds(raw);

    const sorted = [...normalized].sort(
      (a, b) => b.championship_pct - a.championship_pct
    );

    return NextResponse.json({
      data: sorted,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("ODDS API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to calculate odds",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}