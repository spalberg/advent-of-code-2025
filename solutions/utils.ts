type PartFn = (input: Array<string>) => number;

export interface Solution {
  part1: PartFn | null;
  part2: PartFn | null;
}

export function defineSolution(solution: Partial<Solution>): Solution {
  return {
    part1: solution.part1 ?? null,
    part2: solution.part2 ?? null,
  };
}
