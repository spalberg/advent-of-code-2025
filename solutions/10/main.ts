import { defineSolution, type Input, runSolution } from "@/utils.ts";
import { memoize } from "@std/cache";

const solution = defineSolution(10, (input) => {
  const machines = parse(input);
  return {
    part1: () =>
      machines.map(({ buttonWiringSchematics, indicatorLightDiagram }) =>
        Math.min(
          ...(solveIndicatorLightDiagram(
            buttonWiringSchematics,
            indicatorLightDiagram,
          ).map((bp) => bp.length)),
        )
      ).reduce((a, b) => a + b),
    part2: () => machines.map(solveJoltage).reduce((a, b) => a + b),
  };
});

interface Machine {
  indicatorLightDiagram: number;
  buttonWiringSchematics: Array<number>;
  joltageRequirements: Array<number>;
}

function solveIndicatorLightDiagram(
  buttonWiringSchematics: Array<number>,
  target: number,
): Array<Array<number>> {
  return getAllCombinations(buttonWiringSchematics)
    .map((buttonPresses) =>
      [
        buttonPresses.reduce((acc, n) => acc ^ n, 0),
        buttonPresses,
      ] as const
    )
    .filter(([lights]) => lights === target)
    .map(([, buttonPresses]) => buttonPresses);
}

// thanks to https://www.reddit.com/r/adventofcode/comments/1pk87hl/2025_day_10_part_2_bifurcate_your_way_to_victory/
function solveJoltage(
  { joltageRequirements, buttonWiringSchematics }: Machine,
) {
  const solve = memoize((target: number) =>
    solveIndicatorLightDiagram(buttonWiringSchematics, target)
  );
  const inner = memoize((joltageRequirements: Array<number>) => {
    if (joltageRequirements.every((req) => req === 0)) return 0;
    if (joltageRequirements.some((req) => req < 0)) return Infinity;
    const target = getUnevenBits(joltageRequirements);
    const solutions = solve(target);
    if (solutions.length === 0) return Infinity;
    let result = Infinity;
    for (const buttonPresses of solutions) {
      const newJoltageRequirements = buttonPresses
        .reduce((acc, btn) => subtractBinary(acc, btn), joltageRequirements)
        .map((n) => n / 2);
      const resultForNewJoltageRequirements = inner(newJoltageRequirements);
      result = Math.min(
        result,
        2 * resultForNewJoltageRequirements + buttonPresses.length,
      );
    }
    return result;
  }, { getKey: (args) => args.join(",") });
  return inner(joltageRequirements);
}

function getUnevenBits(nums: Array<number>) {
  return parseUint32Binary(
    nums.map((n) => n % 2 === 0 ? "0" : "1").join(""),
  );
}

function getAllCombinations<T>(items: Array<T>) {
  const result: Array<Array<T>> = [];
  const count = 1 << items.length;
  for (let mask = 0; mask < count; mask++) {
    const combination: T[] = [];
    for (let i = 0; i < items.length; i++) {
      if (mask & (1 << i)) {
        combination.push(items[i]);
      }
    }
    result.push(combination);
  }
  return result;
}

function subtractBinary(n: Array<number>, b: number): Array<number> {
  const bitLength = n.length;
  return n.map((value, index) => value - ((b >> bitLength - 1 - index) & 1));
}

function parse(input: Input): Array<Machine> {
  return input.map((line) =>
    line.split(" ").map((chunk) => chunk.substring(1, chunk.length - 1))
  ).map((chunks) => {
    const firstChunk = chunks.shift()!;
    const indicatorLightCount = firstChunk.length;
    const indicatorLightDiagram = parseUint32Binary(
      firstChunk.replaceAll(".", "0").replaceAll("#", "1"),
    );
    const joltageRequirements = chunks.pop()!.split(",").map(Number);
    const buttonWiringSchematics = chunks.map((chunk) =>
      chunk.split(",").map(Number)
    ).map((buttonWiringSchematic) =>
      parseUint32Binary(
        Array.from({ length: indicatorLightCount }).map((_, i) =>
          buttonWiringSchematic.includes(i) ? "1" : "0"
        ).join(""),
      )
    );
    return {
      indicatorLightDiagram,
      buttonWiringSchematics,
      joltageRequirements,
    };
  });
}

function parseUint32Binary(binString: string) {
  return parseInt(binString, 2) >>> 0;
}

// deno-lint-ignore no-unused-vars
function stringifyUint32Binary(num: number, length: number) {
  return (num >>> 0).toString(2).padStart(length, "0");
}

if (import.meta.main) {
  await runSolution(solution);
}

export default solution;
