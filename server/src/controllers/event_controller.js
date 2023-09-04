import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { EventService } from "../services/mod.js";
import { ObjectMapperUtil } from "../utils/mod.js";
import { DataResponse } from "../models/responses/mod.js";

async function addEvent({ request, response }) {
    const payload = await request.body().value;
    const addEventRequest = ObjectMapperUtil.toAddEventRequest(payload);
    console.log(`currently processing ${addEventRequest}`);

    const newEvent = await EventService.addEvent(addEventRequest);
    response.body = new DataResponse(newEvent);
    response.status = Status.Created;
}

export { addEvent };
