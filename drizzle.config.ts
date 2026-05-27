import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema",
  out: "./drizzle/migrations",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
