import { defineSolution, runSolution } from "@/utils.ts";

const solution = defineSolution(5, (input) => {
  let { ranges, ids } = parse(input);
  ranges = mergeOverlappingRanges(ranges);
  return {
    part1: () => part1(ids, ranges),
    part2: () => part2(ranges),
  };
});

function part1(ids: Array<number>, ranges: Array<Range>) {
  let freshIds = 0;
  let currentRange = 0;
  for (const id of ids) {
    if (id < ranges[currentRange][0]) {
      continue;
    }
    while (id > ranges[currentRange][1]) {
      currentRange += 1;
      if (currentRange >= ranges.length) return freshIds;
    }
    if (id >= ranges[currentRange][0]) {
      freshIds += 1;
    }
  }
  return freshIds;
}

function part2(ranges: Array<Range>) {
  return ranges.map(([start, end]) => end - start + 1).reduce((a, b) => a + b);
}

type Range = [start: number, end: number];

function parse(input: Array<string>) {
  const ranges: Array<Range> = [];
  const ids: Array<number> = [];
  let processIds = false;
  for (const line of input) {
    if (line === "") {
      processIds = true;
      continue;
    }
    if (processIds) {
      ids.push(Number(line));
    } else {
      const [start, end] = line.split("-");
      ranges.push([Number(start), Number(end)]);
    }
  }
  ranges.sort(([s1], [s2]) => s1 - s2);
  ids.sort((a, b) => a - b);
  return { ranges, ids };
}

function mergeOverlappingRanges(ranges: Array<Range>) {
  const mergedRanges: Array<Range> = [];
  let [lastStart, lastEnd] = ranges[0];
  for (let i = 1; i < ranges.length; i += 1) {
    const [start, end] = ranges[i];
    if (start <= lastEnd) {
      lastEnd = Math.max(end, lastEnd);
      continue;
    } else {
      mergedRanges.push([lastStart, lastEnd]);
      lastStart = start;
      lastEnd = end;
    }
  }
  mergedRanges.push([lastStart, lastEnd]);
  return mergedRanges;
}

if (import.meta.main) {
  runSolution(solution);
}

export default solution;
