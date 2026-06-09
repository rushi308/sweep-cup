export type Confederation =
  | "UEFA"
  | "CONMEBOL"
  | "CONCACAF"
  | "CAF"
  | "AFC"
  | "OFC";

export interface Team {
  name: string;
  flag: string;
  confederation: Confederation;
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
  results?: PlayerResult[];
  unassigned?: Team[];
  savedAt: number;
}
