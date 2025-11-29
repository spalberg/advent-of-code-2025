import { define } from "@/utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/favicon.png" rel="icon" />
        <title>Advent of Code 2025</title>
      </head>
      <body class="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <Component />
      </body>
    </html>
  );
});
