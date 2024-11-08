"use server";

import { ServicesService as ServiceService } from "@/services/services.service";

import { authActionClient } from "@/lib/safe-action-clients";

import { VehicleTypeEnum } from "@/types/services.types";

import { createServiceSchema, getServicesInputSchema } from "./schemas";

export const createService = authActionClient
  .metadata({
    actionName: "createService",
  })
  .schema(createServiceSchema)
  .action(async ({ parsedInput }) => {
    const serviceService = new ServiceService();
    console.log("parsedInput", parsedInput);
    const result = await serviceService.insertService(parsedInput);

    return result;
  });

export const getServicesForCombobox = authActionClient
  .metadata({
    actionName: "getServicesForCombobox",
  })
  .action(async () => {
    const userService = new ServiceService();

    const result = await userService.getServices();

    return result.map((u) => {
      return {
        label: u.name ?? "",
        value: u.id,
      };
    });
  });

export const getVehicleTypesForCombobox = authActionClient
  .metadata({
    actionName: "getVehicleTypesForCombobox",
  })
  .action(async () => {
    return Object.entries(VehicleTypeEnum).map(([, value]) => {
      return {
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value: value,
      };
    });
  });

export const getServices = authActionClient
  .metadata({
    actionName: "getServices",
  })
  .schema(getServicesInputSchema)
  .action(async ({ parsedInput }) => {
    const serviceService = new ServiceService();
    const totalCount = await serviceService.getTotalCount();

    const results = await serviceService.getMany(parsedInput);

    return {
      results,
      totalCount,
    };
  });
