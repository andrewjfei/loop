import { ResponseStatus } from "../../enums/mod.js";

class DataResponse {
    status;
    data;

    constructor(data) {
        this.status = ResponseStatus.SUCCESS;
        this.data = data;
    }
}

export { DataResponse };
