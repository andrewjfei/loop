import { ErrorResponse } from "../models/responses/mod.js";

async function handleError({ response }, next) {
    try {
        await next(); // pass on request context 
    } catch (err) {
        // todo: validate error is of type loop server error
        response.status = err.status;
        response.body = new ErrorResponse(err.code, err.message);
    }
}

export { handleError };