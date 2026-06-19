import { Target } from "lucide-react";
import SelectableOption from "../SelectableOption";
import { PRIMARY_GOAL_OPTIONS } from "../../../constants/onboarding";

export default function PrimaryGoalStep({ data, updateField }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
        <Target size={28} className="text-moss" strokeWidth={1.6} />
      </div>
      <h1 className="mt-6 font-display text-[26px] font-semibold leading-snug text-ink">
        What matters most right now?
      </h1>
      <p className="mt-2 leading-relaxed text-stone">
        We'll shape your suggestions around this.
      </p>

      <div className="mt-8 space-y-3">
        {PRIMARY_GOAL_OPTIONS.map((opt) => (
          <SelectableOption
            key={opt.value}
            label={opt.label}
            icon={opt.icon}
            selected={data.primaryGoal === opt.value}
            onClick={() => updateField("primaryGoal", opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
