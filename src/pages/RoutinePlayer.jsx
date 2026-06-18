import { CircleDot } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";

export default function RoutinePlayer() {
  return (
    <PageContainer className="flex flex-col items-center justify-center gap-4 text-center">
      <CircleDot size={40} className="text-sage" strokeWidth={1.6} />
      <h1 className="font-display text-xl font-semibold text-moss">
        Your routine starts here
      </h1>
      <p className="max-w-xs leading-relaxed text-stone">
        This is where your guided routine will play, one step at a time.
        Step-by-step playback is coming in a future update.
      </p>
    </PageContainer>
  );
}
