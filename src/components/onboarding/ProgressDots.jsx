export default function ProgressDots({ total, current }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
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
