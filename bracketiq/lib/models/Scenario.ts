import mongoose, { Schema, Document } from "mongoose";

export interface IScenario extends Document {
  share_code: string;
  selections: Record<string, string>;
  projected_odds: Array<{
    team_id: number;
    team_name: string;
    championship_pct: number;
    delta: number;
  }>;
  created_at: Date;
}

const ScenarioSchema = new Schema<IScenario>({
  share_code: { type: String, required: true, unique: true, index: true },
  selections: { type: Map, of: String, required: true },
  projected_odds: [
    {
      team_id: Number,
      team_name: String,
      championship_pct: Number,
      delta: Number,
    },
  ],
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Scenario ||
  mongoose.model<IScenario>("Scenario", ScenarioSchema);
