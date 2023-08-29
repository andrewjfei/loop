import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

async function encrypt(value) {
    return await bcrypt.hash(value);
}

async function compare(value, encryptedValue) {
    return await bcrypt.compare(value, encryptedValue);
}

export { compare, encrypt };
