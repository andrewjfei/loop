import { Status } from "https://deno.land/x/oak@v12.6.0/deps.ts";
import { DataResponse } from "../models/responses/mod.js";
import { VenueService } from "../services/mod.js";
import { ObjectMapperUtil } from "../utils/mod.js";

async function addVenue({ request, response }) {
    const payload = await request.body().value;
    const addVenueRequest = ObjectMapperUtil.toAddVenueRequest(payload);
    console.log(`currently processing ${addVenueRequest}`);

    const newVenue = await VenueService.addVenue(addVenueRequest);
    response.body = new DataResponse(newVenue);
    response.status = Status.Created;
}

async function fetchAllVenues({ response }) {
    const allVenues = await VenueService.fetchAllVenues();
    response.body = new DataResponse(allVenues);
    response.status = Status.OK;
}

function fetchSingleVenue({ _request, response }) {
    response.body = VenueService.fetchSingleVenue();
}

function modifyVenue({ _request, response }) {
    response.body = VenueService.modifyVenue();
}

function removeVenue({ _request, response }) {
    response.body = VenueService.removeVenue();
}

export { addVenue, fetchAllVenues, fetchSingleVenue, modifyVenue, removeVenue };
