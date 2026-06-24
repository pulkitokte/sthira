import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export default function DailyRitualCard({ ritual }) {
  const navigate = useNavigate();
  if (!ritual) return null;

  const handleCta = () => {
    if (ritual.navigation?.path) {
      navigate(ritual.navigation.path, {
        state: ritual.navigation.state ?? undefined,
      });
    }
  };

  return (
    <div className="rounded-4xl bg-surface p-7 shadow-soft">
      {/* Eyebrow */}
      <div className="mb-4 flex items-center gap-1.5">
        <Sparkles
          size={13}
          className="text-clay"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <span className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-clay">
          Today's Ritual
        </span>
      </div>

      {/* Title */}
      <h2 className="font-display text-xl font-semibold leading-snug text-ink">
        {ritual.title}
      </h2>

      {/* Reflection */}
      <p className="mt-3 leading-relaxed text-stone">{ritual.reflection}</p>

      {/* Divider */}
      <div className="my-5 h-px bg-border" aria-hidden="true" />

      {/* Suggestion */}
      <p className="text-sm leading-relaxed text-stone">{ritual.suggestion}</p>

      {/* CTA */}
      <button
        type="button"
        onClick={handleCta}
        aria-label={ritual.cta}
        className="mt-5 flex items-center gap-1.5 font-display text-sm font-semibold text-moss transition-colors hover:text-moss-dark"
      >
        {ritual.cta}
        <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  );
}
