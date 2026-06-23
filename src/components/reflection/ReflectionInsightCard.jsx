export default function ReflectionInsightCard({ text, accent = "neutral" }) {
  const borderClass =
    accent === "clay" ? "border-clay/25 bg-clay/5" : "border-border bg-surface";

  return (
    <div className={`rounded-2xl border px-5 py-4 ${borderClass}`}>
      <p className="text-sm leading-relaxed text-stone">{text}</p>
    </div>
  );
}
