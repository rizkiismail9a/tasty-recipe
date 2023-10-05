import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/pages/HomeView.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import { store } from "./store/store";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: HomePage,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/recipe/:id",
      name: "detailPage",
      component: () => import("./components/pages/DetailPage.vue"),
    },
    {
      path: "/recipe/edit/:id",
      name: "Edit Recipe",
      component: () => import("./components/pages/EditRecipePage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/user/:component",
      name: "userPage",
      component: () => import("./components/pages/UserPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/new-recipe",
      name: "New Recipe",
      component: () => import("./components/pages/NewRepicePage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.name + " | Tasty Recipe";
  if (to.meta.requiresAuth && !store.state.auth.accessToken) {
    next({ name: "login" });
  } else if (to.meta.requiresGuest && store.state.auth.accessToken) {
    next({ name: "homePage" });
  } else {
    next();
  }
});

export { router };
