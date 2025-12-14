import { defineSolution, runSolution } from "@/utils.ts";
import { zip } from "@std/collections/zip";
const { abs } = Math;

const solution = defineSolution(9, (input) => {
  const points = parse(input);
  const pairs = makePairs(points);
  const areas = pairs.map(([[x1, y1], [x2, y2]]) =>
    (abs(x1 - x2) + 1) * (abs(y1 - y2) + 1)
  );
  const sortedByAreaDesc = zip(pairs, areas).toSorted((a, b) => b[1] - a[1]);
  return {
    part1: () => sortedByAreaDesc[0][1],
    part2: () => {
      const edges = makeEdges(points);
      const hasEdgeIntersection = (
        [[x1, y1], [x2, y2]]: [a: Point, b: Point],
      ) =>
        edges.some(
          ([[ex1, ey1], [ex2, ey2]]) =>
            isOverlapping(ey1, ey2, y1, y2) && isOverlapping(ex1, ex2, x1, x2),
        );
      return sortedByAreaDesc.find(([pair]) => !hasEdgeIntersection(pair))![1];
    },
  };
});

type Point = [x: number, y: number];

function parse(input: Array<string>) {
  return input.map((line) => line.split(",").map(Number) as Point);
}

function makePairs(points: Array<Point>) {
  const pairs: Array<[a: Point, b: Point]> = [];
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      pairs.push([points[i], points[j]]);
    }
  }
  return pairs;
}

function makeEdges(points: Array<Point>): Array<[a: Point, b: Point]> {
  return points.map((pt, i) => [pt, points[i + 1 < points.length ? i + 1 : 0]]);
}

function isOverlapping(a1: number, a2: number, b1: number, b2: number) {
  return !(a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) &&
    !(a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2);
}

if (import.meta.main) {
  await runSolution(solution);
}

export default solution;
