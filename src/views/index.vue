<template>
  <div class="bg-gray-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative">
      <!-- Background image and overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Cozy kitchen background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-[#1a0f0f]/80"></div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-amber-50 mb-6 drop-shadow-lg">
            Your Personal Recipe Collection,
            <span class="text-amber-500">Organized and Beautiful</span>
          </h1>
          <p
            class="text-xl text-amber-100/90 mb-8 max-w-2xl mx-auto drop-shadow-md"
          >
            Store, organize, and discover your favorite recipes in one cozy
            place. Never lose a cherished family recipe again.
          </p>
          <div class="flex justify-center space-x-4">
            <router-link
              to="/profile"
              class="bg-amber-700 text-amber-50 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
            >
              Start Cooking
            </router-link>
            <router-link
              to="/about"
              class="bg-[#2a1f1f]/80 backdrop-blur-sm text-amber-400 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-amber-700 hover:bg-[#3a2f2f]/80 transition-colors shadow-lg"
            >
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-[#2a1f1f]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-amber-50 mb-12">
          Everything You Need
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-[#1a0f0f] rounded-xl p-6 shadow-md hover:shadow-amber-700/20 transition-shadow border border-amber-900/30"
          >
            <div class="mb-4">
              <img
                :src="feature.icon"
                alt=""
                class="h-12 w-12 text-amber-500"
              />
            </div>
            <h3 class="text-xl font-semibold text-amber-50 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-amber-100/80">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import profileSupportIcon from "../assets/icons/profile-support.svg";
import creatingRecipesIcon from "../assets/icons/creating-recipes.svg";
import viewingFilteringIcon from "../assets/icons/filtering.svg";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Profile Support",
    description:
      "Create your personal profile and build your own digital cookbook. Share recipes with friends and family.",
    icon: profileSupportIcon,
  },
  {
    title: "Creating Recipes",
    description:
      "Easily add and organize your recipes with our intuitive recipe creator. Add photos, ingredients, and detailed instructions.",
    icon: creatingRecipesIcon,
  },
  {
    title: "Viewing and Filtering",
    description:
      "Find exactly what you're looking for with powerful search and filtering options. Sort by cuisine, cooking time, or dietary requirements.",
    icon: viewingFilteringIcon,
  },
];
</script>

<style scoped>
</style>
