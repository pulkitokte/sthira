import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FOCUS_COMPLETIONS_STORAGE_KEY } from "../constants/focus";
import { getDateKey } from "../utils/date";

const FocusContext = createContext(null);

export function FocusProvider({ children }) {
  const [completions, setCompletions] = useLocalStorage(
    FOCUS_COMPLETIONS_STORAGE_KEY,
    [],
  );

  const addFocusCompletion = (session, actualSeconds, intention) => {
    const now = new Date();
    const record = {
      id: `focus-${now.getTime()}`,
      sessionId: session.id,
      sessionTitle: session.title,
      plannedDuration: session.duration,
      actualSeconds,
      intention: intention ?? null,
      dateKey: getDateKey(now),
      timestamp: now.toISOString(),
    };
    setCompletions((prev) => [record, ...prev]);
  };

  const value = useMemo(
    () => ({ completions, addFocusCompletion }),
    [completions], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
}

export function useFocus() {
  const ctx = useContext(FocusContext);
  if (!ctx) throw new Error("useFocus must be used within a FocusProvider");
  return ctx;
}
