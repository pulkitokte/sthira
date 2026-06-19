import { Flame, Leaf } from "lucide-react";

export default function ConsistencyCard({ currentStreak, longestStreak }) {
  return (
    <div className="flex gap-3">
      <div className="flex-1 rounded-3xl border border-border bg-surface p-5">
        <Flame size={18} className="text-clay" strokeWidth={1.8} />
        <p className="mt-3 font-display text-2xl font-semibold text-ink">
          {currentStreak}
        </p>
        <p className="mt-0.5 text-xs text-stone">Day streak</p>
      </div>
      <div className="flex-1 rounded-3xl border border-border bg-surface p-5">
        <Leaf size={18} className="text-sage" strokeWidth={1.8} />
        <p className="mt-3 font-display text-2xl font-semibold text-ink">
          {longestStreak}
        </p>
        <p className="mt-0.5 text-xs text-stone">Longest streak</p>
      </div>
    </div>
  );
}
