import { dirname, fromFileUrl, resolve } from "@std/path";
import { TextLineStream } from "@std/streams";
import { assertEquals, unimplemented } from "@std/assert";

export function part(partFn: (input: Array<string>) => number) {
  return partFn;
}

interface Solution {
  part1: (() => number) | null;
  part2: (() => number) | null;
}

export type SolutionFn = (input: Array<string>) => Solution;

interface SolutionFnForDay {
  day: number;
  solutionFn: SolutionFn;
}

export function defineSolution(
  day: number,
  solutionFn: SolutionFn,
): SolutionFnForDay {
  return { day, solutionFn };
}

export async function runSolution({ solutionFn, day }: SolutionFnForDay) {
  const { part1, part2 } = solutionFn(await loadInput(day));
  console.log("Part 1:", part1?.() ?? "-");
  console.log("Part 2:", part2?.() ?? "-");
}

async function getLines(
  input: ReadableStream<Uint8Array>,
): Promise<Array<string>> {
  const stream = input
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream({ allowCR: true }));
  return await Array.fromAsync(stream);
}

export function loadInput(day: number): Promise<Array<string>> {
  const path = resolve(
    dirname(fromFileUrl(import.meta.url)),
    "..",
    "inputs",
    `${day}.txt`,
  );
  return readLinesFromFile(path);
}

export async function readLinesFromFile(path: string): Promise<Array<string>> {
  using file = await Deno.open(path);
  return await getLines(file.readable);
}

export async function readLinesFromStdin(): Promise<Array<string> | null> {
  if (Deno.stdin.isTerminal()) return null;
  return await getLines(Deno.stdin.readable);
}

export async function readLinesFromUrl(url: string): Promise<Array<string>> {
  const response = await fetch(url);
  if (!response.ok || response.body === null) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await getLines(response.body);
}

interface Assertion {
  part1?: number;
  part2?: number;
}
type TestFn = (
  label: string,
  input: string | Array<string>,
  assertions: Assertion | Array<Assertion>,
) => void;
export async function testDay(
  { day, solutionFn }: SolutionFnForDay,
  testExecution: (
    testFn: TestFn,
    loadInput: () => Promise<Array<string>>,
  ) => Promise<void>,
) {
  await Deno.test(`Day ${day}`, async (t) => {
    const testFn: TestFn = async (label, input, assertions) => {
      input = Array.isArray(input)
        ? input
        : input.trim().split("\n").map((l) => l.trim());
      assertions = Array.isArray(assertions) ? assertions : [assertions];
      const { part1, part2 } = solutionFn(input);
      await t.step(label, async (t) => {
        for (const assertion of assertions) {
          if (assertion.part1 != null) {
            if (part1 === null) unimplemented();
            await t.step(
              "Part 1",
              () => assertEquals(part1(), assertion.part1),
            );
          }
          if (assertion.part2 != null) {
            if (part2 === null) unimplemented();
            await t.step(
              "Part 2",
              () => assertEquals(part2(), assertion.part2),
            );
          }
        }
      });
    };
    await testExecution(testFn, () => loadInput(day));
  });
}
