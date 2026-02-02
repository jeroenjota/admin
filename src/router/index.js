import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Tours from "@/pages/Tours.vue";
import Categories from "@/pages/Categories.vue"
import UsersAdmin from "../pages/UsersAdmin.vue";

const routes = [
  { path: "/login", component: Login, meta: { guestOnly: true } },
  { path: "/register", component: Register, meta: { guestOnly: true } },

  {
    path: "/",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "tours" },
      { path: "tours", component: Tours },
      { path: "categories", component: Categories },
      { path: "users", component: UsersAdmin ,
        meta: { requiresAuth: true  }
      },
    ],
  },
];


function isLoggedIn() {
  return !!localStorage.getItem("token");
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});
//  GLOBAL NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!token && to.path !== "/login") {
    return next("/login");
  }

  if (token && to.path === "/login") {
    return next("/");
  }

  next();
});

export default router;  