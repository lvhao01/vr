import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/index.vue"),
    },
    {
      path: "/qiu",
      name: "qiu",
      component: () => import("../views/qiu.vue"),
    },
  ],
});

export default router;
