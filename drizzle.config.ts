import { defineConfig } from 'drizzle-kit';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/db/schema',
  out: './drizzle/migrations',
  casing: 'snake_case',
  dbCredentials: {
    url: connectionString,
  },
});
