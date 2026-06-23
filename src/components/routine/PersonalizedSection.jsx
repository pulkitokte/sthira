import { Sparkles } from "lucide-react";
import RoutineCard from "./RoutineCard";

export default function PersonalizedSection({
  routines,
  reason,
  onSelectRoutine,
}) {
  if (!routines || routines.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/15">
          <Sparkles
            size={17}
            className="text-moss"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-ink">
            Recommended for you
          </h2>
          {reason && <p className="text-xs text-stone">{reason}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {routines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onSelect={onSelectRoutine}
          />
        ))}
      </div>
    </section>
  );
}
