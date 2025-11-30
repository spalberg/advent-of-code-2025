import { define } from "@/utils.ts";
import ThemeToggle from "../islands/ThemeToggle.tsx";
import { AdventDoor } from "../components/AdventDoor.tsx";
import { days } from "../days.ts";

export default define.page(function Home() {
  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-3xl mx-auto flex flex-col items-center justify-center">
        <h1 class="text-8xl font-bold mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="text-rotate duration-6000 px-2">
            <span className="justify-items-center sm:justify-items-end">
              <span className="text-primary">Advent</span>
              <span className="text-secondary">of</span>
              <span className="text-primary">Code</span>
            </span>
          </div>
          <div>2025</div>
        </h1>
        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>
      </div>
      <ol class="max-w-3xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[120px] md:auto-rows-[140px] gap-4">
        {Array.from(
          { length: 12 },
          (_, i) => (
            <li
              key={i + 1}
            >
              <AdventDoor
                day={i + 1}
                color={days[i].color}
                icon={days[i].icon}
                pattern={days[i].pattern}
              />
            </li>
          ),
        )}
      </ol>
    </div>
  );
});
