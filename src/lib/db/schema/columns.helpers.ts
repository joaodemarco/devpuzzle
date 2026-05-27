import { timestamp } from 'drizzle-orm/pg-core';

// updatedAt and deletedAt are not used in this project
// using a factory function to avoid reusing the same column instance
export const createdAt = () => ({
  createdAt: timestamp().defaultNow().notNull(),
});
