import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { DatabaseConfig } from "../configs/mod.js";
import { QueryConstant } from "../constants/mod.js";
import { ErrorCode } from "../enums/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import { CommonUtil, ObjectMapperUtil } from "../utils/mod.js";

async function createVenue(name, description, type) {
    try {
        let result = null;

        // attempt to create venue in postgresql database
        if (CommonUtil.isUndefined(type)) {
            result = await DatabaseConfig.client.queryObject({
                camelcase: true,
                args: { name, description },
                text: QueryConstant.CREATE_VENUE_QUERY,
            });
        } else {
            result = await DatabaseConfig.client.queryObject({
                camelcase: true,
                args: { name, description, type },
                text: QueryConstant.CREATE_VENUE_WITH_TYPE_QUERY,
            });
        }

        console.log("successfully created venue in postgresql");
        return ObjectMapperUtil.toVenue(result.rows[0]);
    } catch (_err) {
        console.log("failed to create venue in postgresql");
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to create venue in PostgreSQL database.",
        );
    }
}

function retrieveAllVenues() {
    const str = "Retrieved All Venues Successfully";
    return str;
}

function retrieveSingleVenue() {
    const str = "Retrieved Single Venue Successfully";
    return str;
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
