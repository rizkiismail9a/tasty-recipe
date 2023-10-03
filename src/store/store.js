import { createStore } from "vuex";
import { recipeModule as recipe } from "./recipeModule";
import auth from "./authModule";
export const store = createStore({
  modules: {
    recipe,
    auth,
  },
});
