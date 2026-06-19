import RoutineCard from "./RoutineCard";

export default function CategorySection({
  category,
  routines,
  onSelectRoutine,
}) {
  const Icon = category.icon;

  return (
    <section>
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/20">
          <Icon size={18} className="text-moss" strokeWidth={1.8} />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-ink">
            {category.label}
          </h2>
          <p className="text-xs text-stone">{category.tagline}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {routines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onSelect={onSelectRoutine}
          />
        ))}
      </div>
    </section>
  );
}
