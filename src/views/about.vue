<template>
  <div class="bg-[#1a0f0f] min-h-screen py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-amber-50 mb-8 text-center">
        About Recipe Vault
      </h1>

      <div
        class="bg-[#2a1f1f] rounded-xl p-8 shadow-lg border border-amber-900/30"
      >
        <h2 class="text-2xl font-semibold text-amber-500 mb-4">
          Project Overview
        </h2>
        <p class="text-amber-100/80 mb-6">
          Recipe Vault was developed as a project for the Web Design course at
          Technical University Sofia. It provides a simple yet effective way to
          store and organize your favorite recipes.
        </p>

        <h2 class="text-2xl font-semibold text-amber-500 mb-4">
          Technology Stack
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-[#1a0f0f] p-4 rounded-lg border border-amber-900/30">
            <h3 class="text-xl font-medium text-amber-400 mb-2">Vue.js</h3>
            <p class="text-amber-100/80">
              Modern frontend framework providing reactive components and smooth
              user interactions
            </p>
          </div>
          <div class="bg-[#1a0f0f] p-4 rounded-lg border border-amber-900/30">
            <h3 class="text-xl font-medium text-amber-400 mb-2">
              Tailwind CSS
            </h3>
            <p class="text-amber-100/80">
              Utility-first CSS framework enabling rapid and responsive design
              implementation
            </p>
          </div>
        </div>

        <h2 class="text-2xl font-semibold text-amber-500 mb-4">Data Storage</h2>
        <p class="text-amber-100/80">
          Recipe Vault utilizes browser's Local Storage for data persistence,
          allowing you to maintain your recipe collection without requiring a
          backend server.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>