import { TEAMS } from "@/app/data/teams";
import { shuffle } from "@/app/lib/utils";
import type { Player, PlayerResult, Team } from "@/app/types";

export interface DrawResult {
  results: PlayerResult[];
  unassigned: Team[];
}

/**
 * Runs the sweepstake draw.
 * Each player receives `player.slots` teams from a shuffled pool.
 * Teams beyond 48 are returned as `unassigned`.
 */
export function runDraw(players: Player[]): DrawResult {
  const pool = shuffle(TEAMS);
  const results: PlayerResult[] = [];
  let idx = 0;

  for (const p of players.filter((pl) => pl.name.trim())) {
    const teams: Team[] = [];
    for (let i = 0; i < p.slots && idx < pool.length; i++) {
      teams.push(pool[idx++]);
    }
    results.push({ player: p.name.trim(), teams });
  }

  return { results, unassigned: pool.slice(idx) };
}
