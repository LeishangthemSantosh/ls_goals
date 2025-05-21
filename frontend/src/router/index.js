import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import SignIn from "@/views/App/SignIn.vue";
import SignUp from "@/views/App/SignUp.vue";
import { useAuthStore } from "@/stores/auth.store";
import GoalList from "@/views/Dashboard/goal/GoalList.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "Home",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "/goals",
        name: "Goal",
        component: GoalList,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/sign-in",
        name: "Sign-In",
        component: SignIn,
        meta: { requiresAuth: false },
      },
      {
        path: "/sign-up",
        name: "Sign-Up",
        component: SignUp,
        meta: { requiresAuth: false },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  console.log("Before", !auth.isAuthenticated);

  // If route requires auth and user is not authenticated, redirect to sign-in
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    console.log("No");

    next({ name: "Sign-In" });
  }
  // If route is sign-in or sign-up and user is authenticated, redirect to home
  else if (
    (to.name === "Sign-In" || to.name === "Sign-Up") &&
    auth.isAuthenticated
  ) {
    console.log("Yes");
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
