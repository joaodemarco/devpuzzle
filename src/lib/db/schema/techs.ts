import { pgEnum, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createdAt } from "./columns.helpers";

export const creatorTypeEnum = pgEnum("creator_type_enum", [
  "Individual",
  "Small team",
  "Company",
]);

export const techs = pgTable("techs", (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar({ length: 100 }).notNull(),
  slug: t.varchar({ length: 100 }).notNull().unique(),
  imagePath: t.varchar({ length: 255 }),
  openSource: t.boolean().notNull(),
  releaseYear: t.smallint().notNull(),
  creatorType: creatorTypeEnum().notNull(),
  hint: t.varchar({ length: 255 }).notNull(),
  isActive: t.boolean().notNull().default(true),
  ...createdAt(),
}));

export const techTypes = pgTable("tech_types", (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar({ length: 100 }).notNull(),
  slug: t.varchar({ length: 100 }).notNull().unique(),
  ...createdAt(),
}));

export const techAreas = pgTable("tech_areas", (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar({ length: 100 }).notNull(),
  slug: t.varchar({ length: 100 }).notNull().unique(),
  ...createdAt(),
}));

// Pivot tables
export const techType = pgTable(
  "tech_type",
  (t) => ({
    techId: t
      .integer()
      .notNull()
      .references(() => techs.id),
    typeId: t
      .integer()
      .notNull()
      .references(() => techTypes.id),
  }),
  (table) => [primaryKey({ columns: [table.techId, table.typeId] })],
);

export const techArea = pgTable(
  "tech_area",
  (t) => ({
    techId: t
      .integer()
      .notNull()
      .references(() => techs.id),
    areaId: t
      .integer()
      .notNull()
      .references(() => techAreas.id),
  }),
  (table) => [primaryKey({ columns: [table.techId, table.areaId] })],
);
