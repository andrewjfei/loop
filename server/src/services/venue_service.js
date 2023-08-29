import { VenueRepository } from "../repositories/mod.js";

function addVenue() {
    return VenueRepository.createVenue();
}

function fetchAllVenues() {
    return VenueRepository.retrieveAllVenues();
}

function fetchSingleVenue() {
    return VenueRepository.retrieveSingleVenue();
}

function modifyVenue() {
    return VenueRepository.updateVenue();
}

function removeVenue() {
    return VenueRepository.deleteVenue();
}

export { addVenue, fetchAllVenues, fetchSingleVenue, modifyVenue, removeVenue };
