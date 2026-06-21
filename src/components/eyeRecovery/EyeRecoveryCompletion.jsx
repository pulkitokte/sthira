import { CheckCircle2 } from "lucide-react";
import CompletionScreen from "../common/CompletionScreen";

export default function EyeRecoveryCompletion({ session, onBackToLibrary }) {
  return (
    <CompletionScreen
      icon={CheckCircle2}
      accent="dew"
      heading="Your eyes can rest easier now."
      description={`${session.title} — a small pause that helps you keep going.`}
      buttonLabel="Back to Eye Recovery"
      onButtonClick={onBackToLibrary}
    />
  );
}
