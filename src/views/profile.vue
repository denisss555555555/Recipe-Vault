<template>
  <div class="bg-[#2a1f1f] min-h-screen">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Create Recipe Button -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-amber-50">Your Recipes</h2>
        <button
          @click="openModal"
          class="bg-amber-700 text-amber-50 px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
        >
          Create Recipe
        </button>
      </div>

      <!-- Recipe Filters -->
      <RecipeFilter @filter-changed="handleFilterChange" />

      <RecipeList :recipes="recipeStore.filteredRecipes" />
    </main>
  </div>
  <CreateRecipeModal
    v-if="isModalOpen"
    @close="closeModal"
    @add-recipe="createRecipe"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CreateRecipeModal from "../components/CreateRecipeModal.vue";
import type { User } from "../interfaces/user";
import type { Recipe } from "../interfaces/recipe";
import { useRouter } from "vue-router";
import RecipeList from "../components/RecipeList.vue";
import type { RecipeFilters } from "../interfaces/recipe-filters";
import RecipeFilter from "../components/RecipeFilter.vue";
import { recipeStore } from "../stores/recipe";

const currentUser = ref<User | null>(null);
const isModalOpen = ref(false);
const router = useRouter();

const createRecipe = (recipe: Recipe) => {
  recipeStore.addRecipe(recipe);
  isModalOpen.value = false;
};
// Replace handleFilterChange with:
const handleFilterChange = (newFilters: RecipeFilters) => {
  recipeStore.updateFilters(newFilters);
};

// Navigate to Create Recipe page
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Fetch current user and recipes on mount
onMounted(() => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser);
  } else {
    router.push("/");
  }
  if (currentUser.value) {
    recipeStore.loadRecipes(currentUser.value.email);
  }
});
</script>

<style scoped>
.profile-header {
  border-bottom: 2px solid rgba(255, 193, 7, 0.3);
}
</style>
