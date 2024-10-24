import { timestamp } from 'drizzle-orm/pg-core';

export const defaultColumns = {
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
};
