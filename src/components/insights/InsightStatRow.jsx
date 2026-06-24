export default function InsightStatRow({ stat, isLast }) {
  return (
    <div
      className={`flex items-center justify-between py-3.5 ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      <span className="text-sm text-stone">{stat.label}</span>
      <div className="flex flex-col items-end">
        <span className="font-display text-sm font-semibold text-ink">
          {String(stat.value)}
        </span>
        {stat.sub && <span className="text-xs text-stone/60">{stat.sub}</span>}
      </div>
    </div>
  );
}
