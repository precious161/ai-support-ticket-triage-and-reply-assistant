import { config } from "./env.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: config.db_url!,
});

export const db = drizzle({client:pool});