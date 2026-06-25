import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import SleepRitualCard from "../components/sleep/SleepRitualCard";
import { SLEEP_RITUALS } from "../data/sleepRituals";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function SleepWindDown() {
  const navigate = useNavigate();
  useDocumentTitle("Sleep Wind-Down");

  const handleSelect = (ritual) => {
    navigate(PATHS.SLEEP_RITUAL_PLAYER, { state: { ritualId: ritual.id } });
  };

  return (
    <PageContainer className="flex flex-col gap-6">
      <p className="leading-relaxed text-stone">
        A quiet space to slow down before sleep. Choose a ritual that feels
        right for tonight.
      </p>
      <div className="flex flex-col gap-3">
        {SLEEP_RITUALS.map((ritual) => (
          <SleepRitualCard
            key={ritual.id}
            ritual={ritual}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </PageContainer>
  );
}
