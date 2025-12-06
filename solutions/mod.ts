import day1 from "./1/main.ts";
import day2 from "./2/main.ts";
import day3 from "./3/main.ts";
import day4 from "./4/main.ts";
import day5 from "./5/main.ts";
import day6 from "./6/main.ts";
import type { SolutionFn } from "./utils.ts";

const solutions = new Map<number, SolutionFn>([
  [1, day1],
  [2, day2],
  [3, day3],
  [4, day4],
  [5, day5],
  [6, day6],
]);

export function getSolutionForDay(day: number) {
  return solutions.get(day) ?? null;
}
