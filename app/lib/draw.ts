import { POTS, TEAMS } from "@/app/data/teams";
import { shuffle } from "@/app/lib/utils";
import type { DrawMode, Player, PlayerResult, Team } from "@/app/types";

export interface DrawResult {
  results: PlayerResult[];
  unassigned: Team[];
}

/**
 * Classic draw — each player receives `player.slots` teams from a shuffled pool.
 * Teams beyond 48 are returned as `unassigned`.
 */
export function runClassicDraw(players: Player[]): DrawResult {
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

/**
 * FIFA pot draw — each player receives one team from each of the four pots.
 * Pots are shuffled independently; player i gets index i from each pot.
 */
export function runPotDraw(players: Player[]): DrawResult {
  const valid = players.filter((p) => p.name.trim());
  const shuffledPots = POTS.map((pot) =>
    shuffle(TEAMS.filter((t) => t.pot === pot)),
  );

  const results: PlayerResult[] = valid.map((p, i) => ({
    player: p.name.trim(),
    teams: shuffledPots
      .map((potTeams) => potTeams[i])
      .filter((t): t is Team => t !== undefined),
  }));

  const unassigned = shuffledPots.flatMap((potTeams) =>
    potTeams.slice(valid.length),
  );

  return { results, unassigned };
}

export function runDraw(players: Player[], mode: DrawMode): DrawResult {
  return mode === "pot" ? runPotDraw(players) : runClassicDraw(players);
}
