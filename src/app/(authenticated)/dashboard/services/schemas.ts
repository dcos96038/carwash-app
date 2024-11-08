import { createInsertSchema } from "drizzle-zod";
import { InferSafeActionFnResult } from "next-safe-action";
import z from "zod";

import { CommonOptions } from "@/types/common.types";
import { Service } from "@/types/services.types";

import { service } from "../../../../../db/schema/service";
import { getServicesForCombobox, getVehicleTypesForCombobox } from "./actions";

export const createServiceSchema = createInsertSchema(service, {
  name: z.string().min(3).max(100),
  carwashLocationId: z.string().uuid(),
  price: z.coerce.number().min(0),
  description: z.string().min(3).max(1000),
  vehicleType: z.array(z.enum(["car", "suv", "motorcycle"])),
}).omit({
  status: true,
  createdAt: true,
  updatedAt: true,
  id: true,
});
export type CreateService = z.infer<typeof createServiceSchema>;

export type ServicesForCombobox = InferSafeActionFnResult<
  typeof getServicesForCombobox
>["data"];

export type VehicleTypesForCombobox = InferSafeActionFnResult<
  typeof getVehicleTypesForCombobox
>["data"];

export const getServicesInputSchema = z.custom<CommonOptions<Service>>(
  (value) => {
    if (typeof value.page !== "number") {
      throw new Error("page must be a number");
    }

    if (typeof value.limit !== "number") {
      throw new Error("limit must be a number");
    }

    if (value.sortBy) {
      for (const key in value.sortBy) {
        if (value.sortBy[key] !== "asc" && value.sortBy[key] !== "desc") {
          throw new Error('sortBy must be either "asc" or "desc"');
        }
      }
    }

    if (value.filter) {
      if (typeof value.filter.key !== "string") {
        throw new Error("filter.key must be a string");
      }

      if (typeof value.filter.value !== "string") {
        throw new Error("filter.value must be a string");
      }
    }

    return value;
  },
);
