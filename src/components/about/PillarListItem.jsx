export default function PillarListItem({
  icon: Icon,
  title,
  description,
  accent = "moss",
}) {
  const iconBg = accent === "dew" ? "bg-dew/15" : "bg-sage/15";
  const iconColor = accent === "dew" ? "text-dew" : "text-moss";

  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-surface p-5">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon size={19} className={iconColor} strokeWidth={1.8} />
      </span>
      <div>
        <p className="font-display text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-stone">{description}</p>
      </div>
    </div>
  );
}
