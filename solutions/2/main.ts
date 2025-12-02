import { defineSolution, runSolution } from "@/utils.ts";

type Range = [number, number];
type SeqLengthGen = (length: number) => Array<number>;

const solution = defineSolution((input) => {
  const ranges = input.join(",").split(",").map((r) =>
    r.split("-").map(Number) as Range
  );
  return {
    part1: () =>
      solve(ranges, memo((length) => length % 2 === 0 ? [length / 2] : [])),
    part2: () =>
      solve(
        ranges,
        memo((length) => Array(Math.trunc(length / 2)).fill(0).map((_, i) => i + 1)),
      ),
  };
});

function solve(ranges: Array<Range>, seqLengthGen: SeqLengthGen) {
  let sum = 0;
  for (const [start, end] of ranges) {
    for (let id = start; id <= end; id += 1) {
      if (isInvalidId(id, seqLengthGen)) {
        sum += id;
      }
    }
  }
  return sum;
}

function isInvalidId(id: number, seqLengthGen: SeqLengthGen) {
  const strId = id.toString();
  const length = strId.length;
  for (const seqLength of seqLengthGen(length)) {
    if (length % seqLength !== 0) continue;
    const seq = strId.substring(0, seqLength);
    let rest = strId.substring(seqLength);
    while (rest.startsWith(seq)) {
      rest = rest.substring(seqLength);
    }
    if (rest.length === 0) {
      return true;
    }
  }
  return false;
}

function memo(fn: SeqLengthGen): SeqLengthGen {
  const cache = new Map<number, Array<number>>();
  return (input) => {
    const hit = cache.get(input);
    if (hit != null) {
      return hit;
    }
    const result = fn(input);
    cache.set(input, result);
    return result;
  };
}

if (import.meta.main) {
  runSolution(solution, 2);
}

export default solution;
