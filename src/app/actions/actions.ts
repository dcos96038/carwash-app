"use server";

import { createServerAction } from "zsa";
import z from "zod";
import { LocationsService } from "@/services/locations.service";

export const getLocationsAction = createServerAction()
	.input(
		z.object({
			query: z.string().optional(),
		}),
	)
	.handler(async ({ input }) => {
		const locationsService = new LocationsService();
		const result = await locationsService.getMarkers(input.query);

		return result;
	});
