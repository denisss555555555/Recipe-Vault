import type { RecipeDifficulty } from "../enums/recipe-difficulty";

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  difficulty: RecipeDifficulty;
  image?: string;
  userEmail: string;
}
