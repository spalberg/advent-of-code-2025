import { testDay } from "@/utils.ts";
import solution from "./main.ts";

await testDay(solution, async (test, loadInput) => {
  await test(
    "Example",
    `
    987654321111111
    811111111111119
    234234234234278
    818181911112111
    `,
    { part1: 357, part2: 3121910778619 },
  );
  await test(
    "Challange",
    await loadInput(),
    { part1: 17229, part2: 170520923035051 },
  );
});
