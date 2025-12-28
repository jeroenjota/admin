import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Tours from "@/pages/Tours.vue";
import CategoriesAdmin from "@/pages/CategoriesAdmin.vue"
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
      { path: "categories", component: CategoriesAdmin },
      { path: "users", component: UsersAdmin },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
