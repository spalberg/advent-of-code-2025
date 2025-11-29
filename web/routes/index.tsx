import { define } from "@/utils.ts";
import ThemeToggle from "../islands/ThemeToggle.tsx";

export default define.page(function Home() {
  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Advent of Code 2025</h1>
        <div className="fixed top-4 right-4">
        <ThemeToggle />
        </div>
      </div>
      <ol class="max-w-screen-md mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from(
          { length: 12 },
          (_, i) => (
            <li
              className="card bg-base-100 card-border border-base-300"
              key={i + 1}
            >
              <a href={`/day/${i + 1}`}>
                <div className="card-body text-center">
                  Day {i + 1}
                </div>
              </a>
            </li>
          ),
        )}
      </ol>
    </div>
  );
});
