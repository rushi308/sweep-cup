interface DrawingScreenProps {
  playerCount: number;
  teamCount: number;
  cycleTeam: string;
}

export function DrawingScreen({ playerCount, teamCount, cycleTeam }: DrawingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center gap-6">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,215,0,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Spinning ball */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: "rgba(255,215,0,0.12)", transform: "scale(1.6)" }}
        />
        <div className="spinning-ball text-7xl sm:text-8xl relative z-10">⚽</div>
      </div>

      {/* Title */}
      <div>
        <h2
          className="text-2xl sm:text-3xl font-black uppercase tracking-widest mb-1"
          style={{ color: "#FFD700" }}
        >
          Drawing Teams…
        </h2>
        <p className="text-gray-500 text-sm">
          {playerCount} player{playerCount !== 1 ? "s" : ""} · {teamCount} teams
        </p>
      </div>

      {/* Cycling team name */}
      <div
        className="text-xl sm:text-2xl font-bold text-white h-10 flex items-center justify-center min-w-52 cycle-name"
        key={cycleTeam}
      >
        {cycleTeam}
      </div>

      {/* Progress bar */}
      <div
        className="w-56 sm:w-72 h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="draw-progress h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #22c55e, #FFD700, #FFA500)" }}
        />
      </div>

      {/* Loading dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full loading-dot"
            style={{ background: "#FFD700", animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </div>
    </div>
  );
}
