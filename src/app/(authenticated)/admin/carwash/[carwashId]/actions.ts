"use server";

import { CarwashService } from "@/services/carwash.service";
import { redirect } from "next/navigation";
import { z } from "zod";

import { authActionClient } from "@/lib/safe-action-clients";

import { getCarwashByIdSchema, updateCarwashSchema } from "./schemas";

export const updateCarwash = authActionClient
  .metadata({
    actionName: "updateCarwash",
  })
  .bindArgsSchemas<[carwashId: z.ZodString]>([z.string().uuid()])
  .schema(updateCarwashSchema)
  .action(async ({ parsedInput, bindArgsParsedInputs: [carwashId] }) => {
    const carwashService = new CarwashService();

    await carwashService.update({ id: carwashId, ...parsedInput });

    redirect("/admin/carwash");
  });

export const getCarwashById = authActionClient
  .metadata({
    actionName: "getCarwashById",
  })
  .schema(getCarwashByIdSchema)
  .action(async ({ parsedInput }) => {
    const carwashService = new CarwashService();

    return await carwashService.getById(parsedInput.id);
  });
