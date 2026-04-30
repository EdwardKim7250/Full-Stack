export async function GET() {
  try {
    const res = await fetch(
      "https://api.balldontlie.io/v1/games?seasons[]=2023&per_page=100",
      {
        cache: "no-store",
        headers: {
          Authorization: process.env.BALLDONTLIE_API_KEY || "",
        },
      }
    );

    const data = await res.json();
    const games = data?.data ?? [];

    const series: Record<string, { homeWins: number; awayWins: number }> = {};

    for (const game of games) {
      const home = game.home_team?.full_name;
      const away = game.visitor_team?.full_name;

      const homeScore = game.home_team_score;
      const awayScore = game.visitor_team_score;

      if (!home || !away) continue;
      if (homeScore == null || awayScore == null) continue;
      if (homeScore === awayScore) continue;

      const key = [home, away].sort().join("::");

      if (!series[key]) {
        series[key] = { homeWins: 0, awayWins: 0 };
      }

      const [teamA] = key.split("::");

      if (homeScore > awayScore) {
        if (home === teamA) series[key].homeWins++;
        else series[key].awayWins++;
      } else {
        if (away === teamA) series[key].homeWins++;
        else series[key].awayWins++;
      }
    }

    const filtered: typeof series = {};

    for (const key in series) {
      const s = series[key];
      if (s.homeWins + s.awayWins >= 2) {
        filtered[key] = s;
      }
    }

    return Response.json(filtered);
  } catch (err) {
    return Response.json({ error: "failed" }, { status: 500 });
  }
}