import { createRouter, createWebHistory } from "vue-router";
import Explorer from "../views/Explorer.vue";

const routes = [
  {
    path: "/explorer/:folders(.*)*",
    name: "explorer",
    component: Explorer,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
