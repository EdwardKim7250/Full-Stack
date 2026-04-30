"use client";

import { useEffect, useState } from "react";

//
type TeamUI = {
  id: string; // ✅ FIXED: must be globally unique
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
          id: t?.team?.id ?? `${conf}-${seed}`, // ✅ FIXED GLOBAL UNIQUE ID
          name: t?.team?.displayName ?? "Unknown",
          seed,
          color: COLORS[i % COLORS.length],
          pct: total ? Math.round((wins / total) * 100) : 50,
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
    { id: "e1", conf: "East", label: "First Round - Series 1", home: east[0], away: east[7] },
    { id: "e2", conf: "East", label: "First Round - Series 2", home: east[1], away: east[6] },
    { id: "e3", conf: "East", label: "First Round - Series 3", home: east[2], away: east[5] },
    { id: "e4", conf: "East", label: "First Round - Series 4", home: east[3], away: east[4] },

    { id: "w1", conf: "West", label: "First Round - Series 5", home: west[0], away: west[7] },
    { id: "w2", conf: "West", label: "First Round - Series 6", home: west[1], away: west[6] },
    { id: "w3", conf: "West", label: "First Round - Series 7", home: west[2], away: west[5] },
    { id: "w4", conf: "West", label: "First Round - Series 8", home: west[3], away: west[4] },
  ];
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


//
  const BASE_ODDS = series.flatMap((s) => [s.home, s.away]);

  const selectedSet = new Set(Object.values(sel));
  const eliminatedSet = new Set(Object.values(eliminated).flat());

  const odds = BASE_ODDS.map((o) => {
    const isSelected = selectedSet.has(o.id);
    const isEliminated = eliminatedSet.has(o.id);

    let pct = o.pct;

    if (isEliminated) pct = 0;
    if (isSelected) pct += 2.1;

    return {
      ...o,
      pct: +pct.toFixed(1),
      delta: isSelected ? 2.1 : 0,
    };
  }).sort((a, b) => b.pct - a.pct);

  const s = {
    background: "#fff",
    border: "0.5px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden" as const,
    marginBottom: 10,
  };

  const picked = Object.keys(sel).length;

  return (
    <div style={{ padding: "20px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 500 }}>Series Simulator</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Pick winners — losers go to 0%
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

      {/* SERIES UI (UNCHANGED) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {["East", "West"].map((conf) => (
          <div key={conf}>
            <div style={{ fontSize: 10, marginBottom: 10 }}>{conf}ern Conference</div>

            {series
              .filter((s) => s.conf === conf)
              .map((sr) => (
                <div key={sr.id} style={s}>
                  <div style={{ padding: "6px 12px", background: "#f9fafb", fontSize: 10 }}>
                    {sr.label}
                  </div>

                  {[sr.home, sr.away].map((t) => {
                    const selected = sel[sr.id] === t.id;
                    const isElim = eliminated[sr.id]?.includes(t.id);

                    return (
                      <div
                        key={`${sr.id}-${t.id}`}
                        onClick={() => pick(sr.id, t.id)}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          background: "#fff",
                        }}
                      >
                        {t.name} — {t.pct}% {isElim ? "(0%)" : ""}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* ODDS UI (UNCHANGED) */}
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
            <span>{o.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}