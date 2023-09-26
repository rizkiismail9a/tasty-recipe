import { createStore } from "vuex";
import { recipeModule as recipe } from "./recipeModule";
export const store = createStore({
  modules: {
    recipe,
  },
});
