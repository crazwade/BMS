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

// 每次登入檢查
// router.beforeEach((to, from, next) => {
//   if (to.path !== "/login") {
//     // 如果不是前往登入頁，則將使用者導向登入頁
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
