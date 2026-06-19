import { HeartPulse } from "lucide-react";
import SelectableOption from "../SelectableOption";
import { ACTIVITY_LEVEL_OPTIONS } from "../../../constants/onboarding";

export default function ActivityLevelStep({ data, updateField }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
        <HeartPulse size={28} className="text-moss" strokeWidth={1.6} />
      </div>
      <h1 className="mt-6 font-display text-[26px] font-semibold leading-snug text-ink">
        How active do you feel lately?
      </h1>
      <p className="mt-2 leading-relaxed text-stone">
        Be honest — this just helps set a comfortable starting point.
      </p>

      <div className="mt-8 space-y-3">
        {ACTIVITY_LEVEL_OPTIONS.map((opt) => (
          <SelectableOption
            key={opt.value}
            label={opt.label}
            blurb={opt.blurb}
            icon={opt.icon}
            selected={data.activityLevel === opt.value}
            onClick={() => updateField("activityLevel", opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
