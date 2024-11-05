"use server";

import { CarwashService } from "@/services/carwash.service";
import { UserService } from "@/services/user.service";

import { authActionClient } from "@/lib/safe-action-clients";

import { getCarwashesInputSchema } from "./schemas";

export const getUsersForCombobox = authActionClient
  .metadata({
    actionName: "getUsersForCombobox",
  })
  .action(async () => {
    const userService = new UserService();

    const result = await userService.getUsers();

    return result.map((u) => {
      return {
        label: u.name ?? "",
        value: u.id,
      };
    });
  });

export const getCarwashes = authActionClient
  .metadata({
    actionName: "getCarwashes",
  })
  .schema(getCarwashesInputSchema)
  .action(async ({ parsedInput }) => {
    const carwashService = new CarwashService();
    const totalCount = await carwashService.getTotalCount();

    const results = await carwashService.getMany(parsedInput);

    return {
      results,
      totalCount,
    };
  });
