const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HydrationProgressRing({
  todayTotal,
  goal,
  percentage,
}) {
  const offset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          className="stroke-border"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          className="stroke-dew transition-[stroke-dashoffset] duration-700 ease-out"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-semibold text-ink">
          {todayTotal}
        </span>
        <span className="mt-0.5 text-xs text-stone">of {goal} ml</span>
      </div>
    </div>
  );
}
