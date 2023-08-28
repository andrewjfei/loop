import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { VenueController } from "../controllers/mod.js";

const venueRouter = new Router();

venueRouter.post("/", VenueController.addVenue);
venueRouter.get("/", VenueController.fetchAllVenues);
venueRouter.get("/:venueId", VenueController.fetchSingleVenue);
venueRouter.patch("/:venueId", VenueController.modifyVenue);
venueRouter.delete("/:venueId", VenueController.removeVenue);

export { venueRouter };
