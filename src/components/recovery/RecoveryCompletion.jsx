import { CheckCircle2 } from "lucide-react";
import CompletionScreen from "../common/CompletionScreen";

export default function RecoveryCompletion({ session, onBackToLibrary }) {
  return (
    <CompletionScreen
      icon={CheckCircle2}
      accent="dew"
      heading="Nice reset."
      description={`${session.title} — a small pause that adds up over the day.`}
      buttonLabel="Back to Recovery Library"
      onButtonClick={onBackToLibrary}
    />
  );
}
