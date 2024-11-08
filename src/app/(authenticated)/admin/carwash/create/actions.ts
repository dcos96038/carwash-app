"use server";

import { CarwashService } from "@/services/carwash.service";
import { redirect } from "next/navigation";

import { authActionClient } from "@/lib/safe-action-clients";

import { createCarwashSchema } from "./schemas";

export const createCarwash = authActionClient
  .metadata({
    actionName: "createCarwash",
  })
  .schema(createCarwashSchema)
  .action(async ({ parsedInput }) => {
    const carwashService = new CarwashService();

    await carwashService.insert(parsedInput);

    redirect("/admin/carwash");
  });
