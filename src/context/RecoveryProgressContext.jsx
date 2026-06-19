import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RECOVERY_COMPLETIONS_STORAGE_KEY } from "../constants/recoveryProgress";
import { getDateKey } from "../utils/date";

const RecoveryProgressContext = createContext(null);

export function RecoveryProgressProvider({ children }) {
  const [completions, setCompletions] = useLocalStorage(
    RECOVERY_COMPLETIONS_STORAGE_KEY,
    [],
  );

  const addCompletion = (session) => {
    const now = new Date();
    const record = {
      id: `${session.id}-${now.getTime()}`,
      sessionId: session.id,
      sessionTitle: session.title,
      duration: session.duration,
      dateKey: getDateKey(now),
      timestamp: now.toISOString(),
    };
    setCompletions((prev) => [record, ...prev]);
  };

  const value = useMemo(() => {
    const todayKey = getDateKey();
    const hasCompletedToday = completions.some((c) => c.dateKey === todayKey);
    return { completions, hasCompletedToday, addCompletion };
  }, [completions]);

  return (
    <RecoveryProgressContext.Provider value={value}>
      {children}
    </RecoveryProgressContext.Provider>
  );
}

export function useRecoveryProgress() {
  const ctx = useContext(RecoveryProgressContext);
  if (!ctx) {
    throw new Error(
      "useRecoveryProgress must be used within a RecoveryProgressProvider",
    );
  }
  return ctx;
}
