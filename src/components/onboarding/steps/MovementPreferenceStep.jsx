import { Timer } from "lucide-react";
import { ROUTINE_DURATION_OPTIONS } from "../../../constants/onboarding";

export default function MovementPreferenceStep({ data, updateField }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
        <Timer size={28} className="text-moss" strokeWidth={1.6} />
      </div>
      <h1 className="mt-6 font-display text-[26px] font-semibold leading-snug text-ink">
        How long should mornings be?
      </h1>
      <p className="mt-2 leading-relaxed text-stone">
        Pick a length that feels easy to commit to. You can change this anytime.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {ROUTINE_DURATION_OPTIONS.map((opt) => {
          const selected = data.routineDuration === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateField("routineDuration", opt.value)}
              className={`rounded-3xl border p-6 text-center transition-colors duration-150 ${
                selected
                  ? "border-moss bg-moss/8"
                  : "border-border bg-surface hover:border-sage/60"
              }`}
            >
              <span
                className={`font-display text-2xl font-semibold ${selected ? "text-moss" : "text-ink"}`}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
