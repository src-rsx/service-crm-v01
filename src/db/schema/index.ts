import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
export * from "./tenants";
export * from "./users";
export * from "./companies";
export * from "./engineers";
export * from "./manufacturers";
export * from "./assets";
export * from "./sites";
export * from "./service-calls";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);