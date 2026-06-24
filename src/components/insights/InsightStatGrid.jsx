import InsightStatRow from "./InsightStatRow";

export default function InsightStatGrid({ stats }) {
  if (!stats || stats.length === 0) return null;
  return (
    <div className="rounded-3xl border border-border bg-surface px-5 py-1">
      {stats.map((stat, i) => (
        <InsightStatRow
          key={stat.id}
          stat={stat}
          isLast={i === stats.length - 1}
        />
      ))}
    </div>
  );
}
