import { QUICK_LOG_AMOUNTS } from "../../constants/hydration";

export default function QuickLogButtons({ onLog }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {QUICK_LOG_AMOUNTS.map((amount) => (
        <button
          key={amount}
          onClick={() => onLog(amount)}
          className="rounded-2xl border border-border bg-surface py-4 text-center transition-colors duration-150 hover:border-dew/60 active:scale-[0.98]"
        >
          <span className="font-display text-base font-semibold text-ink">
            +{amount}
          </span>
          <span className="mt-0.5 block text-xs text-stone">ml</span>
        </button>
      ))}
    </div>
  );
}
