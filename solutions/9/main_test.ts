import { testDay } from "@/utils.ts";
import solution from "./main.ts";

await testDay(solution, async (test, loadInput) => {
  await test(
    "Example",
    `
    7,1
    11,1
    11,7
    9,7
    9,5
    2,5
    2,3
    7,3
    `,
    { part1: 50, part2: 24 },
  );
  await test(
    "Challange",
    await loadInput(),
    { part1: 4752484112, part2: 1465767840 },
  );
});
