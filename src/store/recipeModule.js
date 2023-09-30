import axios from "axios";
const recipeModule = {
  state() {
    return {
      recipes: [],
      recipeOnDetail: {},
    };
  },
  getters: {
    getRecipe: (state) => {
      return state.recipes;
    },
    getDetail: (state) => {
      return state.recipeOnDetail;
    },
  },
  mutations: {
    setRecipesData: (state, payload) => {
      state.recipes = payload;
    },
    setRecipeDetail: (state, payload) => {
      state.recipeOnDetail = null;
      state.recipeOnDetail = payload;
    },
  },
  actions: {
    getRecepiesData: async (context) => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URI + "/recipes.json");
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        context.commit("setRecipesData", arr);
      } catch (err) {
        console.log(err);
      }
    },
    async getRecipeDetail({ commit }, payload) {
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URI + `/recipes/${payload}.json`);
        console.log("Ini data dari store", data);
        commit("setRecipeDetail", data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export { recipeModule };
