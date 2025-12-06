import { testDay } from "@/utils.ts";
import solution from "./main.ts";

await testDay(solution, async (test, loadInput) => {
  await test(
    "Example",
    `
    3-5
    10-14
    16-20
    12-18

    1
    5
    8
    11
    17
    32
    `,
    { part1: 3, part2: 14 },
  );
  await test(
    "Challange",
    await loadInput(),
    { part1: 865, part2: 352556672963116 },
  );
});
