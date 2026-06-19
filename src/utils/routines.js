import { ROUTINES } from "../data/routines";

export function getRoutinesByCategory(categoryId) {
  return ROUTINES.filter((routine) => routine.categoryId === categoryId);
}

export function getRoutineById(routineId) {
  return ROUTINES.find((routine) => routine.id === routineId) ?? null;
}

export function getTotalExerciseSeconds(routine) {
  return routine.exercises.reduce(
    (total, exercise) => total + exercise.duration,
    0,
  );
}
