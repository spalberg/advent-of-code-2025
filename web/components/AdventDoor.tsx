import { cn } from "@/utils.ts";

interface Props {
  day: number;
  color: string;
  icon: string;
  pattern: "dots" | "stripes" | "circles" | "stars";
}

export function AdventDoor(
  { day, color, icon, pattern }: Props,
) {
  return (
    <a
      href={`/day/${day}`}
      className="relative h-full overflow-hidden rounded-3xl transition-all duration-300 ease-out block hover:scale-105 hover:-rotate-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring shadow-lg hover:shadow-2xl"
    >
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center",
          color,
        )}
        // style={{ viewTransitionName: `door-${day}-color` }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          {pattern === "dots" && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 2px, transparent 2px)",
                backgroundSize: "30px 30px",
              }}
            />
          )}
          {pattern === "stripes" && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, white, white 10px, transparent 10px, transparent 20px)",
              }}
            />
          )}
          {pattern === "circles" && (
            <div className="absolute inset-0 flex flex-wrap gap-4 p-4">
              <div className="w-8 h-8 border-4 border-white rounded-full" />
              <div className="w-6 h-6 border-4 border-white rounded-full" />
              <div className="w-10 h-10 border-4 border-white rounded-full" />
            </div>
          )}
          {pattern === "stars" && (
            <div className="absolute inset-0 text-white text-2xl flex flex-wrap gap-6 p-4">
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
            </div>
          )}
        </div>

        {/* Emoji icon */}
        <div className="text-5xl md:text-6xl mb-2 relative z-10 drop-shadow-lg" // style={{ viewTransitionName: `door-${day}-icon` }}
        >
          {icon}
        </div>

        {/* Day number */}
        <div className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] relative z-10" // style={{ viewTransitionName: `door-${day}-number` }}
        >
          {day}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-white/40 rounded-full" />
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/30 rounded-full" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
    </a>
  );
}
