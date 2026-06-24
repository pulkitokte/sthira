import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PATHS } from "../../constants/navigation";

export default function RecentAchievementCard({ achievement, unlockedAt }) {
  const navigate = useNavigate();
  if (!achievement) return null;

  const Icon = achievement.icon;
  const formattedDate = unlockedAt
    ? new Date(unlockedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <button
      onClick={() => navigate(PATHS.ACHIEVEMENTS)}
      aria-label={`Recent milestone: ${achievement.title}. View all achievements.`}
      className="flex w-full items-center gap-3 rounded-3xl border border-border bg-surface px-5 py-4 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/20">
        <Icon
          size={18}
          className="text-moss"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-ink">
          {achievement.title}
        </p>
        <p className="mt-0.5 text-xs text-stone">
          {formattedDate ? `Unlocked ${formattedDate}` : "Recent milestone"}
        </p>
      </div>
      <ChevronRight
        size={16}
        className="shrink-0 text-stone/60"
        aria-hidden="true"
      />
    </button>
  );
}
