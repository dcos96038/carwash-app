import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../lib';
import { carwash } from './carwash';
import { customer } from './user';

export const appointmentStatus = pgEnum('appointment_status', [
  'pending',
  'completed',
  'cancelled',
]);

export const appointment = pgTable('appointment', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  ...defaultColumns,
  carwashId: uuid('carwash_id')
    .notNull()
    .references(() => carwash.id, { onDelete: 'cascade' }),
  status: appointmentStatus('status').notNull(),
  scheduled_at: timestamp('scheduled_at').notNull(),
  estimated_finished_at: timestamp('estimated_finished_at'),
  finished_at: timestamp('finished_at'),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customer.id, { onDelete: 'cascade' }),
});
