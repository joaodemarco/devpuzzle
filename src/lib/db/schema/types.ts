import { techs, techTypes, techAreas } from './techs';
import { guessTheTechGames, guessTheTechResults } from './games';

// Union Types
export type TechCreatorType = 'Individual' | 'Small team' | 'Company';

// Select types
export type Tech = typeof techs.$inferSelect;
export type TechType = typeof techTypes.$inferSelect;
export type TechArea = typeof techAreas.$inferSelect;
export type GuessTheTechGame = typeof guessTheTechGames.$inferSelect;
export type GuessTheTechGameResults = typeof guessTheTechResults.$inferSelect;
