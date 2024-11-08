import { appointment } from "../../db/schema/appointment";

export type Appointment = typeof appointment.$inferInsert;
