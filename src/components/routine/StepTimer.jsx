const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function StepTimer({ secondsLeft, totalSeconds }) {
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          className="stroke-border"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          className="stroke-moss transition-[stroke-dashoffset] duration-1000 ease-linear"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute font-display text-4xl font-semibold text-ink">
        {secondsLeft}
      </span>
    </div>
  );
}
