// Team types
export interface Team {
  id: number;
  name: string;
  full_name: string;
  abbreviation: string;
  city: string;
  conference: "East" | "West";
  division: string;
  color: string;
}

// Standing types
export interface Standing {
  team: Team;
  wins: number;
  losses: number;
  conference_rank: number;
  pct: number;
  home_record: string;
  away_record: string;
  streak: string;
  last_ten: string;
}

// Playoff series
export interface Series {
  id: string;
  round: 1 | 2 | 3 | 4;
  conference: "East" | "West" | "Finals";
  home_team: Team;
  away_team: Team;
  home_wins: number;
  away_wins: number;
  status: "upcoming" | "in_progress" | "complete";
  winner?: Team;
  home_win_pct: number; // model-predicted win probability
}

// Injury
export interface Injury {
  player_name: string;
  team: Team;
  status: "Out" | "Questionable" | "Probable" | "Day-to-Day";
  injury_type: string;
  odds_impact: number; // percentage change to championship odds
}

// News article
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  published_at: string;
  category: "injury" | "recap" | "odds" | "general";
  teams: Team[];
  odds_impact?: number;
  odds_direction?: "up" | "down";
}

// Championship odds
export interface TeamOdds {
  team: Team;
  championship_pct: number;
  conference_pct: number;
  round_pct: number; // odds of winning current round
  delta: number; // change since last update
}

// Simulator scenario
export interface Scenario {
  _id?: string;
  share_code: string;
  selections: Record<string, string>; // seriesId -> teamId
  created_at: string;
  projected_odds: TeamOdds[];
}
