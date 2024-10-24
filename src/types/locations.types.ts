import type { carwash } from '../../db/schema/carwash';

export type Carwash = typeof carwash.$inferSelect;
export type CarwashInsert = typeof carwash.$inferInsert;
