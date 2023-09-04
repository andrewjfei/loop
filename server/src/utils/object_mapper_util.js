import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { ErrorCode } from "../enums/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import {
    AddEventRequest,
    AddUserRequest,
    AddVenueRequest,
} from "../models/requests/mod.js";
import { Event, Pass, User, Venue } from "../models/mod.js";
import { CommonUtil } from "./mod.js";

function toAddUserRequest(payload) {
    const { username, firstName, lastName, email, password } = payload;

    // todo: validate if all properties are available

    return new AddUserRequest(username, firstName, lastName, email, password);
}

function toUser(userRow) {
    const {
        id,
        username,
        firstName,
        lastName,
        email,
        created,
    } = userRow;

    return new User(
        id,
        username,
        firstName,
        lastName,
        email,
        created,
    );
}

function toUserArray(userRows) {
    return userRows.map((userRow) => {
        return toUser(userRow);
    });
}

function toAddVenueRequest(payload) {
    const { name, description, type } = payload;

    // validate if all properties are available
    if (CommonUtil.isUndefined(name)) {
        throwMissingPropertyError("name");
    }

    if (CommonUtil.isUndefined(description)) {
        throwMissingPropertyError("description");
    }

    return new AddVenueRequest(name, description, type);
}

function toVenue(venueRow) {
    const {
        id,
        name,
        description,
        type,
        countryCode,
        created,
    } = venueRow;

    return new Venue(
        id,
        name,
        description,
        type,
        countryCode,
        created,
    );
}

function toVenueArray(venueRows) {
    return venueRows.map((venueRow) => {
        return toVenue(venueRow);
    });
}

function toAddEventRequest(payload) {
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
    } = payload;

    // validate if non null or non default properties are available
    if (CommonUtil.isUndefined(name)) {
        throwMissingPropertyError("name");
    }

    if (CommonUtil.isUndefined(type)) {
        throwMissingPropertyError("type");
    }

    if (CommonUtil.isUndefined(cost)) {
        throwMissingPropertyError("cost");
    }

    if (CommonUtil.isUndefined(recurrencePeriod)) {
        throwMissingPropertyError("recurrencePeriod");
    }

    if (CommonUtil.isUndefined(reminderPeriod)) {
        throwMissingPropertyError("reminderPeriod");
    }

    if (CommonUtil.isUndefined(startDate)) {
        throwMissingPropertyError("startDate");
    }

    if (CommonUtil.isUndefined(startTime)) {
        throwMissingPropertyError("startTime");
    }

    if (CommonUtil.isUndefined(duration)) {
        throwMissingPropertyError("duration");
    }

    return new AddEventRequest(
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
}

function toEvent(eventRow, venues = [], passes = []) {
    const {
        id,
        name,
        description,
        type,
        cost,
        countryCode,
        recurrencePeriod,
        reminderPeriod,
        startDate,
        startTime,
        duration,
        endDate,
        created,
    } = eventRow;

    return new Event(
        id,
        name,
        description,
        type,
        cost,
        countryCode,
        recurrencePeriod,
        reminderPeriod,
        startDate,
        startTime,
        duration,
        endDate,
        created,
        venues,
        passes,
    );
}

function toPass(event, passRow, venues = []) {
    const {
        name,
        description,
        type,
        cost,
    } = event;

    const {
        id,
        startTimestamp,
        endTimestamp,
        created,
    } = passRow;

    return new Pass(
        id,
        name,
        description,
        type,
        cost * venues.length,
        startTimestamp,
        endTimestamp,
        created,
        venues,
    );
}

// helper functions

function throwMissingPropertyError(prop) {
    throw new LOOPServerError(
        Status.BadRequest,
        ErrorCode.MISSING_PARAMETER_ERROR_CODE,
        `Request is missing a '${prop}' property.`,
    );
}

export {
    toAddEventRequest,
    toAddUserRequest,
    toAddVenueRequest,
    toEvent,
    toPass,
    toUser,
    toUserArray,
    toVenue,
    toVenueArray,
};
