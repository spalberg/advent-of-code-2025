import day1 from "./1/main.ts";
import day2 from "./2/main.ts";
import day3 from "./3/main.ts";
import day4 from "./4/main.ts";
import day5 from "./5/main.ts";
import day6 from "./6/main.ts";
import day7 from "./7/main.ts";
import day8 from "./8/main.ts";
import type { SolutionFn } from "./utils.ts";

const solutions = new Map<number, SolutionFn>(
  [day1, day2, day3, day4, day5, day6, day7, day8].map((
    { day, solutionFn },
  ) => [day, solutionFn]),
);

export function getSolutionForDay(day: number): SolutionFn | null {
  return solutions.get(day) ?? null;
}

export function getAvailableSolutions(): Array<number> {
  return [...solutions.keys()].toSorted((a, b) => a - b);
}

export {
  readLinesFromFile,
  readLinesFromStdin,
  readLinesFromUrl,
} from "./utils.ts";
