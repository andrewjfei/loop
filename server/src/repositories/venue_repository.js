import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { DatabaseConfig } from "../configs/mod.js";
import { QueryConstant } from "../constants/mod.js";
import { ErrorCode } from "../enums/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import { ObjectMapperUtil } from "../utils/mod.js";

async function createVenue(name, description, capacity, type) {
    try {
        let result = null;

        // attempt to create venue in postgresql database
        result = await DatabaseConfig.client.queryObject({
            camelcase: true,
            args: { name, description, capacity, type },
            text: QueryConstant.CREATE_VENUE_QUERY,
        });

        console.log("successfully created venue in postgresql");
        return ObjectMapperUtil.toVenue(result.rows[0]);
    } catch (_err) {
        console.log("failed to create venue in postgresql");
        console.log(_err);
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to create venue in PostgreSQL database.",
        );
    }
}

async function retrieveAllVenues() {
    try {
        const result = await DatabaseConfig.client.queryObject({
            camelcase: true,
            text: QueryConstant.RETRIEVE_ALL_VENUES_QUERY,
        });

        return ObjectMapperUtil.toVenueArray(result.rows);
    } catch (_err) {
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to retrieve all venues in PostgreSQL database.",
        );
    }
}

async function retrieveSingleVenue(id) {
    try {
        const result = await DatabaseConfig.client.queryObject({
            camelcase: true,
            args: { id },
            text: QueryConstant.RETRIEVE_SINGLE_VENUE_QUERY,
        });

        const rows = result.rows;

        if (rows.length < 1) {
            return null;
        } else if (rows.length > 1) {
            console.error(
                `multiple venues returned for unique id '${id}'`,
            );
        }

        return ObjectMapperUtil.toVenue(rows[0]);
    } catch (_err) {
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            `Failed to retrieve venue with id '${id}' in PostgreSQL database.`,
        );
    }
}

function updateVenue() {
    const str = "Updated Venue Successfully";
    return str;
}

function deleteVenue() {
    const str = "Deleted Venue Successfully";
    return str;
}

export {
    createVenue,
    deleteVenue,
    retrieveAllVenues,
    retrieveSingleVenue,
    updateVenue,
};
