import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { DatabaseConfig } from "../configs/mod.js";
import { QueryConstant } from "../constants/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import { ErrorCode } from "../enums/mod.js";
import { ObjectMapperUtil } from "../utils/mod.js";

async function createPass(event, startTimestamp, endTimestamp) {
    try {
        const { id: eventId } = event;

        const transaction = DatabaseConfig.client.createTransaction(
            "create pass",
        );

        await transaction.begin();

        // attempt to create pass in postgresql database
        const result = await transaction.queryObject({
            camelcase: true,
            args: { eventId, startTimestamp, endTimestamp },
            text: QueryConstant.CREATE_PASS_QUERY,
        });

        // get event id
        const passRow = result?.rows[0];
        const passId = passRow?.id;
        const passHasVenues = [];

        event?.venues.forEach(async (venueId) => {
            await transaction.queryObject({
                camelcase: true,
                args: { passId, venueId },
                text: QueryConstant.CREATE_PASS_HAS_VENUE_QUERY,
            });

            passHasVenues.push(venueId);
        });

        await transaction.commit();

        console.log("successfully created pass in postgresql");
        return ObjectMapperUtil.toPass(event, passRow, passHasVenues);
    } catch (_err) {
        console.log("failed to create pass in postgresql");
        console.log(_err);
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to create pass in PostgreSQL database.",
        );
    }
}

export { createPass };
