export default function ProgressDots({ total, current }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current + 1} of ${total}`}
      className="flex items-center gap-1.5"
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current
              ? "w-6 bg-moss"
              : i < current
                ? "w-1.5 bg-moss/50"
                : "w-1.5 bg-border"
          }`}
        />
      ))}
    </div>
  );
}
