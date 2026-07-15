// src/components/morningFlow/ExerciseTipsSection.jsx
// Renders Safety Tips, Common Mistakes, and Beginner Notes for the
// current exercise, using the shared ExpandableTipCard for all three —
// zero duplicated card markup.

import { ShieldCheck, AlertTriangle, Info } from "lucide-react";
import ExpandableTipCard from "./ExpandableTipCard";
import { getTipsForExercise } from "../../data/morningFlowTips";

export default function ExerciseTipsSection({ exercise }) {
  const tips = getTipsForExercise(exercise);
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
