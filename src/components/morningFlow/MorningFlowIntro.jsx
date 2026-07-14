// src/components/morningFlow/MorningFlowIntro.jsx
// Intro screen shown before the guided flow begins.

import { Clock, Layers } from "lucide-react";
import FeatureHeader from "../layout/FeatureHeader";
import PageContainer from "../layout/PageContainer";
import { MORNING_FLOW_CATEGORIES } from "../../data/morningFlowCategories";
import { getExercisesByCategory } from "../../data/morningFlowExercises";
import { formatEstimatedTime } from "../../utils/morningFlowPlayer";

export default function MorningFlowIntro({
  totalExercises,
  estimatedTotalSeconds,
  onBegin,
}) {
  return (
    <>
      <FeatureHeader title="Morning Flow" />
      <PageContainer className="flex flex-1 flex-col gap-6">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-sage">
              Ready when you are
            </p>
            <h1 className="font-display text-[26px] font-semibold leading-snug text-ink">
              A calm, guided flow through {totalExercises} movements.
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
              <Clock size={13} strokeWidth={2} />~
              {formatEstimatedTime(estimatedTotalSeconds)}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
              <Layers size={13} strokeWidth={2} />
              {totalExercises} exercises
            </span>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-5 space-y-3">
            <p className="font-display text-sm font-semibold text-ink">
              What's ahead
            </p>
            <div className="flex flex-col gap-2">
              {MORNING_FLOW_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const count = getExercisesByCategory(category.id).length;
                return (
                  <div key={category.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(134,159,138,0.12)",
                        border: "1px solid rgba(134,159,138,0.22)",
                      }}
                    >
                      <Icon size={14} strokeWidth={1.8} className="text-sage" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-medium text-ink">
                        {category.label}
                      </p>
                    </div>
                    <span className="text-xs text-stone font-light">
                      {count} {count === 1 ? "exercise" : "exercises"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-stone">
            Move at your own pace. You can pause, skip, or step back to any
            exercise at any time.
          </p>
        </div>

        <button
          onClick={onBegin}
          className="w-full rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
        >
          Begin Flow
        </button>
      </PageContainer>
    </>
  );
}
