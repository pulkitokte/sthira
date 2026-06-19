import { ChevronRight, Leaf, Wind, Flame, Clock } from "lucide-react";
import { DIFFICULTY_STYLES } from "../../constants/routine";

const ENERGY_ICONS = { Calm: Leaf, Steady: Wind, Energizing: Flame };

export default function RoutineCard({ routine, onSelect }) {
  const EnergyIcon = ENERGY_ICONS[routine.energyLevel] ?? Leaf;

  return (
    <button
      type="button"
      onClick={() => onSelect(routine)}
      className="flex w-full flex-col gap-3 rounded-3xl border border-border bg-surface p-5 text-left shadow-soft transition-transform active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-semibold text-ink">
            {routine.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone">
            {routine.description}
          </p>
        </div>
        <ChevronRight size={18} className="mt-1 shrink-0 text-stone/60" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
          <Clock size={13} strokeWidth={2} />
          {routine.duration} min
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${DIFFICULTY_STYLES[routine.difficulty]}`}
        >
          {routine.difficulty}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1 text-xs font-medium text-stone">
          <EnergyIcon size={13} strokeWidth={2} />
          {routine.energyLevel}
        </span>
      </div>
    </button>
  );
}
