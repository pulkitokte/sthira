import { Medal } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import AchievementCard from "../components/achievements/AchievementCard";
import EmptyState from "../components/common/EmptyState";
import { useAchievements } from "../context/AchievementsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORY_LABELS,
} from "../constants/achievements";

const CATEGORY_ORDER = [
  "first-steps",
  "consistency",
  "exploration",
  "wellness",
];

function groupByCategory(achievements) {
  const groups = {};
  for (const cat of CATEGORY_ORDER) {
    groups[cat] = [];
  }
  for (const achievement of achievements) {
    if (groups[achievement.category]) {
      groups[achievement.category].push(achievement);
    }
  }
  return groups;
}

export default function Achievements() {
  const { unlockedRecords, evaluationResults, unlockedCount, totalCount } =
    useAchievements();
  useDocumentTitle("Achievements");

  const grouped = groupByCategory(ACHIEVEMENTS);
  const progressPct =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return (
    <PageContainer className="flex flex-col gap-8">
      {/* Summary */}
      <section className="rounded-4xl bg-surface p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/20">
            <Medal
              size={19}
              className="text-moss"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
          <div>
            <p className="font-display text-base font-semibold text-ink">
              {unlockedCount} of {totalCount} milestones
            </p>
            <p className="mt-0.5 text-xs text-stone">
              {unlockedCount === 0
                ? "Your journey is just beginning."
                : unlockedCount === totalCount
                  ? "All milestones reached."
                  : "Keep showing up — each day adds another."}
            </p>
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-moss transition-all duration-500"
            style={{ width: `${progressPct}%` }}
            aria-label={`${progressPct}% of milestones reached`}
          />
        </div>
      </section>

      {unlockedCount === 0 && (
        <EmptyState
          icon={Medal}
          title="No milestones yet"
          description="Complete a morning routine, log some water, or do a wellness check-in to earn your first milestone."
        />
      )}

      {/* Category groups */}
      {CATEGORY_ORDER.map((categoryId) => {
        const achievements = grouped[categoryId];
        if (!achievements || achievements.length === 0) return null;

        return (
          <section key={categoryId} className="flex flex-col gap-3">
            <h2 className="px-1 font-display text-base font-semibold text-ink">
              {ACHIEVEMENT_CATEGORY_LABELS[categoryId]}
            </h2>
            <div className="flex flex-col gap-2.5">
              {achievements.map((achievement) => {
                const result = evaluationResults[achievement.id];
                const unlockedRecord = unlockedRecords[achievement.id];

                return (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    isUnlocked={result?.unlocked ?? false}
                    unlockedAt={unlockedRecord?.unlockedAt ?? null}
                    progress={
                      result?.unlocked ? null : (result?.progress ?? null)
                    }
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </PageContainer>
  );
}
