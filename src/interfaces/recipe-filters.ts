import type { RecipeDifficulty } from "../enums/recipe-difficulty";

export interface RecipeFilters {
  searchTerm: string;
  sortBy: "name" | "difficulty";
  sortDirection: "asc" | "desc";
  difficultyLevel?: RecipeDifficulty;
}
