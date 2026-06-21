import { Sunrise, Wind, Eye } from "lucide-react";
import { ACTIVITY_TYPES } from "../../utils/activity";

const TYPE_META = {
  [ACTIVITY_TYPES.ROUTINE]: {
    label: "Morning Routine",
    icon: Sunrise,
    className: "bg-sage/15 text-moss",
  },
  [ACTIVITY_TYPES.RECOVERY]: {
    label: "Study Break Recovery",
    icon: Wind,
    className: "bg-dew/15 text-dew",
  },
  [ACTIVITY_TYPES.EYE]: {
    label: "Eye Recovery",
    icon: Eye,
    className: "bg-dew/15 text-dew",
  },
};

export default function ActivityTypeBadge({ type }) {
  const meta = TYPE_META[type];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <span
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.className}`}
    >
      <Icon size={12} strokeWidth={2} />
      {meta.label}
    </span>
  );
}
