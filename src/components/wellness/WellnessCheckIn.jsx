import WellnessOptionSelector from "./WellnessOptionSelector";
import { WELLNESS_DIMENSIONS } from "../../constants/wellness";
import { useWellness } from "../../context/WellnessContext";

export default function WellnessCheckIn() {
  const { todayEntry, updateTodayField } = useWellness();

  return (
    <div className="flex flex-col gap-6 rounded-4xl bg-surface p-6 shadow-soft">
      {WELLNESS_DIMENSIONS.map((dimension) => (
        <WellnessOptionSelector
          key={dimension.id}
          dimension={dimension}
          selectedValue={todayEntry?.[dimension.id] ?? null}
          onSelect={(value) => updateTodayField(dimension.id, value)}
        />
      ))}
    </div>
  );
}
