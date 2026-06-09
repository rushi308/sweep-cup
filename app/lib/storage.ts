import type { SavedState } from "@/app/types";

export const STORAGE_KEY = "sweepcup-v1";

/** Load persisted state from localStorage. Returns null if nothing is saved or on error. */
export function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedState;
  } catch {
    return null;
  }
}

/** Persist state to localStorage. Silently ignores errors (e.g. private browsing quota). */
export function saveState(state: SavedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/** Remove persisted state from localStorage. */
export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
