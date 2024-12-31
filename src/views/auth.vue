<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { User } from "../interfaces/user";
import type { ValidationErrors } from "../interfaces/validation-errors";
import { userStore } from "../stores/user";

const isLogin = ref(true);
const validationErrors = ref<ValidationErrors>({});
const successMessage = ref("");
const router = useRouter();

// Form data
const formData = ref<User>({
  username: "",
  email: "",
  password: "",
});

// Validation helpers
const validateUsername = (): string | undefined => {
  if (!isLogin.value && !formData.value.username?.trim()) {
    return "Username is required";
  }
};

const validateEmail = (): string | undefined => {
  if (!formData.value.email.trim()) {
    return "Email is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    return "Please enter a valid email address";
  }
};

const validatePassword = (): string | undefined => {
  if (!formData.value.password) {
    return "Password is required";
  }
  if (formData.value.password.length < 6) {
    return "Password must be at least 6 characters long";
  }
};

// Form validation
const validateForm = (): boolean => {
  const errors: ValidationErrors = {
    username: validateUsername(),
    email: validateEmail(),
    password: validatePassword(),
  };

  validationErrors.value = Object.fromEntries(
    Object.entries(errors).filter(([_, value]) => value !== undefined)
  );

  return Object.keys(validationErrors.value).length === 0;
};

// Toggle between login and register forms
const toggleForm = () => {
  isLogin.value = !isLogin.value;
  validationErrors.value = {};
  successMessage.value = "";
  formData.value = {
    username: "",
    email: "",
    password: "",
  };
};

// Register new user
const register = () => {
  if (!validateForm()) return;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user: User) => user.email === formData.value.email)) {
      validationErrors.value = {
        email: "This email is already registered",
      };
      return;
    }

    users.push({
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password,
    });

    localStorage.setItem("users", JSON.stringify(users));

    successMessage.value = "Registration successful! Please log in.";
    setTimeout(() => toggleForm(), 1000);
  } catch (error) {
    validationErrors.value = {
      general: "Registration failed. Please try again.",
    };
  }
};

// Login user
const login = () => {
  if (!validateForm()) return;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: User) =>
        u.email === formData.value.email &&
        u.password === formData.value.password
    );

    if (user) {
      userStore.setUser(user);
      successMessage.value = "Login successful!";
      router.push("/profile");
    } else {
      validationErrors.value = {
        general: "Invalid email or password",
      };
    }
  } catch (error) {
    validationErrors.value = {
      general: "Login failed. Please try again.",
    };
  }
};

// Handle form submission
const handleSubmit = () => {
  validationErrors.value = {};
  successMessage.value = "";

  if (isLogin.value) {
    login();
  } else {
    register();
  }
};
</script>
<template>
  <div
    class="min-h-screen bg-[#1a0f0f] flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 bg-[#2a1f1f] p-8 rounded-xl border border-amber-900/30 shadow-xl"
    >
      <!-- Logo/Title -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-amber-400">
          {{ isLogin ? "Welcome Back" : "Create Account" }}
        </h2>
        <p class="mt-2 text-amber-100/80">
          {{
            isLogin
              ? "Sign in to access your recipes"
              : "Start your culinary journey"
          }}
        </p>
      </div>

      <!-- Error/Success Messages -->
      <div
        v-if="validationErrors.general"
        class="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg"
      >
        {{ validationErrors.email || validationErrors.general }}
      </div>
      <div
        v-if="successMessage"
        class="bg-green-900/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg"
      >
        {{ successMessage }}
      </div>

      <!-- Form -->
      <form
        class="mt-8 space-y-6"
        @submit.prevent="handleSubmit"
        autocomplete="off"
      >
        <!-- Username field (Register only) -->
        <div v-if="!isLogin" class="space-y-1">
          <label
            for="username"
            class="block text-sm font-medium text-amber-100/80"
            >Username</label
          >
          <input
            id="username"
            v-model="formData.username"
            type="text"
            autocomplete="off"
            class="mt-1 block w-full bg-[#1a0f0f] border border-amber-900/30 rounded-lg px-4 py-2 text-amber-50 placeholder-amber-100/50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            :class="{
              'border-red-500':
                validationErrors.username || validationErrors.general,
            }"
            placeholder="Choose a username"
          />
          <p
            v-if="validationErrors.username || validationErrors.general"
            class="mt-2 text-red-400 text-sm font-medium"
          >
            {{ validationErrors.username || validationErrors.general }}
          </p>
        </div>

        <!-- Email field -->
        <div class="space-y-1">
          <label for="email" class="block text-sm font-medium text-amber-100/80"
            >Email</label
          >
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="mt-1 block w-full bg-[#1a0f0f] border border-amber-900/30 rounded-lg px-4 py-2 text-amber-50 placeholder-amber-100/50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            :class="{
              'border-red-500':
                validationErrors.email || validationErrors.general,
            }"
            placeholder="Enter your email"
          />
          <p
            v-if="validationErrors.email || validationErrors.general"
            class="mt-2 text-red-400 text-sm font-medium"
          >
            {{ validationErrors.email }}
          </p>
        </div>

        <!-- Password field -->
        <div class="space-y-1">
          <label
            for="password"
            class="block text-sm font-medium text-amber-100/80"
            >Password</label
          >
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="mt-1 block w-full bg-[#1a0f0f] border border-amber-900/30 rounded-lg px-4 py-2 text-amber-50 placeholder-amber-100/50 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            :class="{ 'border-red-500': validationErrors.password }"
            placeholder="Enter your password"
          />
          <p
            v-if="validationErrors.password"
            class="mt-2 text-red-400 text-sm font-medium"
          >
            {{ validationErrors.password }}
          </p>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full bg-amber-700 text-amber-50 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
        >
          {{ isLogin ? "Sign In" : "Create Account" }}
        </button>

        <!-- Toggle form link -->
        <p class="text-center text-amber-100/80">
          {{
            isLogin ? "Don't have an account? " : "Already have an account? "
          }}
          <a
            @click.prevent="toggleForm"
            href="#"
            class="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
          >
            {{ isLogin ? "Register now" : "Sign in" }}
          </a>
        </p>
      </form>
    </div>
  </div>
</template>
