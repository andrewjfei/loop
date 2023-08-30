import { load } from "https://deno.land/std@0.200.0/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

try {
    // load envrionment variables from .env file
    await load({ export: true });
} catch (_err) {
    console.error("failed to load .env file");
}

const clientOptions = {
    hostname: Deno.env.get("POSTGRESQL_HOST"),
    port: Deno.env.get("POSTGRESQL_PORT"),
    database: Deno.env.get("POSTGRESQL_DB"),
    user: Deno.env.get("POSTGRESQL_USER"),
    password: Deno.env.get("POSTGRESQL_PASSWORD"),
};

const client = new Client(clientOptions);

export { client };
