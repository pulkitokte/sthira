import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { EYE_RECOVERY_COMPLETIONS_STORAGE_KEY } from "../constants/eyeRecoveryProgress";
import { getDateKey } from "../utils/date";

const EyeRecoveryProgressContext = createContext(null);

export function EyeRecoveryProgressProvider({ children }) {
  const [completions, setCompletions] = useLocalStorage(
    EYE_RECOVERY_COMPLETIONS_STORAGE_KEY,
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

  const resetEyeRecoveryProgress = () => setCompletions([]);

  const value = useMemo(() => {
    const todayKey = getDateKey();
    const hasCompletedToday = completions.some((c) => c.dateKey === todayKey);
    return {
      completions,
      hasCompletedToday,
      addCompletion,
      resetEyeRecoveryProgress,
    };
  }, [completions]);

  return (
    <EyeRecoveryProgressContext.Provider value={value}>
      {children}
    </EyeRecoveryProgressContext.Provider>
  );
}

export function useEyeRecoveryProgress() {
  const ctx = useContext(EyeRecoveryProgressContext);
  if (!ctx) {
    throw new Error(
      "useEyeRecoveryProgress must be used within an EyeRecoveryProgressProvider",
    );
  }
  return ctx;
}
