import { reactive } from "vue";
import type { User } from "../interfaces/user";
export const userStore = reactive({
  currentUser: null,
  logout() {
    localStorage.removeItem("currentUser");
    this.currentUser = null;
  },
  getUser() {
    return this.currentUser;
  },
  setUser(user: User) {
    this.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  },
} as {
  currentUser: User | null;
  logout: () => void;
  getUser: () => User | null;
  setUser: (user: User) => void;
});
