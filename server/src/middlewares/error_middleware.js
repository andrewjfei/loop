import { LOOPServerError } from "../errors/mod.js";
import { ErrorResponse } from "../models/responses/mod.js";

async function handleError({ response }, next) {
    try {
        await next(); // pass on request context
    } catch (err) {
        if (err instanceof LOOPServerError) {
            response.status = err.status;
            response.body = new ErrorResponse(err.code, err.message);
        }

        // todo: handle non loop server error case
        console.error(err);
    }
}

export { handleError };
