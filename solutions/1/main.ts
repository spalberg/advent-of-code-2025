import { defineSolution, runSolution } from "@/utils.ts";

const solution = defineSolution(1, (input) => {
  const { finalZeros, intermediateZeros } = solve(input);
  return {
    part1: () => finalZeros,
    part2: () => finalZeros + intermediateZeros,
  };
});

function solve(input: Array<string>) {
  let pos = 50;
  let intermediateZeros = 0;
  let finalZeros = 0;
  for (const line of input) {
    const dist = parseDist(line);
    const rotations = Math.abs(Math.trunc(dist / 100));
    intermediateZeros += rotations;
    const remainingDist = dist % 100;
    const sum = pos + remainingDist;
    if (remainingDist !== 0 && pos !== 0 && (sum < 0 || sum > 100)) {
      intermediateZeros += 1;
    }
    pos = (sum + 100) % 100;
    if (pos === 0) {
      finalZeros += 1;
    }
  }
  return { finalZeros, intermediateZeros };
}

function parseDist(line: string) {
  const turn = line[0] === "L" ? -1 : 1;
  const dist = Number(line.slice(1));
  return turn * dist;
}

if (import.meta.main) {
  await runSolution(solution);
}

export default solution;
