import { Leaf } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";

export default function WellnessTracker() {
  return (
    <PageContainer className="flex flex-col items-center justify-center gap-4 text-center">
      <Leaf size={40} className="text-sage" strokeWidth={1.6} />
      <h1 className="font-display text-xl font-semibold text-moss">
        Check in with yourself
      </h1>
      <p className="max-w-xs leading-relaxed text-stone">
        A light end-of-day reflection — what you did, how your body feels — is
        coming soon.
      </p>
    </PageContainer>
  );
}
