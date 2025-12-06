import { defineSolution, runSolution } from "@/utils.ts";

const solution = defineSolution(6, (input) => {
  return {
    part1: () => part1(input),
    part2: () => part2(input),
  };
});

type Operation = (a: number, b: number) => number;

interface Problem {
  operands: Array<number>;
  operation: Operation;
}

const add: Operation = (a, b) => a + b;
const mul: Operation = (a, b) => a * b;

function part1(input: Array<string>) {
  const rawOperands = [...input];
  const rawOperations = rawOperands.pop()!;
  const problems: Array<Problem> = rawOperations.trim().split(/\s+/).map((op) =>
    op === "+" ? add : mul
  ).map((operation) => ({ operands: [], operation }));
  rawOperands.map((line) => line.trim().split(/\s+/).map((num) => Number(num)))
    .forEach((operandsRow) =>
      operandsRow.forEach((operand, columnIndex) =>
        problems[columnIndex].operands.push(operand)
      )
    );
  return problems.map(({ operands, operation }) => operands.reduce(operation))
    .reduce(add);
}

function part2(input: Array<string>) {
  let total = 0;
  const columns = input[0].length;
  let problemOperands: Array<number> = [];
  const operationsRow = input[input.length - 1];
  for (let column = columns - 1; column >= 0; column -= 1) {
    let rawNumber = "";
    for (let row = 0; row < input.length - 1; row += 1) {
      rawNumber += input[row][column].trim();
    }
    problemOperands.push(Number(rawNumber));
    if (operationsRow[column] !== " ") {
      total += problemOperands.reduce(
        operationsRow[column] === "+" ? add : mul,
      );
      problemOperands = [];
      column -= 1;
    }
  }
  return total;
}

if (import.meta.main) {
  runSolution(solution);
}

export default solution;
