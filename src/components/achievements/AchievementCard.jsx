import { Check } from "lucide-react";

export default function AchievementCard({
  achievement,
  isUnlocked,
  unlockedAt,
  progress,
}) {
  const Icon = achievement.icon;

  const formattedDate = unlockedAt
    ? new Date(unlockedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={`relative rounded-3xl border p-4 transition-colors ${
        isUnlocked ? "border-sage/30 bg-surface" : "border-border bg-canvas"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isUnlocked ? "bg-sage/20" : "bg-border/60"
          }`}
        >
          <Icon
            size={19}
            className={isUnlocked ? "text-moss" : "text-stone/40"}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>

        <div className="min-w-0 flex-1">
          <p
            className={`font-display text-sm font-semibold ${
              isUnlocked ? "text-ink" : "text-stone/50"
            }`}
          >
            {achievement.title}
          </p>
          <p
            className={`mt-0.5 text-xs leading-relaxed ${
              isUnlocked ? "text-stone" : "text-stone/40"
            }`}
          >
            {achievement.description}
          </p>

          {isUnlocked && formattedDate && (
            <p className="mt-1.5 text-xs text-sage">Unlocked {formattedDate}</p>
          )}

          {!isUnlocked && progress && (
            <div className="mt-2.5">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-stone/50">
                  {progress.current} of {progress.target}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-sage/40 transition-all duration-300"
                  style={{
                    width: `${Math.min((progress.current / progress.target) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {isUnlocked && (
          <span
            aria-hidden="true"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss"
          >
            <Check size={11} className="text-canvas" strokeWidth={2.5} />
          </span>
        )}
      </div>
    </div>
  );
}
