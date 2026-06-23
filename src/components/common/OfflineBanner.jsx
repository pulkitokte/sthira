import { WifiOff } from "lucide-react";

/**
 * Shown as a slim bar at the top of the app content area when the device
 * goes offline. Since Sthira is fully local-first (all data in localStorage),
 * the app continues to work normally — this banner is just a calm heads-up,
 * not an error state.
 */
export default function OfflineBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="You are offline"
      className="flex items-center justify-center gap-2 bg-clay/15 px-4 py-2.5 text-sm text-clay"
    >
      <WifiOff size={14} strokeWidth={2} aria-hidden="true" />
      <span>You're offline — your saved data is still available.</span>
    </div>
  );
}
