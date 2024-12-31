<template>
  <div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    @click.self="emits('close')"
  >
    <form
      @submit.prevent="addRecipe"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a0f0f] p-8 rounded-lg shadow-lg min-w-[40rem]"
    >
      <div class="mb-4">
        <label class="block text-amber-100/80 mb-2">Recipe Name</label>
        <input
          v-model="newRecipe.name"
          @keydown.prevent.enter
          type="text"
          class="w-full bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Enter recipe name"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-amber-100/80 mb-2">Ingredients</label>
        <div class="space-y-2">
          <div
            v-for="(ingredient, index) in newRecipe.ingredients"
            :key="index"
            class="flex items-center space-x-2"
          >
            <input
              v-model="newRecipe.ingredients[index]"
              @keydown="handleEnterIngredient($event, index)"
              type="text"
              class="flex-1 bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter ingredient"
              required
            />
            <button
              @click.prevent="removeIngredient(index)"
              class="text-red-500 hover:text-red-400"
            >
              &times;
            </button>
          </div>
          <button
            @click.prevent="addIngredient"
            class="text-amber-400 hover:text-amber-300 font-semibold"
          >
            + Add Ingredient
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-amber-100/80 mb-2">Instructions</label>
        <div class="space-y-2">
          <div
            v-for="(instruction, index) in newRecipe.instructions"
            :key="index"
            class="flex items-center space-x-2"
          >
            <input
              @keydown="handleEnterInstruction($event, index)"
              v-model="newRecipe.instructions[index]"
              type="text"
              class="flex-1 bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter instruction"
              required
            />
            <button
              @click.prevent="removeInstruction(index)"
              class="text-red-500 hover:text-red-400"
            >
              &times;
            </button>
          </div>
          <button
            @click.prevent="addInstruction"
            class="text-amber-400 hover:text-amber-300 font-semibold"
          >
            + Add Instruction
          </button>
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-amber-100/80 mb-2">Difficulty</label>
        <select
          v-model="newRecipe.difficulty"
          class="w-full bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option :value="RecipeDifficulty.EASY">
            {{ RecipeDifficulty.EASY }}
          </option>
          <option :value="RecipeDifficulty.MEDIUM">
            {{ RecipeDifficulty.MEDIUM }}
          </option>
          <option :value="RecipeDifficulty.HARD">
            {{ RecipeDifficulty.HARD }}
          </option>
        </select>
      </div>

      <div class="mb-6">
        <label class="block text-amber-100/80 mb-2">Image URL (Optional)</label>
        <input
          v-model="newRecipe.image"
          type="url"
          class="w-full bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Enter image URL"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <button
          @click.prevent="emits('close')"
          class="bg-red-700 text-amber-50 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Close
        </button>
        <button
          type="submit"
          class="bg-amber-700 text-amber-50 px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
        >
          Add Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Recipe } from "../interfaces/recipe";
import { RecipeDifficulty } from "../enums/recipe-difficulty";
import { userStore } from "../stores/user";

const emits = defineEmits(["add-recipe", "close"]);

// New recipe form state
const newRecipe = ref({
  id: Date.now().toString(),
  name: "",
  ingredients: [""],
  instructions: [""],
  difficulty: RecipeDifficulty.EASY,
  image: "",
  userEmail: userStore.currentUser?.email ?? "",
} satisfies Recipe);

// Add a new ingredient field
const addIngredient = () => {
  newRecipe.value.ingredients.push("");
};

// Remove an ingredient field
const removeIngredient = (index: number) => {
  newRecipe.value.ingredients.splice(index, 1);
};

// Add a new instruction field
const addInstruction = () => {
  newRecipe.value.instructions.push("");
};

// Remove an instruction field
const removeInstruction = (index: number) => {
  newRecipe.value.instructions.splice(index, 1);
};

// Add recipe to the list
const addRecipe = () => {
  emits("add-recipe", newRecipe.value);
};

// Handle Enter key press for adding ingredients and instructions
const handleEnterIngredient = (event: KeyboardEvent, index: number) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (newRecipe.value.ingredients[index].trim()) {
      addIngredient();
    }
  }
};

const handleEnterInstruction = (event: KeyboardEvent, index: number) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (newRecipe.value.instructions[index].trim()) {
      addInstruction();
    }
  }
};
</script>

<style scoped></style>
