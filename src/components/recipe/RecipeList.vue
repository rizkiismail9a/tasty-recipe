<template>
  <div class="recipe__list-recipe row">
    <RecipeCard v-for="item in recipes" :key="item.id" :recipe="item" />
  </div>
</template>

<script setup>
import RecipeCard from "./RecipeCard.vue";
import { useStore } from "vuex";
import { ref } from "vue";
const store = useStore();
let recipes = ref(null);
async function getRecipes() {
  try {
    await store.dispatch("recipe/getRecipesData");
    recipes.value = store.getters["recipe/getRecipe"];
    // console.log(recipes.value);
  } catch (error) {
    console.log(error);
  }
}
await getRecipes();
</script>
