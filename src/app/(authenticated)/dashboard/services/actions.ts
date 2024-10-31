'use server';

import { authActionClient } from '@/lib/safe-action-clients';
import { UserService } from '@/services/user.service';
import { createserviceSchema, getserviceesInputSchema } from './schemas';
import { ServicesService } from '@/services/services.service';

export const createservice = authActionClient
  .metadata({
    actionName: 'createservice',
  })
  .schema(createserviceSchema)
  .action(async ({ parsedInput }) => {
    const serviceService = new ServicesService();

    const result = await serviceService.insertService(parsedInput);

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

export const getServicees = authActionClient
  .metadata({
    actionName: 'getservicees',
  })
  .schema(getserviceesInputSchema)
  .action(async ({ parsedInput }) => {
    const serviceService = new ServicesService();
    const totalCount = await serviceService.getTotalCount();

    const results = await serviceService.getMany(parsedInput);

    return {
      results,
      totalCount,
    };
  });
