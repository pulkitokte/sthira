import { createContext, useContext, useMemo, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { JOURNEY_STORAGE_KEY } from "../constants/journey";
import { getDateKey } from "../utils/date";

const DEFAULT_STATE = { dateKey: null, completedIds: [] };

const JourneyContext = createContext(null);

export function JourneyProvider({ children }) {
  const [stored, setStored] = useLocalStorage(
    JOURNEY_STORAGE_KEY,
    DEFAULT_STATE,
  );
  const todayKey = getDateKey();

  // If the stored dateKey isn't today, treat completedIds as empty —
  // this is how the daily reset works: no cron, no timer, just a mismatch check.
  const isToday = stored.dateKey === todayKey;
  const completedIds = isToday ? (stored.completedIds ?? []) : [];

  const markComplete = useCallback(
    (activityId) => {
      setStored((prev) => {
        const prevIds =
          prev.dateKey === todayKey ? (prev.completedIds ?? []) : [];
        return {
          dateKey: todayKey,
          completedIds: [...new Set([...prevIds, activityId])],
        };
      });
    },
    [todayKey, setStored],
  );

  const isComplete = useCallback(
    (activityId) => completedIds.includes(activityId),
    [completedIds],
  );

  const resetJourney = useCallback(() => setStored(DEFAULT_STATE), [setStored]);

  const value = useMemo(
    () => ({
      completedIds,
      totalCompleted: completedIds.length,
      markComplete,
      isComplete,
      resetJourney,
    }),
    [completedIds, markComplete, isComplete, resetJourney],
  );

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within a JourneyProvider");
  return ctx;
}
