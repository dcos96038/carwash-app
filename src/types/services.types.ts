import { createEnum } from '@/lib/utils';
import {
  service,
  serviceTransaction,
  vehicleType,
} from '../../db/schema/service';

export type Service = typeof service.$inferSelect;

export type ServiceTransaction = typeof serviceTransaction.$inferSelect;

export const VehicleTypeEnum = createEnum(vehicleType.enumValues);
