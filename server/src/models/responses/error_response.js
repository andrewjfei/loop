import { ResponseStatus } from "../../enums/mod.js";

class ErrorResponse {
    status;
    error;

    constructor(code, message) {
        this.status = ResponseStatus.ERROR;
        this.error = { code, message };
    }
}

export { ErrorResponse };