import { define } from "@/utils.ts";
import ThemeToggle from "../islands/ThemeToggle.tsx";

export default define.page(function Home() {
  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Advent of Code 2025</h1>
        <ThemeToggle />
      </div>
    </div>
  );
});
