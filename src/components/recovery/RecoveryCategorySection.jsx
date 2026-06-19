import RecoveryCard from "./RecoveryCard";

export default function RecoveryCategorySection({
  category,
  sessions,
  onSelectSession,
}) {
  const Icon = category.icon;

  return (
    <section>
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dew/15">
          <Icon size={18} className="text-dew" strokeWidth={1.8} />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-ink">
            {category.label}
          </h2>
          <p className="text-xs text-stone">{category.tagline}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sessions.map((session) => (
          <RecoveryCard
            key={session.id}
            session={session}
            categoryLabel={category.label}
            onSelect={onSelectSession}
          />
        ))}
      </div>
    </section>
  );
}
