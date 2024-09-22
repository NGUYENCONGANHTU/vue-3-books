import { createRouter, createWebHistory } from "vue-router";
import { NOTE_APP, AUTH_ROUTES } from "@/constants/routers.js";
import { authMiddleware } from "@/middleware/authenticate-middleware";

const routes = [...NOTE_APP, ...AUTH_ROUTES];
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(authMiddleware);

export default router;
