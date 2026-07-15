// src/components/morningFlow/ExerciseTipsSection.jsx
// Renders Safety Tips, Common Mistakes, and Beginner Notes for the
// current exercise. Memoized and derives tips via useMemo keyed on
// exercise.id to avoid recomputing the lookup on unrelated re-renders.

import { memo, useMemo } from "react";
import { ShieldCheck, AlertTriangle, Info } from "lucide-react";
import ExpandableTipCard from "./ExpandableTipCard";
import { getTipsForExercise } from "../../data/morningFlowTips";

function ExerciseTipsSection({ exercise }) {
  const tips = useMemo(() => getTipsForExercise(exercise), [exercise]);
  if (!tips) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <ExpandableTipCard
        title="Safety Tips"
        icon={ShieldCheck}
        items={tips.safetyTips}
      />
      <ExpandableTipCard
        title="Common Mistakes"
        icon={AlertTriangle}
        items={tips.commonMistakes}
      />
      <ExpandableTipCard
        title="Beginner Notes"
        icon={Info}
        items={tips.beginnerNotes}
      />
    </div>
  );
}

export default memo(ExerciseTipsSection);
