// src/components/morningFlow/MorningFlowBenefitsGrid.jsx
// Morning Flow's "Today's Benefits" informational cards.
// Purely informational — no logic, no personalization yet.

import { TrendingUp, Zap, Feather, Brain, Heart } from "lucide-react";

const BENEFITS = [
  { id: "posture", label: "Improve posture", icon: TrendingUp },
  { id: "energy", label: "Boost energy", icon: Zap },
  { id: "stiffness", label: "Reduce stiffness", icon: Feather },
  { id: "focus", label: "Increase focus", icon: Brain },
  { id: "beginners", label: "Gentle on beginners", icon: Heart },
];

export default function MorningFlowBenefitsGrid() {
  return (
    <section className="space-y-3">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70 px-1">
        Today's Benefits
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.id}
              className="rounded-2xl bg-surface p-4 flex items-center gap-2.5 shadow-soft"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(134,159,138,0.12)",
                  border: "1px solid rgba(134,159,138,0.22)",
                }}
              >
                <Icon size={15} strokeWidth={1.8} className="text-sage" />
              </div>
              <p className="font-display text-sm font-medium text-ink leading-snug">
                {benefit.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
