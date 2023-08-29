class LOOPServerError extends Error {
    status; // response status
    code;

    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export { LOOPServerError };