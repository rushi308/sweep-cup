import { timeAgo } from "@/app/lib/utils";
import type { Screen } from "@/app/types";

interface NavBarProps {
  screen: Screen;
  savedAt: number | null;
  nowTick: number;
  copied: boolean;
  onCopyResults: () => void;
  onReset: () => void;
}

export function NavBar({
  screen,
  savedAt,
  nowTick,
  copied,
  onCopyResults,
  onReset,
}: NavBarProps) {
  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(5,15,7,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,215,0,0.1)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">⚽</span>
          <span className="font-black text-xl tracking-tight">
            <span className="text-white">Sweep</span>
            <span style={{ color: "#FFD700" }}>Cup</span>
          </span>
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-3">
          {/* Auto-save indicator (setup screen only) */}
          {savedAt && screen === "setup" && (
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#86efac",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ boxShadow: "0 0 6px #22c55e" }}
              />
              {/* nowTick forces re-render so the relative time stays fresh */}
              Saved {nowTick >= 0 ? timeAgo(savedAt) : ""}
            </div>
          )}

          {/* Share button (results screen only) */}
          {screen === "results" && (
            <button
              onClick={onCopyResults}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
              style={{
                background: copied
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(255,215,0,0.08)",
                border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(255,215,0,0.25)"}`,
                color: copied ? "#86efac" : "#FFD700",
              }}
            >
              {copied ? "✓ Copied!" : "📋 Share"}
            </button>
          )}

          {/* New Draw shortcut (drawing / results screens) */}
          {screen !== "setup" && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              🔄 New Draw
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
