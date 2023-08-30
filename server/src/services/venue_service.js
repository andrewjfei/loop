import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { ErrorCode, VenueType } from "../enums/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import { VenueRepository } from "../repositories/mod.js";
import { CommonUtil } from "../utils/mod.js";

async function addVenue(request) {
    const { name, description, type } = request;

    // validate type
    validateType(type);

    return await VenueRepository.createVenue(name, description, type);
}

async function fetchAllVenues() {
    return await VenueRepository.retrieveAllVenues();
}

async function fetchSingleVenue(id) {
    const venue = await VenueRepository.retrieveSingleVenue(id);

    if (!CommonUtil.isPresent(venue)) {
        throw new LOOPServerError(
            Status.BadRequest,
            ErrorCode.BAD_PARAMETER_ERROR_CODE,
            `Venue with id '${id}' does not exist.`,
        );
    }

    return venue;
}

function modifyVenue() {
    return VenueRepository.updateVenue();
}

function removeVenue() {
    return VenueRepository.deleteVenue();
}

// helper functions

function validateType(type) {
    // undefined type will resolve to default venue type
    if (CommonUtil.isUndefined(type) || VenueType[type]) {
        return;
    }

    throw new LOOPServerError(
        Status.BadRequest,
        ErrorCode.BAD_PARAMETER_ERROR_CODE,
        `Venue type '${type}' is not valid.`,
    );
}

export { addVenue, fetchAllVenues, fetchSingleVenue, modifyVenue, removeVenue };
