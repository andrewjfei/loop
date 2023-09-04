import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { ErrorCode, EventType, Period } from "../enums/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import { EventRepository, PassRepository } from "../repositories/mod.js";
import { Timestamp } from "../models/mod.js";

async function addEvent(request) {
    const {
        name,
        description,
        type,
        cost,
        recurrencePeriod,
        reminderPeriod,
        startDate,
        startTime,
        duration,
        endDate,
        venues,
    } = request;

    // validate enums, dates & times
    validateType(type);
    validateCost(cost);
    validatePeriod(recurrencePeriod);
    validatePeriod(reminderPeriod);

    // create event
    const event = await EventRepository.createEvent(
        name,
        description,
        type,
        cost,
        recurrencePeriod,
        reminderPeriod,
        startDate,
        startTime,
        duration,
        endDate,
        venues,
    );

    const timestamp = new Timestamp(startDate, startTime);
    const startTimestamp = timestamp.toString();

    timestamp.add(duration);
    const endTimestamp = timestamp.toString();

    // note: current issue is that creating an event and a pass is not in a single transaction
    // this means that an event can be created without a pass being created

    // create (inital) pass for event
    const pass = await PassRepository.createPass(
        event,
        startTimestamp,
        endTimestamp,
    );

    // add pass to event
    event.passes?.push(pass);

    return event;
}

// helper functions

function validateType(type) {
    if (EventType[type]) {
        return;
    }

    throw new LOOPServerError(
        Status.BadRequest,
        ErrorCode.BAD_PARAMETER_ERROR_CODE,
        `Event type '${type}' is not valid.`,
    );
}

function validateCost(cost) {
    // check if cost is negative
    if (cost < 0) {
        throw new LOOPServerError(
            Status.BadRequest,
            ErrorCode.BAD_PARAMETER_ERROR_CODE,
            `Event cost '${cost}' cannot be negative.`,
        );
    }

    // check if cost is greater than the maximum number which can be stored in the postgresql database
    if (cost > 9999.99) {
        throw new LOOPServerError(
            Status.BadRequest,
            ErrorCode.BAD_PARAMETER_ERROR_CODE,
            `Event cost '${cost}' cannot be greater than '9999.99.`,
        );
    }
}

function validatePeriod(period) {
    if (Period[Period.toKey(period)]) {
        return;
    }

    throw new LOOPServerError(
        Status.BadRequest,
        ErrorCode.BAD_PARAMETER_ERROR_CODE,
        `Period of '${period}' is not valid.`,
    );
}

// todo: validate dates and times

export { addEvent };
