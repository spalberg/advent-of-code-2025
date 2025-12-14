import { defineSolution, type Input, runSolution } from "@/utils.ts";
const solution = defineSolution(10, (input) => {
  const data = parse(input);
  return {
    part1: () =>
      data.map(solveIndicatorLightDiagram).map((b) => b.length).reduce((a, b) =>
        a + b
      ),
    part2: null,
  };
});

interface Machine {
  indicatorLightDiagram: number;
  buttonWiringSchematics: Array<number>;
  joltageRequirements: Array<number>;
}

function solveIndicatorLightDiagram(
  { indicatorLightDiagram, buttonWiringSchematics }: Machine,
): Array<number> {
  let state = [{ indicatorLights: 0, buttons: [] as Array<number> }];
  while (true) {
    const next: typeof state = [];
    for (const { indicatorLights, buttons } of state) {
      for (let i = 0; i < buttonWiringSchematics.length; i += 1) {
        if (buttons.includes(i)) continue;
        const nextIndicatorLights = indicatorLights ^ buttonWiringSchematics[i];
        const nextButtons = [...buttons, i];
        if (indicatorLightDiagram === nextIndicatorLights) return nextButtons;
        next.push({
          indicatorLights: nextIndicatorLights,
          buttons: nextButtons,
        });
      }
    }
    state = next;
  }
}

// function solveJoltage(
//   { joltageRequirements, buttonWiringSchematics }: Machine,
// ) {
// }

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
