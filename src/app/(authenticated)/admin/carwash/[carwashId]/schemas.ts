import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { carwash } from "../../../../../../db/schema/carwash";

export const updateCarwashSchema = createInsertSchema(carwash, {
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
  status: z.enum(["active", "inactive"]),
}).omit({
  status: true,
  createdAt: true,
  updatedAt: true,
  id: true,
});

export type UpdateCarwash = z.infer<typeof updateCarwashSchema>;

export const getCarwashByIdSchema = z.object({
  id: z.string().uuid(),
});
