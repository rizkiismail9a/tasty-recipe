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
      name: "Home",
      component: HomePage,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupPage,
      meta: {
        forGuest: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      meta: {
        forGuest: true,
      },
    },
    {
      path: "/recipe/:id",
      name: "Detail",
      component: () => import("./components/pages/DetailPage.vue"),
    },
    {
      path: "/recipe/edit/:id",
      name: "Edit Recipe",
      component: () => import("./components/pages/EditRecipePage.vue"),
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/user/:component",
      name: "User",
      component: () => import("./components/pages/UserPage.vue"),
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/new-recipe",
      name: "New Recipe",
      component: () => import("./components/pages/NewRepicePage.vue"),
      meta: {
        forAuthedUser: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.name + " | Tasty Recipe";
  if (to.meta.forAuthedUser && !store.state.auth.accessToken) {
    next({ name: "Login" });
  } else if (to.meta.forGuest && store.state.auth.accessToken) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export { router };
