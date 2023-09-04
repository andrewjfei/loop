import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { EventController } from "../controllers/mod.js";

const eventRouter = new Router();

eventRouter.post("/", EventController.addEvent);

export { eventRouter };
