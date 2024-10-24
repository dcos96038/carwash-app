import type { users } from '../../db/schema/user';
import { roles } from '../../db/schema/user';

function createEnum<T extends string>(arr: T[]): { [K in T]: K } {
  return arr.reduce(
    (acc, curr) => {
      acc[curr] = curr;
      return acc;
    },
    {} as { [K in T]: K }
  );
}

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type UserRoles = typeof roles.enumValues;

export const UserRolesEnum = createEnum(roles.enumValues);
