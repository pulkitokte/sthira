import { BookOpen } from "lucide-react";
import SelectableOption from "../SelectableOption";
import { STUDY_HOURS_OPTIONS } from "../../../constants/onboarding";

export default function StudyLifestyleStep({ data, updateField }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
        <BookOpen size={28} className="text-moss" strokeWidth={1.6} />
      </div>
      <h1 className="mt-6 font-display text-[26px] font-semibold leading-snug text-ink">
        How much do you usually study?
      </h1>
      <p className="mt-2 leading-relaxed text-stone">
        On an average day, roughly how many hours.
      </p>

      <div className="mt-8 space-y-3">
        {STUDY_HOURS_OPTIONS.map((opt) => (
          <SelectableOption
            key={opt.value}
            label={opt.label}
            selected={data.studyHours === opt.value}
            onClick={() => updateField("studyHours", opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
