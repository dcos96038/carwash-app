import { createEnum } from "@/lib/utils";

import type { users } from "../../db/schema/user";
import { roles } from "../../db/schema/user";

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type UserRoles = typeof roles.enumValues;

export const UserRolesEnum = createEnum(roles.enumValues);
