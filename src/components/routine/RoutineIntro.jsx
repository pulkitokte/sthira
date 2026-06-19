import { Clock, Layers, Leaf, Wind, Flame } from "lucide-react";
import PageContainer from "../layout/PageContainer";
import { DIFFICULTY_STYLES } from "../../constants/routine";

const ENERGY_ICONS = { Calm: Leaf, Steady: Wind, Energizing: Flame };

export default function RoutineIntro({ routine, onBegin }) {
  const EnergyIcon = ENERGY_ICONS[routine.energyLevel] ?? Leaf;

  return (
    <PageContainer className="flex flex-1 flex-col">
      <div className="flex-1">
        <h1 className="font-display text-[26px] font-semibold leading-snug text-ink">
          {routine.title}
        </h1>
        <p className="mt-3 leading-relaxed text-stone">{routine.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
            <Clock size={13} strokeWidth={2} />
            {routine.duration} min
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${DIFFICULTY_STYLES[routine.difficulty]}`}
          >
            {routine.difficulty}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
            <EnergyIcon size={13} strokeWidth={2} />
            {routine.energyLevel}
          </span>
        </div>

        <div className="mt-8 flex gap-3">
          <div className="flex-1 rounded-3xl border border-border bg-surface p-5">
            <Layers size={18} className="text-moss" strokeWidth={1.8} />
            <p className="mt-3 font-display text-xl font-semibold text-ink">
              {routine.exercises.length}
            </p>
            <p className="mt-0.5 text-xs text-stone">Exercises</p>
          </div>
          <div className="flex-1 rounded-3xl border border-border bg-surface p-5">
            <Clock size={18} className="text-moss" strokeWidth={1.8} />
            <p className="mt-3 font-display text-xl font-semibold text-ink">
              ~{routine.duration} min
            </p>
            <p className="mt-0.5 text-xs text-stone">Estimated time</p>
          </div>
        </div>
      </div>

      <button
        onClick={onBegin}
        className="w-full rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
      >
        Begin Routine
      </button>
    </PageContainer>
  );
}
