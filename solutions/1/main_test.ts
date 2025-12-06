import { testDay } from "@/utils.ts";
import solution from "./main.ts";

await testDay(solution, async (test, loadInput) => {
  await test(
    "Example",
    `
    L68
    L30
    R48
    L5
    R60
    L55
    L1
    L99
    R14
    L82
    `,
    { part1: 3, part2: 6 },
  );
  await test(
    "Challange",
    await loadInput(),
    { part1: 997, part2: 5978 },
  );
});
