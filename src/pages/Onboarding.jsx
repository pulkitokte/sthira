import { useNavigate } from "react-router-dom";
import { Sunrise } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { PATHS } from "../constants/navigation";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <PageContainer className="flex flex-col items-center justify-center gap-6 text-center">
      <Sunrise size={48} className="text-moss" strokeWidth={1.6} />
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-moss">
          Welcome to Sthira
        </h1>
        <p className="leading-relaxed text-stone">
          A calm companion for the hours you spend sitting and studying. Sthira
          is built around one simple habit: a few minutes of movement each
          morning, with gentle support for your body through the rest of your
          day.
        </p>
      </div>
      <button
        onClick={() => navigate(PATHS.HOME)}
        className="w-full max-w-xs rounded-2xl bg-moss py-3 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-moss-dark"
      >
        Get Started
      </button>
    </PageContainer>
  );
}
