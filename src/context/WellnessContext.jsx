import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { WELLNESS_ENTRIES_STORAGE_KEY } from "../constants/wellness";
import { getDateKey } from "../utils/date";
import {
  getTodayEntry,
  upsertEntry,
  getRecentEntries,
} from "../utils/wellness";

const WellnessContext = createContext(null);

export function WellnessProvider({ children }) {
  const [entries, setEntries] = useLocalStorage(
    WELLNESS_ENTRIES_STORAGE_KEY,
    [],
  );

  const updateTodayField = (dimensionId, value) => {
    const todayKey = getDateKey();
    setEntries((prev) => upsertEntry(prev, todayKey, { [dimensionId]: value }));
  };

  const resetWellnessData = () => setEntries([]);

  const value = useMemo(() => {
    const todayEntry = getTodayEntry(entries);
    const recentEntries = getRecentEntries(entries, 7);
    return {
      entries,
      todayEntry,
      recentEntries,
      updateTodayField,
      resetWellnessData,
    };
  }, [entries]);

  return (
    <WellnessContext.Provider value={value}>
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellness() {
  const ctx = useContext(WellnessContext);
  if (!ctx) {
    throw new Error("useWellness must be used within a WellnessProvider");
  }
  return ctx;
}
