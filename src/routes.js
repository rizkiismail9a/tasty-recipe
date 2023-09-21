import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/pages/HomeView.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "homePage", component: HomePage },
    { path: "/signup", name: "signup", component: SignupPage },
    { path: "/login", name: "login", component: LoginPage },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export { router };
