import { testDay } from "@/utils.ts";
import solution from "./main.ts";

await testDay(1, solution, async (test) => {
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
});
