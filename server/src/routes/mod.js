import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { userRouter } from "./user_route.js";
import { venueRouter } from "./venue_route.js";
import { eventRouter } from "./event_route.js";

const rootRouter = new Router();

rootRouter.get("/hello-world", ({ _request, response }) => {
    response.body = "Hello World!";
});

rootRouter.use("/event", eventRouter.routes());
rootRouter.use("/user", userRouter.routes());
rootRouter.use("/venue", venueRouter.routes());

export { rootRouter };
