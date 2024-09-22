import { useAuthStore } from "@/stores/authStore";
export const authMiddleware = (to, from, next) => {
  const authStore = useAuthStore();
  // Check if the route requires authentication
  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    next({ path: "/login" });
  } else {
    next();
  }
};
