import { CheckCircle2 } from "lucide-react";
import CompletionScreen from "../common/CompletionScreen";

export default function RoutineCompletion({
  routine,
  exerciseCount,
  onBackToLibrary,
}) {
  return (
    <CompletionScreen
      icon={CheckCircle2}
      accent="moss"
      heading="Morning routine complete."
      description={`${routine.title} — well done taking this time for your body.`}
      stats={[
        { value: routine.duration, label: "Minutes" },
        { value: exerciseCount, label: "Exercises" },
      ]}
      buttonLabel="Back to Library"
      onButtonClick={onBackToLibrary}
    />
  );
}
