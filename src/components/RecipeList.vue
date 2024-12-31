<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <RecipeCard
      v-for="(recipe) in recipes"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
  <!-- No Recipes Message -->
  <p v-if="recipes.length === 0" class="text-amber-100/80 text-center mt-12">
    You have no recipes yet. Start by creating one!
  </p>
</template>
<script setup lang="ts">
import type { Recipe } from "../interfaces/recipe";
import RecipeCard from "../components/RecipeCard.vue";

defineProps<{ recipes: Recipe[] }>();
</script>
<style scoped></style>
