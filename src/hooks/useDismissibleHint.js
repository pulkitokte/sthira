import { useLocalStorage } from "./useLocalStorage";

/**
 * Each hint gets its own storage key, so dismissing one hint can never
 * affect another — no shared array, no risk of clobbering state across
 * pages that mount independently.
 */
export function useDismissibleHint(hintId) {
  const storageKey = `sthira:hint:${hintId}`;
  const [isDismissed, setIsDismissed] = useLocalStorage(storageKey, false);

  return {
    isVisible: !isDismissed,
    dismiss: () => setIsDismissed(true),
  };
}
