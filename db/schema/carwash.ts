import {
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  time,
  uuid,
} from 'drizzle-orm/pg-core';
import { defaultColumns } from '../lib';
import { users } from './user';
import { InferSelectModel } from 'drizzle-orm';

export const carwashStatus = pgEnum('carwash_status', [
  'open',
  'closed',
  'full',
]);

export const carwash = pgTable('carwash', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  ...defaultColumns,
  owner_id: text('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  address: text('address').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  contactNumber: text('contact_number'),
  openingHours: time('opening_hours'),
  closingHours: time('closing_hours'),
  email: text('email').default(''),
  logo: text('logo').default(''),
  status: carwashStatus('status').notNull().default('open'),
});

export type Carwash = InferSelectModel<typeof carwash>;
