import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ONBOARDING_STORAGE_KEY } from "../constants/onboarding";

const DEFAULT_ONBOARDING_DATA = {
  completed: false,
  firstName: "",
  wakeTime: "06:30",
  sleepTime: "22:30",
  studyHours: null,
  routineDuration: null,
  activityLevel: null,
  primaryGoal: null,
};

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [data, setData] = useLocalStorage(
    ONBOARDING_STORAGE_KEY,
    DEFAULT_ONBOARDING_DATA,
  );

  const updateField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const completeOnboarding = () => {
    setData((prev) => ({ ...prev, completed: true }));
  };

  const value = useMemo(
    () => ({
      data,
      updateField,
      completeOnboarding,
      isComplete: data.completed,
    }),
    [data],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return ctx;
}
