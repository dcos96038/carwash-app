import { carwash } from "../../db/schema/carwash";

export type Carwash = typeof carwash.$inferSelect;
export type CarwashInsert = typeof carwash.$inferInsert;
export type CarwashUpdate = typeof carwash.$inferInsert;
