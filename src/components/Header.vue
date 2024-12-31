<template>
  <nav class="bg-[#2a1f1f] shadow-lg border-b border-amber-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-amber-400"
            >Recipe Vault</router-link
          >
        </div>
        <div class="flex items-center space-x-4">
          <span v-if="currentUser" class="text-amber-100"
            >Welcome, {{ currentUser?.username }}</span
          >
          <router-link
            v-if="!currentUser"
            to="/auth"
            class="bg-amber-700 text-amber-50 px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Log in
          </router-link>
          <button
            v-else
            @click="logout"
            class="bg-red-700 text-amber-50 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { userStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";

const currentUser = computed(() => userStore.currentUser);
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push("/");
};
</script>
<style scoped></style>
