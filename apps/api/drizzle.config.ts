import { config } from "./src/lib/env.js";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials:{
     url: config.db_url!,
  }
})