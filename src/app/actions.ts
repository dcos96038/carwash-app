"use server";

import { CarwashService } from "@/services/carwash.service";
import z from "zod";

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
  .metadata({
    actionName: "getLocations",
  })
  .schema(getLocationsSchema)
  .action(async ({ parsedInput }) => {
    const carwashService = new CarwashService();
    const result = await carwashService.getByCoords(parsedInput.coords);

    return result;
  });

const searchLocationsSchema = z.object({
  query: z.string(),
});

export const searchLocations = actionClient
  .metadata({
    actionName: "searchLocations",
  })
  .schema(searchLocationsSchema)
  .action(async ({ parsedInput }) => {
    const carwashService = new CarwashService();
    const result = await carwashService.getByName(parsedInput.query);

    return result;
  });
