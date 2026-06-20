export default function WellnessOptionSelector({
  dimension,
  selectedValue,
  onSelect,
}) {
  const Icon = dimension.icon;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 px-1">
        <Icon size={16} className="text-moss" strokeWidth={1.8} />
        <p className="font-display text-sm font-semibold text-ink">
          {dimension.label}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {dimension.options.map((opt) => {
          const selected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                selected
                  ? "border-moss bg-moss text-canvas"
                  : "border-border bg-canvas text-ink hover:border-sage/60"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
