import { doublePrecision, pgTable, text, uuid } from "drizzle-orm/pg-core";

const carwashLocations = pgTable("carwash_locations", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	latitude: doublePrecision("latitude").notNull(),
	longitude: doublePrecision("longitude").notNull(),
	contactNumber: text("contact_number"),
	openingHours: text("opening_hours"),
});

export { carwashLocations };
