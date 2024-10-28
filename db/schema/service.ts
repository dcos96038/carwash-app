import {
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { defaultColumns } from '../lib';
import { carwash } from './carwash';
import { status } from './misc';
import { appointment } from './appointment';

export const vehicleType = pgEnum('vehicle_type', ['car', 'suv', 'motorcycle']);

export const service = pgTable('service', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  ...defaultColumns,
  name: text('name').notNull(),
  price: doublePrecision('price').notNull(),
  description: text('description'),
  vehicleType: vehicleType('vehicle_type').array().default([]),
  carwashLocationId: uuid('carwash_location_id')
    .notNull()
    .references(() => carwash.id, { onDelete: 'cascade' }),
  status: status('status').notNull().default('active'),
});

export const serviceTransaction = pgTable('service_transaction', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  ...defaultColumns,
  serviceId: uuid('service_id')
    .notNull()
    .references(() => service.id, { onDelete: 'cascade' }),
  appointmentId: uuid('appointment_id')
    .notNull()
    .references(() => appointment.id, { onDelete: 'cascade' }),
  amount: doublePrecision('amount').notNull(),
});
