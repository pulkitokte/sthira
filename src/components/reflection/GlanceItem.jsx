export default function GlanceItem({ stat }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-stone">{stat.label}</span>
      <div className="flex flex-col items-end">
        <span className="font-display text-base font-semibold text-ink">
          {stat.value}
        </span>
        {stat.context && (
          <span className="text-xs text-stone/70">{stat.context}</span>
        )}
      </div>
    </div>
  );
}
