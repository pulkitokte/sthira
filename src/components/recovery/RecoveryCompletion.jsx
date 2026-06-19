import { CheckCircle2 } from "lucide-react";
import PageContainer from "../layout/PageContainer";

export default function RecoveryCompletion({ session, onBackToLibrary }) {
  return (
    <PageContainer className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-dew/15">
        <CheckCircle2 size={34} className="text-dew" strokeWidth={1.6} />
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Nice reset.
        </h1>
        <p className="max-w-xs leading-relaxed text-stone">
          {session.title} — a small pause that adds up over the day.
        </p>
      </div>

      <button
        onClick={onBackToLibrary}
        className="w-full max-w-xs rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors hover:bg-moss-dark"
      >
        Back to Recovery Library
      </button>
    </PageContainer>
  );
}
