import { createInsertSchema } from 'drizzle-zod';
import { carwash } from '../../../../../db/schema/carwash';
import z from 'zod';
import { InferSafeActionFnResult } from 'next-safe-action';
import { getUsersForCombobox } from './actions';
import { CommonOptions } from '@/types/common.types';
import { Carwash } from '@/types/carwash.types';

export const createCarwashSchema = createInsertSchema(carwash, {
  name: z.string().min(3).max(100),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  address: z.string().min(3).max(100),
  email: z.string().email().optional(),
  owner_id: z.string().uuid(),
  openingHours: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  closingHours: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  logo: z.string().url(),
  contactNumber: z.string(),
}).omit({
  status: true,
  createdAt: true,
  updatedAt: true,
  id: true,
});
export type CreateCarwash = z.infer<typeof createCarwashSchema>;

export type UsersForCombobox = InferSafeActionFnResult<
  typeof getUsersForCombobox
>['data'];

export const getCarwashesInputSchema = z.custom<CommonOptions<Carwash>>(
  (value) => {
    if (typeof value.page !== 'number') {
      throw new Error('page must be a number');
    }

    if (typeof value.limit !== 'number') {
      throw new Error('limit must be a number');
    }

    return value;
  }
);
