import { defineSolution, runSolution } from "@/utils.ts";

const solution = defineSolution(7, (input) => {
  const it = solver(input);
  let result = it.next();
  for (; !result.done; result = it.next()) { /* ignored here */ }
  return {
    part1: () => result.value.splits,
    part2: () => result.value.beams.reduce((a, b) => a + b),
  };
});

export function* solver(tachyonManifold: Array<string>) {
  let splits = 0;
  const [first, ...rest] = tachyonManifold;
  const beams: Array<number> = first.split("").map((x) => x === "." ? 0 : 1);
  for (const row of rest) {
    const splitters = idxSet(row, (x) => x === "^");
    const hits = idxSet(beams, (x) => x > 0).intersection(splitters);
    for (const hit of hits) {
      splits += 1;
      beams[hit - 1] += beams[hit];
      beams[hit + 1] += beams[hit];
      beams[hit] = 0;
    }
    yield { beams, splits };
  }
  return { beams, splits };
}

function idxSet<T>(
  arr: ArrayLike<T>,
  predicate: (el: T) => boolean,
): Set<number> {
  const set = new Set<number>();
  for (let i = 0; i < arr.length; i += 1) {
    if (predicate(arr[i])) set.add(i);
  }
  return set;
}

if (import.meta.main) {
  runSolution(solution);
}

export default solution;
