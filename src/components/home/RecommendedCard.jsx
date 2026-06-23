import { useNavigate } from "react-router-dom";
import {
  Sunrise,
  Wind,
  Eye,
  Sparkles,
  Clock,
  ChevronRight,
} from "lucide-react";
import { PATHS } from "../../constants/navigation";

const TYPE_META = {
  routine: {
    icon: Sunrise,
    iconColor: "text-moss",
    iconBg: "bg-sage/15",
    getNav: (id) => ({ path: PATHS.ROUTINE_PLAYER, state: { routineId: id } }),
  },
  recovery: {
    icon: Wind,
    iconColor: "text-dew",
    iconBg: "bg-dew/15",
    getNav: (id) => ({ path: PATHS.RECOVERY_PLAYER, state: { sessionId: id } }),
  },
  eye: {
    icon: Eye,
    iconColor: "text-dew",
    iconBg: "bg-dew/15",
    getNav: (id) => ({
      path: PATHS.EYE_RECOVERY_PLAYER,
      state: { sessionId: id },
    }),
  },
};

export default function RecommendedCard({ recommendation }) {
  const navigate = useNavigate();
  if (!recommendation) return null;

  const meta = TYPE_META[recommendation.type];
  if (!meta) return null;

  const Icon = meta.icon;
  const { path, state } = meta.getNav(recommendation.id);

  return (
    <button
      type="button"
      onClick={() => navigate(path, { state })}
      aria-label={`Recommended: ${recommendation.title} — ${recommendation.reason}`}
      className="w-full rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <div className="mb-3 flex items-center gap-1.5">
        <Sparkles
          size={13}
          className="text-sage"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <span className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone">
          Recommended for you
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${meta.iconBg}`}
          >
            <Icon
              size={19}
              className={meta.iconColor}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              {recommendation.title}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2">
              <span className="flex items-center gap-1 text-xs text-stone">
                <Clock size={11} strokeWidth={2} aria-hidden="true" />
                {recommendation.duration} min
              </span>
              {recommendation.categoryLabel && (
                <span className="text-xs text-stone">
                  · {recommendation.categoryLabel}
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronRight
          size={18}
          className="shrink-0 text-stone/60"
          aria-hidden="true"
        />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-stone">
        {recommendation.reason}
      </p>
    </button>
  );
}
