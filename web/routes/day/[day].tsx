import { define } from "../../utils.ts";

export default define.page(function Day(ctx) {
    return <h1>{ctx.params.day}</h1>;
});