import { timeAgo } from "@/app/lib/utils";

interface ResumeBannerProps {
  type: "setup" | "results";
  savedAt: number | null;
  onResume: () => void;
  onDismiss: () => void;
}

export function ResumeBanner({
  type,
  savedAt,
  onResume,
  onDismiss,
}: ResumeBannerProps) {
  return (
    <div
      className="mb-6 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between slide-down"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,165,0,0.05))",
        border: "1px solid rgba(255,215,0,0.3)",
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">💾</span>
        <div>
          <div className="text-white font-bold text-sm">
            {type === "results"
              ? "Last draw results saved"
              : "Unfinished session found"}
          </div>
          <div className="text-gray-400 text-xs mt-0.5">
            {savedAt
              ? `Saved ${timeAgo(savedAt)}`
              : "Your progress was auto-saved"}
            {type === "results"
              ? " — resume to view your draw results"
              : " — resume to continue setting up players"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={onResume}
          className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            color: "#071510",
          }}
        >
          Resume
        </button>
        <button
          onClick={onDismiss}
          className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Start Fresh
        </button>
      </div>
    </div>
  );
}
