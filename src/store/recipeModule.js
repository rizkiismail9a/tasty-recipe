import axios from "axios";
const recipeModule = {
  namespaced: true,
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
    setNewRecipe: (state, payload) => {
      state.recipes.push(payload);
    },
  },
  actions: {
    attemp: async (context) => {
      await context.dispatch("getRecipesData");
    },
    getRecipesData: async (context) => {
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
    async createNewRecipe({ dispatch, rootState }, payload) {
      try {
        const newRecipe = {
          ...payload,
          username: rootState.auth.userLogin.username,
          createdAt: Date.now(),
          userId: rootState.auth.userLogin.userId,
        };
        await axios.post(import.meta.env.VITE_BASE_URI + `/recipes.json?auth=${rootState.auth.accessToken}`, newRecipe);
        await dispatch("getRecipesData");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export { recipeModule };
