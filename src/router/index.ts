import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/LayoutView.vue";
import Login from "../views/login/LoginView.vue";
import PageNotfound from "../views/pageNotfound/PageNotfound.vue";
import { usePermissionStore } from "../store/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      redirect: "/HomePage",
      component: Layout,
      name: "Main",
      children: [
        {
          path: "/HomePage",
          name: "HomePage",
          component: () => import("@/views/homePage/HomePage.vue"),
        },
        {
          path: "/MemberManagement",
          name: "MemberManagement",
          component: () =>
            import("@/views/memberManagement/MemberManagement.vue"),
        },
        {
          path: "/AttendanceRecords",
          name: "AttendanceRecords",
          component: () =>
            import("@/views/attendanceRecords/AttendanceRecords.vue"),
        },
        {
          path: "/OperationRecords",
          name: "OperationRecords",
          component: () =>
            import("@/views/operationRecords/OperationRecords.vue"),
        },
        {
          path: "/FinancialRecords",
          name: "FinancialRecords",
          component: () =>
            import("@/views/financialRecords/FinancialRecords.vue"),
        },
        {
          path: "/FeeCollection",
          name: "FeeCollection",
          component: () => import("@/views/feeCollection/FeeCollection.vue"),
        },
        {
          path: "/EventRecords",
          name: "EventRecords",
          component: () => import("@/views/eventRecords/EventRecords.vue"),
        },
        {
          path: "/FeedbackRecords",
          name: "FeedbackRecords",
          component: () =>
            import("@/views/feedbackRecords/FeedbackRecords.vue"),
        },
      ],
    },
    {
      path: "/404",
      component: PageNotfound,
    },
  ],
});

export default router;
