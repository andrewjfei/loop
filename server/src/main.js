import { Application } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { DatabaseConfig } from "./configs/mod.js";
import { rootRouter } from "./routes/mod.js";

try {
	// create a postgresql connection
	await DatabaseConfig.client.connect();
	console.log("successfully connected to postgresql database");
} catch (err) {
	console.error(`failed to connect to postgresql database ${err}`);
}

const app = new Application();
	
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.listen({ port: 8080 });
