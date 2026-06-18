import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { PATHS } from "../constants/navigation";

const CATEGORIES = [
  { label: "Morning Movement", blurb: "Wake the body up, gently." },
  { label: "Quick Refresh", blurb: "Five minutes between study sessions." },
  { label: "Neck Stretches", blurb: "Ease tension from looking down." },
  { label: "Back Relief", blurb: "Loosen up after long sitting." },
  { label: "Posture", blurb: "Simple corrections you can feel." },
  { label: "Mobility", blurb: "Keep your joints comfortable." },
  { label: "Desk Exercises", blurb: "No need to leave your chair." },
  { label: "No-Equipment Workouts", blurb: "Just you and some floor space." },
];

export default function RoutineLibrary() {
  const navigate = useNavigate();

  return (
    <PageContainer className="flex flex-col gap-4">
      <p className="leading-relaxed text-stone">
        Pick what your body needs right now.
      </p>
      <div className="flex flex-col gap-3">
        {CATEGORIES.map(({ label, blurb }) => (
          <button
            key={label}
            onClick={() => navigate(PATHS.ROUTINE_PLAYER)}
            className="rounded-2xl bg-surface p-4 text-left shadow-soft transition-transform active:scale-[0.99]"
          >
            <p className="font-display text-base font-semibold text-moss">
              {label}
            </p>
            <p className="mt-1 text-sm text-stone">{blurb}</p>
          </button>
        ))}
      </div>
    </PageContainer>
  );
}
