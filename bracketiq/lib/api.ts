import axios from "axios";
import { Standing, TeamOdds, Series } from "@/types";

const BASE_URL = "https://api.balldontlie.io/v1";
const API_KEY = process.env.BALLDONTLIE_API_KEY || "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: API_KEY },
});

// Fetch current NBA standings
export async function fetchStandings(): Promise<Standing[]> {
  try {
    const res = await api.get("/standings", {
      params: { season: 2025 },
    });
    return res.data.data || [];
  } catch (err) {
    console.error("Error fetching standings:", err);
    return [];
  }
}

// Fetch team injury info (via BallDontLie or fallback mock)
export async function fetchInjuries() {
  try {
    const res = await api.get("/player_injuries");
    return res.data.data || [];
  } catch {
    // Return mock data if API unavailable
    return MOCK_INJURIES;
  }
}

// Calculate championship odds based on seed, record, and injuries
export function calculateOdds(
  standings: Standing[],
  injuries: any[],
  seriesOverrides?: Record<string, string>
): TeamOdds[] {
  const playoffTeams = standings
    .sort((a, b) => a.conference_rank - b.conference_rank)
    .slice(0, 16); // top 8 from each conf

  return playoffTeams.map((s) => {
    // Base odds: seed-weighted formula
    const seedWeight = 1 / s.conference_rank;
    const winPct = s.wins / (s.wins + s.losses);
    const baseOdds = seedWeight * winPct * 100;

    // Injury penalty: reduce odds if key player out
    const teamInjuries = injuries.filter(
      (i) => i.team?.id === s.team.id && i.status === "Out"
    );
    const injuryPenalty = teamInjuries.length * 2.5;

    // Simulator override boost/penalty
    let overrideDelta = 0;
    if (seriesOverrides) {
      const isSelected = Object.values(seriesOverrides).includes(
        String(s.team.id)
      );
      if (isSelected) overrideDelta = 3;
    }

    const rawPct = Math.max(0.5, baseOdds - injuryPenalty + overrideDelta);

    return {
      team: s.team,
      championship_pct: rawPct,
      conference_pct: rawPct * 2.2,
      round_pct: rawPct * 3.5,
      delta: overrideDelta - injuryPenalty,
    };
  });
}

// Normalize odds so they sum to 100%
export function normalizeOdds(odds: TeamOdds[]): TeamOdds[] {
  const total = odds.reduce((sum, o) => sum + o.championship_pct, 0);
  return odds.map((o) => ({
    ...o,
    championship_pct: parseFloat(((o.championship_pct / total) * 100).toFixed(1)),
  }));
}

// Mock injury data fallback
const MOCK_INJURIES = [
  { player_name: "Nikola Jokic", team: { id: 7 }, status: "Questionable", injury_type: "Knee soreness" },
  { player_name: "Kawhi Leonard", team: { id: 12 }, status: "Out", injury_type: "Load management" },
  { player_name: "Joel Embiid", team: { id: 20 }, status: "Probable", injury_type: "Knee" },
  { player_name: "Anthony Davis", team: { id: 14 }, status: "Questionable", injury_type: "Back tightness" },
];
