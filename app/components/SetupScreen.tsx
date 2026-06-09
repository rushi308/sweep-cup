"use client";

import { useState } from "react";
import { TEAMS } from "@/app/data/teams";
import { SlotPill } from "@/app/components/SlotPill";
import type { Player } from "@/app/types";

interface SetupScreenProps {
  defaultSlots: number;
  players: Player[];
  validPlayerCount: number;
  totalSlots: number;
  overLimit: boolean;
  onSetDefaultSlots: (n: number) => void;
  onApplyDefaultToAll: () => void;
  onAddPlayer: () => void;
  onRemovePlayer: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateSlots: (id: string, slots: number) => void;
  onStartDraw: () => void;
}

const PRESETS = [
  { n: 1, icon: "🎯", label: "1 Team", sub: "Classic" },
  { n: 2, icon: "⚔️", label: "2 Teams", sub: "Double chance" },
  { n: 3, icon: "🎰", label: "3 Teams", sub: "Triple threat" },
] as const;

export function SetupScreen({
  defaultSlots,
  players,
  validPlayerCount,
  totalSlots,
  overLimit,
  onSetDefaultSlots,
  onApplyDefaultToAll,
  onAddPlayer,
  onRemovePlayer,
  onUpdateName,
  onUpdateSlots,
  onStartDraw,
}: SetupScreenProps) {
  // Local state for the custom default-slots text input
  const isPreset = PRESETS.some((p) => p.n === defaultSlots);
  const [customDefaultInput, setCustomDefaultInput] = useState(
    isPreset ? "" : String(defaultSlots),
  );

  const handleCustomDefault = (raw: string) => {
    setCustomDefaultInput(raw);
    const v = parseInt(raw, 10);
    if (!isNaN(v) && v >= 1 && v <= 48) onSetDefaultSlots(v);
  };

  return (
    <div className="space-y-5">
      {/* ── Default slots ─────────────────────────────────────────────────── */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h2 className="text-base font-bold text-yellow-400 flex items-center gap-2">
            <span>⚙️</span> Default teams per player
          </h2>
          <span className="text-xs text-gray-600">
            Sets the default for new players — customise each player below
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {PRESETS.map(({ n, icon, label, sub }) => {
            const active = defaultSlots === n && isPreset;
            return (
              <button
                key={n}
                onClick={() => {
                  onSetDefaultSlots(n);
                  setCustomDefaultInput("");
                }}
                className="flex-1 min-w-22.5 rounded-xl p-3.5 text-center transition-all duration-200 active:scale-95"
                style={{
                  background: active
                    ? "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.12))"
                    : "rgba(255,255,255,0.04)",
                  border: active
                    ? "2px solid #FFD700"
                    : "2px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-white font-bold text-sm">{label}</div>
                <div className="text-gray-500 text-xs mt-0.5">{sub}</div>
              </button>
            );
          })}

          {/* Custom card */}
          <div
            className="flex-1 min-w-22.5 rounded-xl p-3.5 text-center transition-all duration-200"
            style={{
              background: !isPreset
                ? "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.12))"
                : "rgba(255,255,255,0.04)",
              border: !isPreset
                ? "2px solid #FFD700"
                : "2px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-xl mb-1">🔢</div>
            <div className="text-white font-bold text-sm mb-1">Custom</div>
            <input
              type="number"
              min={1}
              max={48}
              placeholder="4–48"
              value={customDefaultInput}
              onChange={(e) => handleCustomDefault(e.target.value)}
              className="w-full text-center text-xs rounded-lg py-1 bg-black/30 border border-white/10 text-white outline-none focus:border-yellow-400/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <button
          onClick={onApplyDefaultToAll}
          className="mt-3 text-xs text-gray-500 hover:text-yellow-400 transition-colors underline underline-offset-2"
        >
          Apply {defaultSlots} team{defaultSlots > 1 ? "s" : ""} to all existing
          players
        </button>
      </div>

      {/* ── Players ───────────────────────────────────────────────────────── */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-base font-bold text-yellow-400 flex items-center gap-2">
            <span>👥</span> Players
          </h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-500">
              <span className="text-white font-bold">{validPlayerCount}</span>{" "}
              players
            </span>
            <span
              className={overLimit ? "text-red-400 font-bold" : "text-gray-500"}
            >
              <span
                className={
                  overLimit ? "text-red-400" : "text-green-400 font-bold"
                }
              >
                {totalSlots}
              </span>
              /48 teams
            </span>
          </div>
        </div>

        {/* Progress bar */}
        {totalSlots > 0 && (
          <div
            className="mb-4 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((totalSlots / 48) * 100, 100)}%`,
                background: overLimit
                  ? "linear-gradient(90deg, #ef4444, #dc2626)"
                  : "linear-gradient(90deg, #22c55e, #FFD700)",
              }}
            />
          </div>
        )}

        {overLimit && (
          <div
            className="mb-3 px-3 py-2 rounded-lg text-xs text-orange-300"
            style={{
              background: "rgba(251,146,60,0.1)",
              border: "1px solid rgba(251,146,60,0.2)",
            }}
          >
            ⚠️ Total team slots exceed 48 — the draw will assign teams in order
            until all 48 are distributed.
          </div>
        )}

        {/* Player rows */}
        <div className="space-y-2.5">
          {players.map((player, idx) => (
            <div
              key={player.id}
              className="flex items-center gap-2 rounded-xl p-2.5 transition-all"
              style={{
                background: player.name.trim()
                  ? "rgba(255,255,255,0.04)"
                  : "transparent",
                border: player.name.trim()
                  ? "1px solid rgba(255,215,0,0.08)"
                  : "1px solid transparent",
              }}
            >
              <span className="text-gray-700 text-xs w-5 text-right shrink-0 font-mono select-none">
                {idx + 1}
              </span>

              <input
                className="player-input flex-1 min-w-0"
                type="text"
                placeholder={`Player ${idx + 1}`}
                value={player.name}
                maxLength={30}
                onChange={(e) => onUpdateName(player.id, e.target.value)}
              />

              {/* Preset pills + custom number input */}
              <div
                className="flex gap-1 items-center shrink-0 px-1.5 py-1 rounded-lg"
                style={{ background: "rgba(0,0,0,0.2)" }}
              >
                {PRESETS.map(({ n }) => (
                  <SlotPill
                    key={n}
                    value={n}
                    active={player.slots === n}
                    onClick={() => onUpdateSlots(player.id, n)}
                  />
                ))}
                <div
                  className="w-px h-4 mx-0.5"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                <input
                  type="number"
                  min={1}
                  max={48}
                  placeholder="4+"
                  value={player.slots > 3 ? player.slots : ""}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 1 && v <= 48)
                      onUpdateSlots(player.id, v);
                  }}
                  className="w-9 text-center text-xs rounded-lg py-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{
                    background:
                      player.slots > 3
                        ? "rgba(255,215,0,0.15)"
                        : "rgba(255,255,255,0.07)",
                    border:
                      player.slots > 3
                        ? "1px solid rgba(255,215,0,0.5)"
                        : "1px solid rgba(255,255,255,0.1)",
                    color:
                      player.slots > 3 ? "#FFD700" : "rgba(255,255,255,0.4)",
                  }}
                />
              </div>

              {players.length > 1 && (
                <button
                  onClick={() => onRemovePlayer(player.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-700 hover:text-red-400 hover:bg-red-900/20 transition-colors shrink-0 text-lg leading-none"
                  aria-label="Remove player"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onAddPlayer}
          className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95"
          style={{
            background: "rgba(255,215,0,0.06)",
            border: "1px dashed rgba(255,215,0,0.25)",
            color: "rgba(255,215,0,0.7)",
          }}
        >
          <span className="text-base font-bold">+</span> Add Player
        </button>
      </div>

      {/* ── Draw CTA ──────────────────────────────────────────────────────── */}
      <div className="text-center py-3">
        <button
          onClick={onStartDraw}
          disabled={validPlayerCount === 0}
          className="px-12 sm:px-16 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-black tracking-widest uppercase transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 gold-pulse"
          style={
            validPlayerCount > 0
              ? {
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  color: "#071510",
                }
              : {
                  background: "rgba(255,215,0,0.1)",
                  color: "#FFD700",
                  border: "2px dashed rgba(255,215,0,0.2)",
                }
          }
        >
          ⚽ Start the Draw!
        </button>
        {validPlayerCount === 0 && (
          <p className="text-red-400/70 text-xs mt-2">
            Add at least one player name to begin
          </p>
        )}
        {validPlayerCount > 0 && (
          <p className="text-gray-700 text-xs mt-2">
            {validPlayerCount} player{validPlayerCount !== 1 ? "s" : ""} ·{" "}
            {Math.min(totalSlots, 48)} teams in draw
          </p>
        )}
      </div>

      {/* ── 48 Teams preview (collapsible) ────────────────────────────────── */}
      <details className="group">
        <summary
          className="cursor-pointer select-none rounded-2xl px-5 py-4 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="text-sm font-bold text-gray-500 flex items-center gap-2 uppercase tracking-widest">
            <span>🌍</span> All 48 teams in the draw
          </span>
          <span className="text-gray-700 text-xs group-open:rotate-180 transition-transform duration-200 inline-block">
            ▼
          </span>
        </summary>
        <div
          className="mt-1 rounded-2xl p-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
            {TEAMS.map((team) => (
              <div
                key={team.name}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                style={{ background: "rgba(255,255,255,0.035)" }}
              >
                <span className="text-base leading-none">{team.flag}</span>
                <span className="text-gray-400 text-xs truncate">
                  {team.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
