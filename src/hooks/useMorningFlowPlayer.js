// src/hooks/useMorningFlowPlayer.js
// Manages all Morning Flow player state and transitions.
// No timers, no persistence, no progress tracking — purely local UI state
// for navigating between exercises and screens.

import { useState, useMemo, useCallback } from "react";
import {
  buildFlatExerciseList,
  parseDurationToSeconds,
} from "../utils/morningFlowPlayer";

export const PLAYER_STATUS = {
  INTRO: "intro",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export function useMorningFlowPlayer() {
  const flatExercises = useMemo(() => buildFlatExerciseList(), []);
  const totalExercises = flatExercises.length;

  const [status, setStatus] = useState(PLAYER_STATUS.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const currentExercise = flatExercises[currentIndex] ?? null;

  const categoryExercises = useMemo(() => {
    if (!currentExercise) return [];
    return flatExercises.filter(
      (exercise) => exercise.category === currentExercise.category,
    );
  }, [flatExercises, currentExercise]);

  const indexWithinCategory = useMemo(() => {
    if (!currentExercise) return 0;
    return categoryExercises.findIndex((e) => e.id === currentExercise.id);
  }, [categoryExercises, currentExercise]);

  const estimatedTotalSeconds = useMemo(
    () =>
      flatExercises.reduce(
        (sum, exercise) => sum + parseDurationToSeconds(exercise.duration),
        0,
      ),
    [flatExercises],
  );

  const begin = useCallback(() => {
    setCurrentIndex(0);
    setIsPaused(false);
    setCompletedCount(0);
    setStatus(PLAYER_STATUS.ACTIVE);
  }, []);

  const goNext = useCallback(() => {
    const isLast = currentIndex >= totalExercises - 1;
    if (isLast) {
      setCompletedCount(totalExercises);
      setStatus(PLAYER_STATUS.COMPLETED);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  }, [currentIndex, totalExercises]);

  const goPrevious = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Skip currently behaves identically to advancing to the next exercise.
  // Kept as a distinct action so a future phase can record skipped vs.
  // completed exercises differently without changing any call sites.
  const skipExercise = useCallback(() => {
    goNext();
  }, [goNext]);

  // Visual only — there is no timer yet for this to actually pause.
  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  const finishWorkout = useCallback(() => {
    setCompletedCount(currentIndex);
    setStatus(PLAYER_STATUS.COMPLETED);
  }, [currentIndex]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setIsPaused(false);
    setCompletedCount(0);
    setStatus(PLAYER_STATUS.INTRO);
  }, []);

  return {
    status,
    totalExercises,
    currentIndex,
    currentExercise,
    indexWithinCategory,
    categoryExerciseCount: categoryExercises.length,
    isPaused,
    completedCount,
    estimatedTotalSeconds,
    begin,
    goNext,
    goPrevious,
    skipExercise,
    togglePause,
    finishWorkout,
    restart,
  };
}
