import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { DatabaseConfig } from "../configs/mod.js";
import { LOOPServerError } from "../errors/mod.js";
import { ErrorCode } from "../enums/mod.js";
import { QueryConstant } from "../constants/mod.js";
import { ObjectMapperUtil } from "../utils/mod.js";

async function createEvent(
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
) {
    try {
        const transaction = DatabaseConfig.client.createTransaction(
            "create event",
        );

        await transaction.begin();

        // create event
        const result = await transaction.queryObject({
            camelcase: true,
            args: {
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
            },
            text: QueryConstant.CREATE_EVENT_QUERY,
        });

        // get event id
        const eventRow = result?.rows[0];
        const eventId = eventRow?.id;
        const eventHasVenues = [];

        venues.forEach(async (venueId) => {
            await transaction.queryObject({
                camelcase: true,
                args: { eventId, venueId },
                text: QueryConstant.CREATE_EVENT_HAS_VENUE_QUERY,
            });

            eventHasVenues.push(venueId);
        });

        await transaction.commit();

        return ObjectMapperUtil.toEvent(eventRow, eventHasVenues);
    } catch (_err) {
        console.error(_err);
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to create event in PostgreSQL database.",
        );
    }
}

export { createEvent };
