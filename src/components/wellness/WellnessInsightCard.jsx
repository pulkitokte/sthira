import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";
import { PATHS } from "../../constants/navigation";

const ACTION_MAP = {
  recovery: {
    label: "Browse Study Break Recovery",
    path: PATHS.RECOVERY_LIBRARY,
  },
  eye: { label: "Try Eye Recovery", path: PATHS.EYE_RELAX },
  hydration: { label: "Log some water", path: PATHS.HYDRATION },
};

export default function WellnessInsightCard({ insight }) {
  const navigate = useNavigate();

  if (!insight) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-5">
        <p className="text-sm leading-relaxed text-stone">
          Complete today's check-in above to see a gentle insight here.
        </p>
      </div>
    );
  }

  const action = insight.actionType ? ACTION_MAP[insight.actionType] : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={16} className="text-sage" strokeWidth={1.8} />
        <p className="font-display text-sm font-semibold text-ink">
          Today's Insight
        </p>
      </div>
      <p className="leading-relaxed text-stone">{insight.message}</p>
      {action && (
        <button
          onClick={() =>
            navigate(action.path, { state: { from: "wellness-insight" } })
          }
          className="mt-4 flex items-center gap-1 text-sm font-medium text-moss"
        >
          {action.label} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
