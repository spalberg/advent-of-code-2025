interface Day {
  color: string;
  icon: string;
  pattern: "dots" | "stripes" | "circles" | "stars";
}

const doorColors = [
  "bg-[oklch(0.65_0.24_35)]", // Orange
  "bg-[oklch(0.55_0.22_280)]", // Purple
  "bg-[oklch(0.7_0.2_160)]", // Teal
  "bg-[oklch(0.7_0.25_340)]", // Pink
  "bg-[oklch(0.6_0.2_200)]", // Blue
  "bg-[oklch(0.75_0.26_35)]", // Warm Orange
  "bg-[oklch(0.65_0.24_280)]", // Light Purple
  "bg-[oklch(0.75_0.22_160)]", // Mint
  "bg-[oklch(0.75_0.27_340)]", // Hot Pink
  "bg-[oklch(0.7_0.22_200)]", // Sky Blue
  "bg-[oklch(0.68_0.25_25)]", // Coral
  "bg-[oklch(0.6_0.2_260)]", // Deep Purple
];

const doorIcons = [
  "🎁",
  "⭐",
  "🎄",
  "❄️",
  "🎅",
  "🔔",
  "🕯️",
  "🎀",
  "🧦",
  "🍪",
  "🎵",
  "✨",
];

const doorPatterns: ("dots" | "stripes" | "circles" | "stars")[] = [
  "dots",
  "stripes",
  "circles",
  "stars",
  "dots",
  "stripes",
  "circles",
  "stars",
  "dots",
  "stripes",
  "circles",
  "stars",
];

export const days: Array<Day> = [
  ...Array.from({ length: 12 }, (_, i) => ({
    color: doorColors[i],
    icon: doorIcons[i],
    pattern: doorPatterns[i],
  })),
];
