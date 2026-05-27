import { pgTable } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { techs } from "./data";
import { createdAt } from "./columns.helpers";

export const guessTheTechGames = pgTable("guess_the_tech_games", (t) => ({
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  techId: t
    .integer()
    .notNull()
    .references(() => techs.id),
  date: t.date().notNull().unique(),
  ...createdAt(),
}));

export const guessTheTechResults = pgTable("guess_the_tech_results", (t) => ({
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  gameId: t
    .uuid()
    .notNull()
    .references(() => guessTheTechGames.id),
  attempts: t.smallint().notNull(),
  won: t.boolean().notNull(),
  ...createdAt(),
}));
