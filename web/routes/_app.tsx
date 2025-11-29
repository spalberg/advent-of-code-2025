import { define, getThemeForColorSchema } from "@/utils.ts";

export default define.page(({ Component, state }) => {
  return (
    <html
      lang="en"
      data-theme={state.colorScheme === null
        ? undefined
        : getThemeForColorSchema(state.colorScheme)}
    >
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/favicon.png" rel="icon" />
        <title>Advent of Code 2025</title>
      </head>
      <body class="min-h-screen">
        <Component />
      </body>
    </html>
  );
});
