import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Tours from "@/pages/Tours.vue";
import TourEdit from "@/pages/TourEdit.vue";

const routes = [
  { path: "/login", component: Login },
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "tours", component: Tours },
      { path: "tours/:id", component: TourEdit }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
