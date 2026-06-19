import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { COMPLETIONS_STORAGE_KEY } from "../constants/progress";
import { getDateKey } from "../utils/date";
import { computeStreaks } from "../utils/progress";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completions, setCompletions] = useLocalStorage(
    COMPLETIONS_STORAGE_KEY,
    [],
  );

  const addCompletion = (routine) => {
    const now = new Date();
    const record = {
      id: `${routine.id}-${now.getTime()}`,
      routineId: routine.id,
      routineTitle: routine.title,
      duration: routine.duration,
      dateKey: getDateKey(now),
      timestamp: now.toISOString(),
    };
    setCompletions((prev) => [record, ...prev]);
  };

  const resetProgress = () => setCompletions([]);

  const value = useMemo(() => {
    const todayKey = getDateKey();
    const todaysCompletions = completions.filter((c) => c.dateKey === todayKey);
    const { currentStreak, longestStreak } = computeStreaks(completions);
    const recentCompletions = [...completions].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    );

    return {
      completions,
      recentCompletions,
      hasCompletedToday: todaysCompletions.length > 0,
      totalCompletedToday: todaysCompletions.length,
      currentStreak,
      longestStreak,
      addCompletion,
      resetProgress,
    };
  }, [completions]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
