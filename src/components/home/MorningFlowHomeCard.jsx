// src/components/home/MorningFlowHomeCard.jsx
// Home page entry card for Morning Flow — styled consistently with
// existing Home feature cards (Hydration, Wellness, etc.).

import { Sunrise } from "lucide-react";

export default function MorningFlowHomeCard({ onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="w-full rounded-3xl p-5 text-left transition-all duration-200 hover:shadow-md"
      style={{
        background:
          "linear-gradient(160deg, rgba(134,159,138,0.1) 0%, rgba(185,175,160,0.08) 100%)",
        border: "1px solid rgba(134,159,138,0.22)",
        boxShadow: "0 2px 16px rgba(134,159,138,0.06)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="mt-0.5 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: "rgba(134,159,138,0.14)",
            border: "1px solid rgba(134,159,138,0.25)",
          }}
        >
          <Sunrise size={18} strokeWidth={1.8} className="text-sage" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-medium text-ink leading-snug">
            Morning Flow
          </p>
          <p className="text-sm text-stone font-light mt-1 leading-relaxed">
            Wake up your body before your day begins.
          </p>
          <p
            className="mt-3 text-xs font-semibold tracking-wide uppercase"
            style={{ color: "#869F8A" }}
          >
            Start today's flow →
          </p>
        </div>
      </div>
    </button>
  );
}
