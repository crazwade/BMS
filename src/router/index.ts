import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/LayoutView.vue";
import Login from "../views/login/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
