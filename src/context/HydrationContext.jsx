import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useOnboarding } from "./OnboardingContext";
import {
  HYDRATION_LOGS_STORAGE_KEY,
  HYDRATION_GOAL_STORAGE_KEY,
} from "../constants/hydration";
import { getDateKey } from "../utils/date";
import {
  getTodayTotal,
  getDailyTotals,
  getDefaultGoalForActivityLevel,
} from "../utils/hydration";

const HydrationContext = createContext(null);

export function HydrationProvider({ children }) {
  const [logs, setLogs] = useLocalStorage(HYDRATION_LOGS_STORAGE_KEY, []);
  const [customGoal, setCustomGoal] = useLocalStorage(
    HYDRATION_GOAL_STORAGE_KEY,
    null,
  );
  const { data: onboardingData } = useOnboarding();

  const addLog = (amount) => {
    const rounded = Math.round(Number(amount));
    if (!rounded || rounded <= 0) return;
    const now = new Date();
    const record = {
      id: `hydration-${now.getTime()}`,
      amount: rounded,
      dateKey: getDateKey(now),
      timestamp: now.toISOString(),
    };
    setLogs((prev) => [record, ...prev]);
  };

  const updateGoal = (value) => {
    const rounded = Math.round(Number(value));
    if (!rounded || rounded <= 0) return;
    setCustomGoal(rounded);
  };

  const resetHydrationHistory = () => setLogs([]);

  const value = useMemo(() => {
    const goal =
      customGoal ??
      getDefaultGoalForActivityLevel(onboardingData.activityLevel);
    const todayTotal = getTodayTotal(logs);
    const remaining = Math.max(goal - todayTotal, 0);
    const percentage =
      goal > 0 ? Math.min(Math.round((todayTotal / goal) * 100), 100) : 0;
    const dailyTotals = getDailyTotals(logs);
    const todayKey = getDateKey();
    const todaysLogs = logs
      .filter((log) => log.dateKey === todayKey)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
      logs,
      goal,
      isCustomGoal: customGoal !== null,
      todayTotal,
      remaining,
      percentage,
      dailyTotals,
      todaysLogs,
      addLog,
      updateGoal,
      resetHydrationHistory,
    };
  }, [logs, customGoal, onboardingData.activityLevel]);

  return (
    <HydrationContext.Provider value={value}>
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration() {
  const ctx = useContext(HydrationContext);
  if (!ctx) {
    throw new Error("useHydration must be used within a HydrationProvider");
  }
  return ctx;
}
