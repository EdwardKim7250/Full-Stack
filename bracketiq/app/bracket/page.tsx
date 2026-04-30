"use client";

import { useEffect, useState } from "react";

//
type TeamUI = {
  id: string;
  name: string;
  seed: number;
  color: string;
  pct: number;
  inj: boolean;
};

type Series = {
  id: string;
  conf: "East" | "West";
  label: string;
  home: TeamUI;
  away: TeamUI;
};

//
const COLORS = [
  "#007AC1", "#C8102E", "#007A33", "#552583",
  "#0E2240", "#860038", "#006BB6", "#E03A3E",
  "#CE1141", "#E56020"
];

//
async function getStandings() {
  const res = await fetch(
    "https://site.web.api.espn.com/apis/v2/sports/basketball/nba/standings",
    { cache: "no-store" }
  );

  const data = await res.json();
  const children = data?.children ?? [];

  function extract(conf: string) {
    const confData = children.find((c: any) =>
      c?.name?.toLowerCase?.().includes(conf)
    );

    const entries = confData?.standings?.entries ?? [];

    return entries
      .map((t: any, i: number) => {
        const stats = t?.stats ?? [];

        const wins =
          stats.find((s: any) => s.name === "wins")?.value ?? 0;

        const losses =
          stats.find((s: any) => s.name === "losses")?.value ?? 0;

        const seed =
          stats.find((s: any) => s.name === "playoffSeed")?.value ?? i + 1;

        const total = wins + losses;

        return {
          id: t?.team?.id ?? `${conf}-${seed}`,
          name: t?.team?.displayName ?? "Unknown",
          seed,
          color: COLORS[i % COLORS.length],
          pct: total ? (wins / total) * 100 : 50,
          inj: false,
        };
      })
      .sort((a: any, b: any) => a.seed - b.seed)
      .slice(0, 8);
  }

  return {
    east: extract("eastern"),
    west: extract("western"),
  };
}

//
function buildSeries(east: TeamUI[], west: TeamUI[]): Series[] {
  return [
    { id: "e1", conf: "East", label: "Series 1", home: east[0], away: east[7] },
    { id: "e2", conf: "East", label: "Series 2", home: east[1], away: east[6] },
    { id: "e3", conf: "East", label: "Series 3", home: east[2], away: east[5] },
    { id: "e4", conf: "East", label: "Series 4", home: east[3], away: east[4] },

    { id: "w1", conf: "West", label: "Series 5", home: west[0], away: west[7] },
    { id: "w2", conf: "West", label: "Series 6", home: west[1], away: west[6] },
    { id: "w3", conf: "West", label: "Series 7", home: west[2], away: west[5] },
    { id: "w4", conf: "West", label: "Series 8", home: west[3], away: west[4] },
  ];
}

//
function calculateChampionshipOdds(teams: TeamUI[]) {
  const scores = teams.map((t) => {
    const x = Math.max(t.pct, 1) / 100;
    return Math.log(x / (1 - x));
  });

  const weights = scores.map((s) => Math.exp(s));

  const total = weights.reduce((a, b) => a + b, 0);

  return teams.map((t, i) => ({
    ...t,
    championship_pct: +((weights[i] / total) * 100).toFixed(1),
  }));
}

//
export default function Simulator() {
  const [series, setSeries] = useState<Series[]>([]);
  const [sel, setSel] = useState<Record<string, string>>({});
  const [eliminated, setEliminated] = useState<Record<string, string[]>>({});

  const pick = (sid: string, tid: string) => {
    setSel((p) => ({ ...p, [sid]: tid }));

    setEliminated((prev) => {
      const match = series.find((s) => s.id === sid);
      if (!match) return prev;

      const loser =
        match.home.id === tid ? match.away.id : match.home.id;

      return {
        ...prev,
        [sid]: [loser],
      };
    });
  };

  const reset = () => {
    setSel({});
    setEliminated({});
  };

  useEffect(() => {
    getStandings().then(({ east, west }) => {
      setSeries(buildSeries(east, west));
    });
  }, []);

  const BASE_ODDS = series.flatMap((s) => [s.home, s.away]);

  const selectedSet = new Set(Object.values(sel));
  const eliminatedSet = new Set(Object.values(eliminated).flat());

  const rawOdds = BASE_ODDS.map((o) => {
    const isSelected = selectedSet.has(o.id);
    const isEliminated = eliminatedSet.has(o.id);

    let pct = o.pct;

    if (isEliminated) pct = 0;
    if (isSelected) pct += 2;

    return { ...o, pct };
  });

  const odds = calculateChampionshipOdds(rawOdds).sort(
    (a, b) => b.championship_pct - a.championship_pct
  );

  const picked = Object.keys(sel).length;

  return (
    <div style={{ padding: "20px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 500 }}>Series Simulator</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Realistic championship probabilities (fixed model)
          </div>
        </div>

        <button
          onClick={reset}
          style={{
            fontSize: 12,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            background: "#fff",
          }}
        >
          Reset
        </button>
      </div>

      {/* SERIES */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {["East", "West"].map((conf) => (
          <div key={conf}>
            <div style={{ fontSize: 10, marginBottom: 10 }}>{conf}ern Conference</div>

            {series
              .filter((s) => s.conf === conf)
              .map((sr) => (
                <div key={sr.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 10 }}>
                  <div style={{ padding: "6px 12px", fontSize: 10, background: "#f9fafb" }}>
                    {sr.label}
                  </div>

                  {[sr.home, sr.away].map((t) => {
                    const isElim = eliminated[sr.id]?.includes(t.id);

                    return (
                      <div
                        key={`${sr.id}-${t.id}`}
                        onClick={() => pick(sr.id, t.id)}
                        style={{ padding: "8px 12px", cursor: "pointer" }}
                      >
                        {t.name} — {t.pct.toFixed(1)}% {isElim ? "(0%)" : ""}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* ODDS */}
      <div style={{ marginTop: 30, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <div style={{ padding: 12 }}>
          Championship Odds — {picked}/8 picked
        </div>

        {odds.map((o, i) => (
          <div
            key={o.id}
            style={{ display: "flex", justifyContent: "space-between", padding: 10 }}
          >
            <span>{i + 1}. {o.name}</span>
            <span>{o.championship_pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}