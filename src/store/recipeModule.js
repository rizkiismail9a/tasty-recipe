import axios from "axios";
const recipeModule = {
  state() {
    return {
      recipes: [],
    };
  },
  getters: {
    getRecipe: (state) => {
      return state.recipes;
    },
  },
  mutations: {
    setRecipesData: (state, payload) => {
      state.recipes = payload;
    },
  },
  actions: {
    getRecepiesData: async (context) => {
      try {
        const { data } = await axios.get("https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes.json");
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        context.commit("setRecipesData", arr);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export { recipeModule };
