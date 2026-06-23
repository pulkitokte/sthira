import { Sparkles } from "lucide-react";
import RecoveryCard from "./RecoveryCard";
import { RECOVERY_CATEGORIES } from "../../data/recoveryCategories";

export default function PersonalizedRecoverySection({
  sessions,
  reason,
  onSelectSession,
}) {
  if (!sessions || sessions.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dew/15">
          <Sparkles
            size={17}
            className="text-dew"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-ink">
            Suggested for you
          </h2>
          {reason && <p className="text-xs text-stone">{reason}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sessions.map((session) => {
          const category = RECOVERY_CATEGORIES.find(
            (c) => c.id === session.categoryId,
          );
          return (
            <RecoveryCard
              key={session.id}
              session={session}
              categoryLabel={category?.label}
              onSelect={onSelectSession}
            />
          );
        })}
      </div>
    </section>
  );
}
