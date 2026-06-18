import { Droplet } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";

export default function HydrationTracker() {
  return (
    <PageContainer className="flex flex-col items-center justify-center gap-4 text-center">
      <Droplet size={40} className="text-dew" strokeWidth={1.6} />
      <h1 className="font-display text-xl font-semibold text-moss">
        Stay hydrated
      </h1>
      <p className="max-w-xs leading-relaxed text-stone">
        A simple way to log water through the day is coming soon — no targets to
        chase, just a gentle nudge to drink.
      </p>
    </PageContainer>
  );
}
