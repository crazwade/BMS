import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/LayoutView.vue";
import Login from "../views/login/LoginView.vue";

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
      component: Layout,
      name: "Main",
      children: [
        {
          path: "attendanceRecords",
          name: "AttendanceRecords",
          component: () =>
            import("../views/attendanceRecords/AttendanceRecords.vue"),
        },
        {
          path: "eventRecords",
          name: "EventRecords",
          component: () => import("../views/eventRecords/EventRecords.vue"),
        },
        {
          path: "feeCollection",
          name: "FeeCollection",
          component: () => import("../views/feeCollection/FeeCollection.vue"),
        },
        {
          path: "feedbackRecords",
          name: "FeedbackRecords",
          component: () =>
            import("../views/feedbackRecords/FeedbackRecords.vue"),
        },
        {
          path: "financialRecords",
          name: "FinancialRecords",
          component: () =>
            import("../views/financialRecords/FinancialRecords.vue"),
        },
        {
          path: "memberManagement",
          name: "MemberManagement",
          component: () =>
            import("../views/memberManagement/MemberManagement.vue"),
        },
        {
          path: "operationRecords",
          name: "OperationRecords",
          component: () =>
            import("../views/operationRecords/OperationRecords.vue"),
        },
      ],
    },
  ],
});

export default router;
