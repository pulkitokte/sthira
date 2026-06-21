import { ROUTINES } from "../data/routines";

export function getRoutinesByCategory(categoryId) {
  return ROUTINES.filter((routine) => routine.categoryId === categoryId);
}

export function getRoutineById(routineId) {
  return ROUTINES.find((routine) => routine.id === routineId) ?? null;
}
