'use server';

import { authActionClient } from '@/lib/safe-action-clients';
import { CarwashService } from '@/services/carwash.service';
import { UserService } from '@/services/user.service';
import { createCarwashSchema, getCarwashesInputSchema } from './schemas';

export const createCarwash = authActionClient
  .metadata({
    actionName: 'createCarwash',
  })
  .schema(createCarwashSchema)
  .action(async ({ parsedInput }) => {
    const carwashService = new CarwashService();

    const result = await carwashService.insertCarwash(parsedInput);

    return result;
  });

export const getUsersForCombobox = authActionClient
  .metadata({
    actionName: 'getUsersForCombobox',
  })
  .action(async () => {
    const userService = new UserService();

    const result = await userService.getUsers();

    return result.map((u) => {
      return {
        label: u.name ?? '',
        value: u.id,
      };
    });
  });

export const getCarwashes = authActionClient
  .metadata({
    actionName: 'getCarwashes',
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
