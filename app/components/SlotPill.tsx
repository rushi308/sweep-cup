interface SlotPillProps {
  value: number;
  active: boolean;
  onClick: () => void;
}

export function SlotPill({ value, active, onClick }: SlotPillProps) {
  return (
    <button
      onClick={onClick}
      title={`${value} team${value > 1 ? "s" : ""}`}
      className="w-7 h-7 rounded-lg text-xs font-bold transition-all duration-150 active:scale-90"
      style={
        active
          ? {
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              color: "#071510",
              boxShadow: "0 0 8px rgba(255,215,0,0.4)",
            }
          : {
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.1)",
            }
      }
    >
      {value}
    </button>
  );
}
