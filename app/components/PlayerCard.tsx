import { TeamBadge } from "@/app/components/TeamBadge";
import type { PlayerResult } from "@/app/types";

interface PlayerCardProps {
  result: PlayerResult;
  index: number;
}

export function PlayerCard({ result, index }: PlayerCardProps) {
  return (
    <div
      className="reveal-card glass-card p-5 flex flex-col gap-3"
      style={{ animationDelay: `${index * 0.065}s` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-black shrink-0"
          style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}
        >
          {index + 1}
        </div>
        <span className="text-white font-bold text-base leading-tight truncate flex-1">
          {result.player}
        </span>
        <span className="text-xs text-gray-600 shrink-0">
          {result.teams.length} team{result.teams.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {result.teams.map((team, ti) => (
          <TeamBadge key={ti} team={team} />
        ))}
      </div>
    </div>
  );
}
