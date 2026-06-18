import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { PATHS } from "../constants/navigation";

const LINKS = [
  { label: "Reminders", path: PATHS.REMINDERS },
  { label: "Replay onboarding", path: PATHS.ONBOARDING },
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <PageContainer className="flex flex-col gap-3">
      {LINKS.map(({ label, path }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className="flex items-center justify-between rounded-2xl bg-surface p-4 text-left shadow-soft"
        >
          <span className="font-display text-base font-medium text-ink">
            {label}
          </span>
          <ChevronRight size={18} className="text-stone" />
        </button>
      ))}
      <p className="px-1 text-sm text-stone">
        More preferences are coming soon.
      </p>
    </PageContainer>
  );
}
