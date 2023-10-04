import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/pages/HomeView.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import Cookies from "js-cookie";
import { store } from "./store/store";

const checkAuth = () => {
  const jwtCookies = Cookies.get("accessToken");
  const expirationDate = Cookies.get("tokenExpirationDate");
  const userId = Cookies.get("UID");
  if (jwtCookies) {
    if (new Date().getTime() < expirationDate) {
      store.commit("auth/setToken", { idToken: jwtCookies, expiresIn: expirationDate });
      store.dispatch("auth/getUser", userId);
      return true;
    } else {
      store.commit("auth/clearLoginData");
      return false;
    }
  } else {
    return false;
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: HomePage,
      beforeEnter: () => {
        checkAuth();
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
      beforeEnter: (to, from, next) => {
        checkAuth() ? next({ path: "/user/personal-info" }) : next();
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        checkAuth() ? next({ path: "/user/personal-info" }) : next();
      },
    },
    {
      path: "/recipe/:id",
      name: "detailPage",
      component: () => import("./components/pages/DetailPage.vue"),
    },
    {
      path: "/user/:component",
      name: "userPage",
      component: () => import("./components/pages/UserPage.vue"),
      beforeEnter: (to, from, next) => {
        checkAuth() ? next() : next({ name: "login" });
      },
    },
    {
      path: "/new-recipe",
      name: "New Recipe",
      component: () => import("./components/pages/NewRepicePage.vue"),
      beforeEnter: (to, from, next) => {
        checkAuth() ? next() : next({ name: "login" });
      },
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
