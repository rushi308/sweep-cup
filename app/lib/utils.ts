import type { Player } from "@/app/types";

/** Fisher-Yates shuffle — returns a new shuffled array */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Short random ID for player rows */
export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

/** Create a blank Player with a given slot count (1–48) */
export function mkPlayer(slots: number = 1): Player {
  return { id: uid(), name: "", slots };
}

/** Human-readable relative time, e.g. "2m ago" */
export function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 10) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}
