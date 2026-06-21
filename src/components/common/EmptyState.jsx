export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface p-8 text-center">
      {Icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/15">
          <Icon size={20} className="text-moss" strokeWidth={1.8} />
        </span>
      )}
      <div>
        <p className="font-display text-sm font-semibold text-ink">{title}</p>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-stone">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
