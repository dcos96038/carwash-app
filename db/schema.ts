import {
	pgTable,
	uuid,
	text,
	doublePrecision,
	time,
} from "drizzle-orm/pg-core";

export const carwashLocations = pgTable("carwash_locations", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	latitude: doublePrecision("latitude").notNull(),
	longitude: doublePrecision("longitude").notNull(),
	contactNumber: text("contact_number"),
	openingHours: time("opening_hours"),
	closingHours: time("closing_hours"),
});
