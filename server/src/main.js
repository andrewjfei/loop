import { Application } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { rootRouter } from "./routes/mod.js";

const app = new Application();

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.listen({ port: 8080 });
