import { db } from '@/lib/db';
import { techs, guessTheTechGames } from '@/lib/db/schema';
import { eq, desc, and, notInArray } from 'drizzle-orm';
import { GuessTheTechGame } from '@/lib/db/schema';

// Defines how many recent games to exclude from the pool.
// With 74 total techs and this limit, we ensure a minimum pool
// of ~30 available techs, preventing predictable end-of-cycle patterns.
const RECENT_GAMES_EXCLUSION_LIMIT = 50;

export async function getOrCreateDailyGame(
  date: string,
): Promise<GuessTheTechGame> {
  const todayGame = await db.query.guessTheTechGames.findFirst({
    where: eq(guessTheTechGames.date, date),
  });

  if (todayGame) return todayGame;

  // Exclude recently used techs to avoid repetition
  const recentGamesTechsIds = (
    await db
      .select({ techId: guessTheTechGames.techId })
      .from(guessTheTechGames)
      .orderBy(desc(guessTheTechGames.date))
      .limit(RECENT_GAMES_EXCLUSION_LIMIT)
  ).map((game) => game.techId);

  const availableTechs = await db
    .select({ id: techs.id })
    .from(techs)
    .where(
      recentGamesTechsIds.length > 0
        ? and(
            eq(techs.isActive, true),
            notInArray(techs.id, recentGamesTechsIds),
          )
        : eq(techs.isActive, true),
    );

  if (availableTechs.length === 0) {
    throw new Error("No active technologies avaliable for today's game");
  }

  const chosenTech =
    availableTechs[Math.floor(Math.random() * availableTechs.length)];

  const [game] = await db
    .insert(guessTheTechGames)
    .values({ techId: chosenTech.id, date })
    .returning();

  return game;
}
