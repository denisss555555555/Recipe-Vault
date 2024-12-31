import { createMemoryHistory, createRouter } from "vue-router";

import Index from "../views/index.vue";
import Auth from "../views/auth.vue";
import { userStore } from "../stores/user";

const routes = [
  {
    path: "/",
    component: Index,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/auth",
    component: Auth,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    userStore.currentUser = JSON.parse(user);
  } else {
    userStore.currentUser = null;
  }

  if (to.meta.requiresAuth && !userStore.currentUser) {
    next("/auth");
  } else {
    next();
  }
});

export { router };
