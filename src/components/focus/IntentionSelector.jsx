import { FOCUS_INTENTIONS } from "../../data/focusSessions";

export default function IntentionSelector({ selected, onSelect }) {
  return (
    <div>
      <p className="mb-3 font-display text-sm font-medium text-ink">
        What are you working on?{" "}
        <span className="font-normal text-stone">(optional)</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {FOCUS_INTENTIONS.map((intention) => {
          const isSelected = selected === intention.id;
          return (
            <button
              key={intention.id}
              type="button"
              onClick={() => onSelect(isSelected ? null : intention.id)}
              aria-pressed={isSelected}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                isSelected
                  ? "border-moss bg-moss text-canvas"
                  : "border-border bg-canvas text-ink hover:border-sage/60"
              }`}
            >
              {intention.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
