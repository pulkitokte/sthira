import { CheckCircle2 } from "lucide-react";

export default function CompletionStep({ data }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage/20">
        <CheckCircle2 size={34} className="text-moss" strokeWidth={1.6} />
      </div>
      <h1 className="mt-6 font-display text-[26px] font-semibold leading-snug text-ink">
        {data.firstName ? `${data.firstName}, your` : "Your"} Sthira space is
        ready.
      </h1>
      <p className="mt-3 max-w-xs leading-relaxed text-stone">
        Gentle mornings, easy study breaks, and a calmer body — all set up
        around how you actually live your day.
      </p>
    </div>
  );
}
