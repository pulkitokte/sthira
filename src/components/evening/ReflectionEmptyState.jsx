// src/components/evening/ReflectionEmptyState.jsx
// Premium empty state for when no reflections exist yet.

export default function ReflectionEmptyState({ onBegin }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 gap-6">
      {/* Decorative element */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: "rgba(185, 160, 120, 0.1)",
            border: "1.5px solid rgba(185, 160, 120, 0.3)",
          }}
        />
        <div
          className="w-10 h-px"
          style={{ background: "rgba(185, 160, 120, 0.3)" }}
        />
        <div
          className="w-6 h-px"
          style={{ background: "rgba(185, 160, 120, 0.2)" }}
        />
      </div>

      <div className="space-y-2 max-w-xs">
        <p className="font-display text-lg font-light text-ink tracking-tight">
          A quiet close to the day.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          Evening reflection is one of the simplest things you can do for your
          wellbeing. It takes only a few minutes.
        </p>
      </div>

      <button
        onClick={onBegin}
        className="px-8 py-3 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90"
        style={{ background: "#869F8A" }}
      >
        Begin tonight's reflection
      </button>
    </div>
  );
}
