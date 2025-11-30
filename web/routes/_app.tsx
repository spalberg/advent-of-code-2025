import { define, getThemeForColorSchema } from "@/utils.ts";
import Snow, { snowStyleId } from "../islands/Snow.tsx";

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
        <style id={snowStyleId}></style>
      </head>
      <body className="min-h-screen overflow-x-hidden bg-base-300">
        <Snow />
        <Component />
      </body>
    </html>
  );
});
