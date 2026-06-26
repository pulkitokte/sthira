// src/hooks/useDailyCheckIn.js
// Manages daily check-in state for the UI.
// All persistence logic lives in dailyCheckIn.js utilities.

import { useState, useCallback } from "react";
import {
  getTodayKey,
  getQuestionForDate,
  loadTodayCheckIn,
  saveCheckIn,
} from "../utils/dailyCheckIn";

export const CHECKIN_STATE = {
  PENDING: "pending", // Not yet answered today
  AFFIRMING: "affirming", // Just answered — showing affirmation
  DONE: "done", // Affirmation acknowledged or already done today
};

export function useDailyCheckIn() {
  const todayKey = getTodayKey();
  const question = getQuestionForDate(todayKey);
  const existingEntry = loadTodayCheckIn();

  const [status, setStatus] = useState(
    existingEntry ? CHECKIN_STATE.DONE : CHECKIN_STATE.PENDING,
  );
  const [selectedOption, setSelectedOption] = useState(
    existingEntry?.selectedOption ?? null,
  );
  const [affirmation, setAffirmation] = useState(null);

  const isCompleted = status === CHECKIN_STATE.DONE;
  const isAffirming = status === CHECKIN_STATE.AFFIRMING;

  const selectOption = useCallback(
    (option) => {
      if (status !== CHECKIN_STATE.PENDING) return;

      // Find affirmation for selected option
      const match = question.options.find((o) => o.label === option.label);
      const affirmationText =
        match?.affirmation ?? "Thank you for checking in.";

      setSelectedOption(option.label);
      setAffirmation(affirmationText);
      setStatus(CHECKIN_STATE.AFFIRMING);

      // Persist to localStorage
      saveCheckIn(question.id, option.label);
    },
    [status, question],
  );

  const acknowledge = useCallback(() => {
    setStatus(CHECKIN_STATE.DONE);
  }, []);

  return {
    question,
    status,
    isCompleted,
    isAffirming,
    selectedOption,
    affirmation,
    selectOption,
    acknowledge,
  };
}
