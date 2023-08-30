import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { ErrorCode } from "../enums/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import { AddVenueRequest } from "../models/requests/mod.js";
import { AddUserRequest } from "../models/requests/mod.js";
import { User, Venue } from "../models/mod.js";
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
        lastUpdated,
        deleted,
    } = userRow;

    return new User(
        id,
        username,
        firstName,
        lastName,
        email,
        created,
        lastUpdated,
        deleted,
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
        lastUpdated,
        deleted,
    } = venueRow;

    return new Venue(
        id,
        name,
        description,
        type,
        countryCode,
        created,
        lastUpdated,
        deleted,
    );
}

function toVenueArray(venueRows) {
    return venueRows.map((venueRow) => {
        return toVenue(venueRow);
    });
}

// helper functions

function throwMissingPropertyError(prop) {
    throw new LOOPServerError(
        Status.BadRequest,
        ErrorCode.MISSING_PARAMETER_ERROR_CODE,
        `Request is missing a '${prop}' property.`,
    );
}

export { toAddUserRequest, toAddVenueRequest, toUser, toUserArray, toVenue, toVenueArray };
