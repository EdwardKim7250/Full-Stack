import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "all";

  try {
    if (!NEWS_API_KEY) throw new Error("No API key");

    const res = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "NBA playoffs 2026",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 20,
        apiKey: NEWS_API_KEY,
      },
    });

    const articles = res.data.articles.map((a: any, i: number) => ({
      id: String(i),
      title: a.title,
      description: a.description,
      url: a.url,
      source: a.source.name,
      published_at: a.publishedAt,
      category: inferCategory(a.title + " " + a.description),
    }));

    const filtered =
      category === "all"
        ? articles
        : articles.filter((a: any) => a.category === category);

    return NextResponse.json({ data: filtered });
  } catch {
    // Return mock news if API unavailable
    return NextResponse.json({ data: MOCK_NEWS });
  }
}

function inferCategory(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("injur") || lower.includes("questionable") || lower.includes("out")) return "injury";
  if (lower.includes("game") && (lower.includes("win") || lower.includes("loss") || lower.includes("recap"))) return "recap";
  if (lower.includes("odds") || lower.includes("probability") || lower.includes("favorite")) return "odds";
  return "general";
}

const MOCK_NEWS = [
  {
    id: "1", category: "injury",
    title: "Nikola Jokic listed as questionable for Game 2 with knee soreness",
    description: "The Nuggets star sat out practice Thursday and is being monitored ahead of their series against Minnesota.",
    url: "#", source: "ESPN", published_at: new Date().toISOString(),
  },
  {
    id: "2", category: "recap",
    title: "Wembanyama drops 38 pts as Spurs take Game 1 over Rockets 114–98",
    description: "Victor Wembanyama was dominant in his playoff debut, combining 38 points, 12 rebounds, and 6 blocks.",
    url: "#", source: "NBA.com", published_at: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: "3", category: "odds",
    title: "Joel Embiid cleared to play — 76ers championship odds jump",
    description: "Philadelphia officially activated Embiid ahead of Game 1 against Detroit, significantly boosting their chances.",
    url: "#", source: "The Athletic", published_at: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: "4", category: "recap",
    title: "OKC Thunder rout Clippers 121–99 in dominant Game 1 performance",
    description: "Shai Gilgeous-Alexander finished with 34 points and 9 assists as Oklahoma City made a statement.",
    url: "#", source: "Bleacher Report", published_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "5", category: "general",
    title: "Celtics–Magic series shaping up as closest first-round matchup",
    description: "Advanced metrics give Orlando a 30% chance of pulling the upset, the highest odds of any 7-seed.",
    url: "#", source: "FiveThirtyEight", published_at: new Date(Date.now() - 26 * 3600000).toISOString(),
  },
];
