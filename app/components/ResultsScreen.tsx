"use client";

import { useState } from "react";
import { PlayerCard } from "@/app/components/PlayerCard";
import { POTS } from "@/app/data/teams";
import type { DrawMode, PlayerResult, Team } from "@/app/types";

interface ResultsScreenProps {
  results: PlayerResult[];
  unassigned: Team[];
  drawMode: DrawMode;
  copied: boolean;
  onCopyResults: () => void;
  onReset: () => void;
}

export function ResultsScreen({
  results,
  unassigned,
  drawMode,
  copied,
  onCopyResults,
  onReset,
}: ResultsScreenProps) {
  const potMode = drawMode === "pot";
  const [showUndrawn, setShowUndrawn] = useState(false);
  const allTeams = results.flatMap((r) => r.teams);
  const totalDrawn = allTeams.length;

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="text-center mb-8 slide-down">
        <div className="text-5xl sm:text-6xl mb-3 trophy-bounce inline-block">
          🏆
        </div>
        <h2
          className="text-3xl sm:text-4xl font-black uppercase tracking-wide"
          style={{ color: "#FFD700" }}
        >
          Draw Complete!
        </h2>
        <p className="text-gray-400 mt-2 text-sm">
          {results.length} player{results.length !== 1 ? "s" : ""} ·{" "}
          {totalDrawn} teams drawn
          {potMode ? " (1 per FIFA pot)" : ""} · May the best team win! ⚽
        </p>

        {/* Flag strip */}
        <div className="flex justify-center flex-wrap gap-1 mt-3 text-lg">
          {allTeams.slice(0, 10).map((t, i) => (
            <span key={i} title={t.name}>
              {t.flag}
            </span>
          ))}
          {allTeams.length > 10 && (
            <span className="text-gray-600 text-xs self-center ml-1">
              +{allTeams.length - 10} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={onCopyResults}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
            style={{
              background: copied
                ? "rgba(34,197,94,0.12)"
                : "rgba(255,215,0,0.08)",
              border: `1.5px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(255,215,0,0.35)"}`,
              color: copied ? "#86efac" : "#FFD700",
            }}
          >
            {copied ? "✓ Copied to clipboard!" : "📋 Copy results"}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            🔄 New Draw
          </button>
        </div>
      </div>

      {/* ── Player cards grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {results.map((result, i) => (
          <PlayerCard
            key={i}
            result={result}
            index={i}
            drawMode={drawMode}
          />
        ))}
      </div>

      {/* ── Undrawn teams (collapsible) ──────────────────────────────────── */}
      {unassigned.length > 0 && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => setShowUndrawn((v) => !v)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-xs font-bold text-gray-600 flex items-center gap-2 uppercase tracking-widest">
              <span>🎲</span> Undrawn Teams ({unassigned.length})
            </h3>
            <span
              className="text-gray-700 text-xs transition-transform duration-200 inline-block"
              style={{ transform: showUndrawn ? "rotate(180deg)" : "none" }}
            >
              ▼
            </span>
          </button>

          {showUndrawn && (
            <div className="mt-3 space-y-3">
              {potMode
                ? POTS.map((pot) => {
                    const potTeams = unassigned.filter((t) => t.pot === pot);
                    if (potTeams.length === 0) return null;
                    return (
                      <div key={pot}>
                        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5">
                          Pot {pot} ({potTeams.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                          {potTeams.map((team) => (
                            <div
                              key={team.name}
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg opacity-35"
                              style={{ background: "rgba(255,255,255,0.04)" }}
                            >
                              <span className="text-base leading-none">
                                {team.flag}
                              </span>
                              <span className="text-gray-500 text-xs truncate">
                                {team.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                    {unassigned.map((team) => (
                      <div
                        key={team.name}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg opacity-35"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <span className="text-base leading-none">{team.flag}</span>
                        <span className="text-gray-500 text-xs truncate">
                          {team.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
