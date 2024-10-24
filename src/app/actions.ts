"use server";

import z from "zod";
import { LocationsService } from "@/services/locations.service";
import { actionClient } from "@/lib/safe-action-clients";

const getLocationsSchema = z.object({
	coords: z
		.object({
			southEastLat: z.number(),
			southEastLng: z.number(),
			northWestLat: z.number(),
			northWestLng: z.number(),
		})
		.optional(),
});

export const getLocationsAction = actionClient
	.schema(getLocationsSchema)
	.action(async ({ parsedInput }) => {
		const locationsService = new LocationsService();
		const result = await locationsService.getMarkers(parsedInput.coords);

		return result;
	});

const searchLocationsSchema = z.object({
	query: z.string(),
});

export const searchLocations = actionClient
	.schema(searchLocationsSchema)
	.action(async ({ parsedInput }) => {
		const locationsService = new LocationsService();
		const result = await locationsService.searchLocations(parsedInput.query);

		return result;
	});
