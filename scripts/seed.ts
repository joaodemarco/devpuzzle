import 'dotenv/config';
import { db } from '@/lib/db';
import {
  techs,
  techAreas,
  techArea,
  techTypes,
  techType,
} from '@/lib/db/schema/techs';
import techsData from '../data/techs.json';
import techTypesData from '../data/tech_types.json';
import techAreasData from '../data/tech_areas.json';

type CreatorType = 'Individual' | 'Small team' | 'Company';

type Tech = {
  name: string;
  slug: string;
  types: string[];
  areas: string[];
  openSource: boolean;
  releaseYear: number;
  creatorType: CreatorType;
  hint: string;
};

async function seed() {
  console.info('Starting seed...');

  const uniqueTypes = new Set<string>(techTypesData);
  const uniqueAreas = new Set<string>(techAreasData);

  await insertTechTypes(uniqueTypes);
  await insertTechAreas(uniqueAreas);

  // Retrieve again from the database to get the generated ids
  const types = await db.select().from(techTypes);
  const areas = await db.select().from(techAreas);

  // Create maps for O(1) lookup
  const typesMap = new Map(types.map((type) => [type.name, type.id]));
  const areasMap = new Map(areas.map((area) => [area.name, area.id]));

  // Casting to satisfy Typescript
  // We control the JSON structure, so this cast is safe
  const typedTechsData = techsData as Tech[];

  for (const tech of typedTechsData) {
    const [insertedTech] = await insertTech(tech);

    if (!insertedTech) {
      console.warn(`Skipping existing tech: ${tech.name}`);
      continue;
    }

    // Safe to use non-null assertion here because
    // all values come from the seeded dataset itself

    // Type relation
    await db.insert(techType).values(
      tech.types.map((typeName) => ({
        techId: insertedTech.id,
        typeId: typesMap.get(typeName)!,
      })),
    );

    // Area relation
    await db.insert(techArea).values(
      tech.areas.map((areaName) => ({
        techId: insertedTech.id,
        areaId: areasMap.get(areaName)!,
      })),
    );
  }

  console.info('Seed finished!');
}

async function insertTechTypes(uniqueTypes: Set<string>): Promise<void> {
  await db
    .insert(techTypes)
    .values(
      [...uniqueTypes].map((type) => ({
        name: type,
        slug: slugify(type),
      })),
    )
    .onConflictDoNothing();
}

async function insertTechAreas(uniqueAreas: Set<string>): Promise<void> {
  await db
    .insert(techAreas)
    .values(
      [...uniqueAreas].map((area) => ({
        name: area,
        slug: slugify(area),
      })),
    )
    .onConflictDoNothing();
}

async function insertTech(tech: Tech) {
  return await db
    .insert(techs)
    .values({
      name: tech.name,
      slug: tech.slug,
      imagePath: `/techs/${tech.slug}.png`,
      openSource: tech.openSource,
      releaseYear: tech.releaseYear,
      creatorType: tech.creatorType,
      hint: tech.hint,
    })
    .onConflictDoNothing()
    .returning();
}

// We can use this simple slugify function here since the values
// we will pass to it doesn't have special characters or edge cases
function slugify(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-');
}

async function main() {
  try {
    await seed();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
