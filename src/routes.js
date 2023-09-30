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
    {
      path: "/recipe/:id",
      name: "detailPage",
      component: () => import("./components/pages/DetailPage.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  document.title = to.name + " | Tasty Recipe";
});

export { router };
