import { Sunrise } from "lucide-react";

export default function SthiraLogo({
  size = 48,
  iconSize,
  showWordmark = false,
  className = "",
}) {
  const resolvedIconSize = iconSize ?? Math.round(size * 0.46);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-sage/20"
        style={{ width: size, height: size }}
      >
        <Sunrise
          size={resolvedIconSize}
          className="text-moss"
          strokeWidth={1.6}
        />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Sthira
        </span>
      )}
    </div>
  );
}
