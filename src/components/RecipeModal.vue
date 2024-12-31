<template>
  <div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    @click.self="emits('close')"
  >
    <!-- Image section -->
    <div
      class="w-full max-w-2xl bg-[#2a1f1f] rounded-lg overflow-hidden shadow-lg relative"
    >
      <div class="relative h-64">
        <Transition
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isLoading"
            class="absolute inset-0 bg-[#2a1f1f] animate-pulse"
          ></div>
        </Transition>
        <Transition
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="!isLoading"
            :style="{
              backgroundImage: `url(${
                recipe.image || thumbnail || '/placeholder.jpg'
              })`,
            }"
            class="absolute inset-0 bg-cover bg-center bg-blend-darken bg-orange-950 bg-opacity-10"
          ></div>
        </Transition>
      </div>

      <!-- Content Section -->
      <div class="p-6">
        <h2 class="text-2xl font-bold text-amber-50 mb-4">
          {{ recipe.name }}
        </h2>
        <h3 class="text-lg font-semibold text-amber-50 mb-2">Ingredients:</h3>
        <ul class="list-disc list-inside text-amber-100/80 mb-4">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>
        <h3 class="text-lg font-semibold text-amber-50 mb-2">Instructions:</h3>
        <ol class="list-decimal list-inside text-amber-100/80">
          <li v-for="(instruction, index) in recipe.instructions" :key="index">
            {{ instruction }}
          </li>
        </ol>
      </div>

      <!-- Action Buttons -->
      <div class="flex absolute top-4 right-4 gap-4">
        <button
          @click.prevent="emits('delete')"
          class="bg-red-700 text-amber-50 px-2 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          <img :src="trashCanIcon" alt="Delete" class="h-6 w-6 text-amber-50" />
        </button>
        <button
          @click.prevent="emits('close')"
          class="bg-red-700 text-amber-50 px-2 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          <img :src="crossIcon" alt="Close" class="h-6 w-6 text-amber-50" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "../interfaces/recipe";
import trashCanIcon from "../assets/icons/trash-can.svg";
import crossIcon from "../assets/icons/cross.svg";
import { onMounted, ref } from "vue";
import { mealDbApiClient } from "../api/meal-db.client";

const props = defineProps<{
  recipe: Recipe;
}>();

const emits = defineEmits(["close", "delete"]);
const thumbnail = ref<string | null>(null);
const isLoading = ref(true);

const loadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = url;
  });
};

onMounted(async () => {
  try {
    if (props.recipe.image) {
      await loadImage(props.recipe.image);
      thumbnail.value = props.recipe.image;
      isLoading.value = false;
      return;
    }

    const response = await mealDbApiClient.getMealByName(props.recipe.name);
    if (response?.strMealThumb) {
      await loadImage(response.strMealThumb);
      thumbnail.value = response.strMealThumb;
    }
  } catch (error) {
    console.error("Error loading image:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
