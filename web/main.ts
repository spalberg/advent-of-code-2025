import { App, staticFiles, trailingSlashes } from "fresh";
import { getCookies } from "@std/http/cookie";
import { type State } from "./utils.ts";

export const app = new App<State>();

app
  .use(trailingSlashes("never"))
  .use((ctx) => {
    const cookies = getCookies(ctx.req.headers);
    ctx.state.colorScheme = cookies.colorScheme === "dark"
      ? "dark"
      : cookies.colorScheme === "light"
      ? "light"
      : null;
    return ctx.next();
  })
  .use(staticFiles())
  .fsRoutes();
