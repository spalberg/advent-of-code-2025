import { days } from "@/days.ts";
import { Solver } from "@/islands/Solver.tsx";
import ThemeToggle from "@/islands/ThemeToggle.tsx";
import { cn, define } from "@/utils.ts";

export default define.page(function Day(ctx) {
  const day = Number(ctx.params.day);
  const color = days[day - 1]?.color || "";
  const icon = days[day - 1]?.icon || "";
  // { viewTransitionName: `door-${day}-color` }
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost btn-circle text-2xl">🏠</a>
        </div>
        <div className="navbar-center">
          <div className="relative px-4 py-2 rounded-xl overflow-hidden text-xl">
            <div
              className={cn("absolute inset-0", color)}
              //   style={{ viewTransitionName: `door-${day}-color` }}
            >
            </div>
            <div className="relative z-10 flex gap-2">
              <div
                // style={{ viewTransitionName: `door-${day}-icon` }}
              >
                {icon}
              </div>
              <div className="text-white" // style={{ viewTransitionName: `door-${day}-number` }}
              >
                {day}
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          {
            /* <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */
          }
          <ThemeToggle />
        </div>
      </div>
      <Solver day={day} />
    </div>
  );
});
