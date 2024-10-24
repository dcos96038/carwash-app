import { timestamp } from 'drizzle-orm/pg-core';

export const defaultColumns = {
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
};
