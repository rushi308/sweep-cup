import { CONF_BG, CONF_BORDER, CONF_LABEL } from "@/app/data/teams";
import type { Team } from "@/app/types";

interface TeamBadgeProps {
  team: Team;
  showPot?: boolean;
  showRank?: boolean;
}

export function TeamBadge({ team, showPot, showRank }: TeamBadgeProps) {
  const sublabel = showPot
    ? `Pot ${team.pot}${showRank ? ` · #${team.fifaRank}` : ""}`
    : team.confederation;

  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
      style={{
        background: CONF_BG[team.confederation],
        border: `1px solid ${CONF_BORDER[team.confederation]}`,
      }}
    >
      <span className="text-xl leading-none">{team.flag}</span>
      <div className="min-w-0">
        <div className="text-white font-semibold text-sm leading-tight truncate">
          {team.name}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{
            color: showPot ? "#fde68a" : CONF_LABEL[team.confederation],
          }}
        >
          {sublabel}
        </div>
      </div>
    </div>
  );
}
