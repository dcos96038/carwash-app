"use server";

import { createServerAction } from "zsa";
import z from "zod";
import { LocationsService } from "@/services/locations.service";

export const getLocationsAction = createServerAction()
	.input(
		z.object({
			query: z.string().optional(),
			coords: z
				.object({
					southEastLat: z.number(),
					southEastLng: z.number(),
					northWestLat: z.number(),
					northWestLng: z.number(),
				})
				.optional(),
		}),
	)
	.handler(async ({ input }) => {
		const locationsService = new LocationsService();
		const result = await locationsService.getMarkers(input);

		return result;
	});
