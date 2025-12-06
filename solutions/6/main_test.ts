import { testDay } from "@/utils.ts";
import solution from "./main.ts";

await testDay(6, solution, async (test, loadInput) => {
  await test(
    "Example",
    [
      "123 328  51 64 ",
      " 45 64  387 23 ",
      "  6 98  215 314",
      "*   +   *   +  ",
    ],
    { part1: 4277556, part2: 3263827 },
  );
  await test(
    "Challange",
    await loadInput(),
    { part1: 6957525317641, part2: 13215665360076 },
  );
});
