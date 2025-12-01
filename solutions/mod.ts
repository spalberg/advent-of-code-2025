import day1 from "./1/main.ts";
import type { SolutionFn } from "./utils.ts";

const solutions = new Map<number, SolutionFn>([
  [1, day1],
]);

export function getSolutionForDay(day: number) {
  return solutions.get(day) ?? null;
}
