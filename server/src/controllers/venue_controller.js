import { VenueService } from "../services/mod.js";

function addVenue({ request, response }) {
    response.body = VenueService.addVenue();
}

function fetchAllVenues({ request, response }) {
    response.body = VenueService.fetchAllVenues();
}

function fetchSingleVenue({ request, response }) {
    response.body = VenueService.fetchSingleVenue();
}

function modifyVenue({ request, response }) {
    response.body = VenueService.modifyVenue();
}

function removeVenue({ request, response }) {
    response.body = VenueService.removeVenue();
}

export { addVenue, fetchAllVenues, fetchSingleVenue, modifyVenue, removeVenue };
