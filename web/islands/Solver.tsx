import { useMemo } from "preact/hooks";
import { getSolutionForDay } from "@aoc/2025-solutions";
import { computed, useSignal } from "@preact/signals";

interface Props {
  day: number;
}

export function Solver({ day }: Props) {
  const solutionFn = useMemo(() => getSolutionForDay(day), [day]);
  const input = useSignal("");
  const hasInput = computed(() => {
    return input.value.trim().length > 0;
  });
  if (solutionFn == null) {
    return <div>no solution</div>;
  }

  return (
    <div>
      <textarea
        className="textarea"
        placeholder="Input"
        value={input.value}
        onInput={(e) => (input.value = e.currentTarget.value)}
      >
      </textarea>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!hasInput.value}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const lines = input.value.split("\n").map((l) => l.trim());
          const s = solutionFn(lines);
          const part1 = s.part1?.();
          const part2 = s.part2?.();
          console.log({ part1, part2 });
        }}
      >
        Solve
      </button>
    </div>
  );
}
