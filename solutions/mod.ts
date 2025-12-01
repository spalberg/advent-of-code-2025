import day1 from "./1/main.ts";
import type { Solution } from "./utils.ts";

const solutions = new Map<number, Solution>([
  [1, day1],
]);

export function getSolutionForDay(day: number) {
  return solutions.get(day) ?? null;
}
