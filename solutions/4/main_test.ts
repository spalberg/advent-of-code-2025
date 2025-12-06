import { testDay } from "@/utils.ts";
import solution from "./main.ts";

await testDay(solution, async (test, loadInput) => {
  await test(
    "Example",
    `
    ..@@.@@@@.
    @@@.@.@.@@
    @@@@@.@.@@
    @.@@@@..@.
    @@.@@@@.@@
    .@@@@@@@.@
    .@.@.@.@@@
    @.@@@.@@@@
    .@@@@@@@@.
    @.@.@@@.@.
    `,
    { part1: 13, part2: 43 },
  );
  await test(
    "Challange",
    await loadInput(),
    { part1: 1602, part2: 9518 },
  );
});
