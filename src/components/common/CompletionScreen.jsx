import PageContainer from "../layout/PageContainer";

export default function CompletionScreen({
  icon: Icon,
  accent = "moss",
  heading,
  description,
  stats,
  buttonLabel,
  onButtonClick,
}) {
  const iconBg = accent === "dew" ? "bg-dew/15" : "bg-sage/20";
  const iconColor = accent === "dew" ? "text-dew" : "text-moss";

  return (
    <PageContainer className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon size={34} className={iconColor} strokeWidth={1.6} />
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {heading}
        </h1>
        <p className="max-w-xs leading-relaxed text-stone">{description}</p>
      </div>

      {stats && stats.length > 0 && (
        <div className="flex w-full max-w-xs gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 rounded-3xl border border-border bg-surface p-4"
            >
              <p className="font-display text-2xl font-semibold text-moss">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-stone">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onButtonClick}
        className="w-full max-w-xs rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors hover:bg-moss-dark"
      >
        {buttonLabel}
      </button>
    </PageContainer>
  );
}
