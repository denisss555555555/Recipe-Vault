import type { Meal } from "../interfaces/meal";

class MealDbApiClient {
  private readonly baseUrl = "https://www.themealdb.com/api/json/v1/1";

  async getRandomMeal(): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/random.php`);
    const data = await response.json();
    return data.meals[0];
  }

  async getMealsByCategory(category: string): Promise<Meal[]> {
    const response = await fetch(`${this.baseUrl}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  }
  async getMealByName(name: string): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals[0];
  }
}

export const mealDbApiClient = new MealDbApiClient();
