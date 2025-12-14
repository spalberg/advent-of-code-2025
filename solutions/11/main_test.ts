import { testDay } from "@/utils.ts";
import solution from "./main.ts";
import { assertEquals } from "@std/assert";

await testDay(solution, async (test, loadInput, t) => {
  await t.step("Example", async (t) => {
    await t.step("Part 1", () => {
      const input = `
        aaa: you hhh
        you: bbb ccc
        bbb: ddd eee
        ccc: ddd eee fff
        ddd: ggg
        eee: out
        fff: out
        ggg: out
        hhh: ccc fff iii
        iii: out
        `.trim().split("\n").map((l) => l.trim());
      const { part1 } = solution.solutionFn(input);
      assertEquals(part1!(), 5);
    });
    await t.step("Part 2", () => {
      const input = `
        svr: aaa bbb
        aaa: fft
        fft: ccc
        bbb: tty
        tty: ccc
        ccc: ddd eee
        ddd: hub
        hub: fff
        eee: dac
        dac: fff
        fff: ggg hhh
        ggg: out
        hhh: out
        `.trim().split("\n").map((l) => l.trim());
      const { part2 } = solution.solutionFn(input);
      assertEquals(part2!(), 2);
    });
  });
  await test(
    "Challange",
    await loadInput(),
    { part1: 649, part2: 1 },
  );
});
