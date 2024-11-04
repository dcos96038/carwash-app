import {
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  time,
  uuid,
} from "drizzle-orm/pg-core";

import { defaultColumns } from "../lib";
import { users } from "./user";

export const carwashStatus = pgEnum("carwash_status", [
  "active",
  "inactive",
  "full",
  "out_of_service",
]);

export const carwash = pgTable("carwash", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  ...defaultColumns,
  owner_id: text("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  contactNumber: text("contact_number"),
  openingHours: time("opening_hours").notNull(),
  closingHours: time("closing_hours").notNull(),
  email: text("email"),
  logo: text("logo"),
  status: carwashStatus("status").notNull().default("active"),
});
