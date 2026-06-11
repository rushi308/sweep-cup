export type Confederation =
  | "UEFA"
  | "CONMEBOL"
  | "CONCACAF"
  | "CAF"
  | "AFC"
  | "OFC";

export type Pot = 1 | 2 | 3 | 4;

export type DrawMode = "classic" | "pot";

export interface Team {
  name: string;
  flag: string;
  confederation: Confederation;
  /** FIFA ranking pot (1 = strongest). Used in pot draw mode. */
  pot: Pot;
  /** FIFA world ranking at pot assignment (June 2026). */
  fifaRank: number;
}

export interface Player {
  id: string;
  name: string;
  /** Number of teams this player receives — 1 to 48 */
  slots: number;
}

export interface PlayerResult {
  player: string;
  teams: Team[];
}

export type Screen = "setup" | "drawing" | "results";

export interface SavedState {
  players: Player[];
  defaultSlots: number;
  drawMode?: DrawMode;
  results?: PlayerResult[];
  unassigned?: Team[];
  savedAt: number;
}
