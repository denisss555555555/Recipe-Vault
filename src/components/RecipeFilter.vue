<template>
  <div
    class="bg-[#1a0f0f] p-6 rounded-lg shadow-lg border border-amber-900/30 mb-8"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search Input -->
      <div>
        <label class="block text-amber-100/80 mb-2">Search</label>
        <input
          v-model="filters.searchTerm"
          type="text"
          class="w-full bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Search recipes..."
          @input="emitFilters"
        />
      </div>

      <!-- Sort Options -->
      <div>
        <label class="block text-amber-100/80 mb-2">Sort By</label>
        <div class="flex space-x-2">
          <select
            v-model="filters.sortBy"
            class="flex-1 bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            @change="emitFilters"
          >
            <option value="name">Name</option>
            <option value="difficulty">Difficulty</option>
          </select>
          <button
            @click="toggleSortDirection"
            class="bg-[#2a1f1f] text-amber-50 px-4 py-2 rounded-lg border border-amber-900/30"
          >
            {{ filters.sortDirection === "asc" ? "↑" : "↓" }}
          </button>
        </div>
      </div>

      <!-- Difficulty Filter -->
      <div>
        <label class="block text-amber-100/80 mb-2">Difficulty</label>
        <select
          v-model="filters.difficultyLevel"
          class="w-full bg-[#2a1f1f] text-amber-50 rounded-lg px-4 py-2 border border-amber-900/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          @change="emitFilters"
        >
          <option value="">Any</option>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { RecipeFilters } from "../interfaces/recipe-filters";
import { RecipeDifficulty } from "../enums/recipe-difficulty";

const emit = defineEmits(["filter-changed"]);

const filters = ref<RecipeFilters>({
  searchTerm: "",
  sortBy: "name",
  sortDirection: "asc",
  difficultyLevel: RecipeDifficulty.EASY,
});

const toggleSortDirection = () => {
  filters.value.sortDirection =
    filters.value.sortDirection === "asc" ? "desc" : "asc";
  emitFilters();
};

const emitFilters = () => {
  emit("filter-changed", filters.value);
};
</script>
