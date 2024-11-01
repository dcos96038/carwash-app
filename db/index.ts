import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as appointment from "./schema/appointment";
import * as carwash from "./schema/carwash";
import * as misc from "./schema/misc";
import * as user from "./schema/user";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, {
  schema: {
    ...appointment,
    ...carwash,
    ...user,
    ...misc,
  },
});
