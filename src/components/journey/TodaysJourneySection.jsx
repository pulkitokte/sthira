import JourneyActivityCard from "./JourneyActivityCard";
import { useJourney } from "../../context/JourneyContext";

export default function TodaysJourneySection({ activities }) {
  const { isComplete, markComplete, totalCompleted } = useJourney();

  if (!activities || activities.length === 0) return null;

  const allDone = totalCompleted >= activities.length;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <h2 className="font-display text-base font-semibold text-ink">
            Today's Journey
          </h2>
          <p className="mt-0.5 text-xs text-stone">
            {allDone
              ? "Well done — you showed up for yourself today."
              : `${totalCompleted} of ${activities.length} done`}
          </p>
        </div>
        {allDone && (
          <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-moss">
            Complete
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {activities.map((activity) => (
          <JourneyActivityCard
            key={activity.id}
            activity={activity}
            isComplete={isComplete(activity.id)}
            onMarkComplete={markComplete}
          />
        ))}
      </div>
    </section>
  );
}
