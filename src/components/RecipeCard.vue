<template>
  <div
    class="rounded-lg overflow-hidden shadow-md cursor-pointer"
    @click="openModal"
  >
    <div
      :style="{
        backgroundImage: `url(${recipe.image || fetchedImage})`,
      }"
      class="h-40 bg-cover bg-center"
    ></div>
    <div class="p-4 bg-[#1a0f0f] flex justify-between items-center">
      <h3 class="text-lg font-bold text-amber-50">{{ recipe.name }}</h3>
      <h4 class="text-md font-semibold text-amber-50">
        {{ recipe.difficulty }}
      </h4>
    </div>
  </div>
  <RecipeModal
    v-if="isModalOpen"
    :recipe="recipe"
    @close="closeModal"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RecipeModal from "./RecipeModal.vue";
import type { Recipe } from "../interfaces/recipe";
import { mealDbApiClient } from "../api/meal-db.client";
import { recipeStore } from "../stores/recipe";

const props = defineProps<{ recipe: Recipe }>();
const isModalOpen = ref(false);
const fetchedImage = ref<string | null>(null);
const emits = defineEmits(["close", "delete"]);

const fetchRecipeImage = async () => {
  try {
    const response = await mealDbApiClient.getMealByName(props.recipe.name);
    if (response) {
      fetchedImage.value = response.strMealThumb;
    }
  } catch (error) {
    console.error("Error fetching recipe image:", error);
    fetchedImage.value = "/placeholder.jpg";
  } finally {
    if (!fetchedImage.value) {
      fetchedImage.value = "/placeholder.jpg";
    }
  }
};

onMounted(() => {
  if (!props.recipe.image) {
    fetchRecipeImage();
  }
});

const openModal = () => {
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = "auto";
};

const handleDelete = () => {
  recipeStore.deleteRecipe(props.recipe);
  closeModal();
};
</script>
