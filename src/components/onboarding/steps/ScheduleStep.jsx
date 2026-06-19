import { Clock } from "lucide-react";

export default function ScheduleStep({ data, updateField }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
        <Clock size={28} className="text-moss" strokeWidth={1.6} />
      </div>
      <h1 className="mt-6 font-display text-[26px] font-semibold leading-snug text-ink">
        What does your day look like?
      </h1>
      <p className="mt-2 leading-relaxed text-stone">
        This helps Sthira suggest movement at the right moments.
      </p>

      <div className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block font-display text-sm font-medium text-ink">
            Wake-up time
          </span>
          <input
            type="time"
            value={data.wakeTime}
            onChange={(e) => updateField("wakeTime", e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 font-sans text-ink focus:border-moss focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-display text-sm font-medium text-ink">
            Sleep time
          </span>
          <input
            type="time"
            value={data.sleepTime}
            onChange={(e) => updateField("sleepTime", e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 font-sans text-ink focus:border-moss focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
