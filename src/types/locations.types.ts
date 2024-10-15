import type { carwashLocations } from "../../db/schema";

export type CarwashLocation = typeof carwashLocations.$inferSelect;
export type CarwashLocationInsert = typeof carwashLocations.$inferInsert;
