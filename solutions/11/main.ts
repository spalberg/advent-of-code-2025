import { defineSolution, type Input, runSolution } from "@/utils.ts";
import { memoize } from "@std/cache";

const solution = defineSolution(11, (input) => {
  const graph = parse(input);
  const paths = memoize((start: string, end: string): number => {
    if (start === end) return 1;
    const outputs = graph.get(start);
    if (outputs == null) return 0;
    const result = outputs.map((output) => paths(output, end))
      .reduce((
        a,
        b,
      ) => a + b);
    console.log(`${start} to ${end} in ${result}`);
    return result;
  });
  return {
    part1: () => paths("you", "out"),
    part2: () =>
      paths("svr", "fft") * paths("fft", "dac") * paths("dac", "out") +
      paths("svr", "dac") * paths("dac", "fft") * paths("fft", "out"),
  };
});

type Graph = Map<string, Array<string>>;

function parse(input: Input) {
  const graph: Graph = new Map();
  for (const line of input) {
    const [device, outputs] = line.split(": ");
    graph.set(device, outputs.split(" "));
  }
  return graph;
}

if (import.meta.main) {
  await runSolution(solution);
}

export default solution;
