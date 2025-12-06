import { defineSolution, runSolution } from "@/utils.ts";

const solution = defineSolution((input) => {
  return {
    part1: () => part1(input),
    part2: () => part2(input),
  };
});

function part1(input: Array<string>) {
  return getAccessibleRollsOfPaper(input).length;
}

function part2(input: Array<string>) {
  let accessibleRollsOfPaper = getAccessibleRollsOfPaper(input);
  let total = accessibleRollsOfPaper.length;
  while (accessibleRollsOfPaper.length > 0) {
    input = removeRollsOfPaper(input, accessibleRollsOfPaper);
    accessibleRollsOfPaper = getAccessibleRollsOfPaper(input);
    total += accessibleRollsOfPaper.length;
  }
  return total;
}

function getAccessibleRollsOfPaper(input: Array<string>) {
  const accessibleRollsOfPaper: Array<[x: number, y: number]> = [];
  for (let y = 0; y < input.length; y += 1) {
    for (let x = 0; x < input[y].length; x += 1) {
      if (input[y][x] !== "@") continue;
      let adjCount = 0;
      for (
        let ya = Math.max(0, y - 1);
        ya < Math.min(input.length, y + 2);
        ya += 1
      ) {
        for (
          let xa = Math.max(0, x - 1);
          xa < Math.min(input[ya].length, x + 2);
          xa += 1
        ) {
          if (ya === y && xa === x) continue;
          if (input[ya][xa] === "@") adjCount += 1;
        }
      }
      if (adjCount < 4) accessibleRollsOfPaper.push([x, y]);
    }
  }
  return accessibleRollsOfPaper;
}

function removeRollsOfPaper(
  input: Array<string>,
  rollsOfPaper: Array<[x: number, y: number]>,
) {
  const raw = input.map((l) => l.split(""));
  for (const [x, y] of rollsOfPaper) {
    raw[y][x] = ".";
  }
  return raw.map((arr) => arr.join(""));
}

if (import.meta.main) {
  runSolution(solution, 4);
}

export default solution;
