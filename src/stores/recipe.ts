import { reactive } from "vue";
import type { Recipe } from "../interfaces/recipe";
import type { RecipeFilters } from "../interfaces/recipe-filters";
import { RecipeDifficulty } from "../enums/recipe-difficulty";

export const recipeStore = reactive({
  recipes: [] as Recipe[],
  currentUserEmail: "",
  currentFilters: {
    searchTerm: "",
    sortBy: "name",
    sortDirection: "asc",
  } as RecipeFilters,

  loadRecipes(userEmail: string) {
    const storedRecipesStr = localStorage.getItem("recipes");

    // Load ALL recipes
    this.recipes = storedRecipesStr ? JSON.parse(storedRecipesStr) : [];
    this.currentUserEmail = userEmail
  },

  addRecipe(recipe: Recipe) {
    recipe.id = Date.now().toString();
    // Load all existing recipes first
    const storedRecipesStr = localStorage.getItem("recipes");
    const allRecipes = storedRecipesStr ? JSON.parse(storedRecipesStr) : [];

    // Add the new recipe
    allRecipes.push(recipe);

    // Update both localStorage and the store
    localStorage.setItem("recipes", JSON.stringify(allRecipes));
    this.recipes = allRecipes;
  },

  deleteRecipe(recipeToDelete: Recipe) {
    const updatedRecipes = this.recipes.filter(
      (recipe) => recipe.id !== recipeToDelete.id
    );
    this.recipes = updatedRecipes;
    localStorage.setItem("recipes", JSON.stringify(this.recipes));
  },

  updateFilters(newFilters: RecipeFilters) {
    this.currentFilters = newFilters;
  },

  get currentUserRecipes() {
    return this.recipes.filter(
      (recipe: Recipe) => recipe.userEmail === this.currentUserEmail
    );
  },

  get filteredRecipes() {
    let filtered = [...this.currentUserRecipes];

    if (this.currentFilters.searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.name
          .toLowerCase()
          .includes(this.currentFilters.searchTerm.toLowerCase())
      );
    }

    if (this.currentFilters.difficultyLevel) {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === this.currentFilters.difficultyLevel
      );
    }

    filtered.sort((a: Recipe, b: Recipe) => {
      let comparison = 0;
      switch (this.currentFilters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "difficulty":
          const difficultyOrder = {
            [RecipeDifficulty.EASY]: 0,
            [RecipeDifficulty.MEDIUM]: 1,
            [RecipeDifficulty.HARD]: 2,
          };
          comparison =
            difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
      }
      return this.currentFilters.sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return filtered;
  },
});
