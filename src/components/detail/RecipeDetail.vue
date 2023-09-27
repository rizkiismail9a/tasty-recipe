<template>
  <div class="col-12 col-sm-8">
    <RecipeDescription />
    <recipe-ingredients></recipe-ingredients>
    <recipe-guide></recipe-guide>
  </div>
</template>

<script setup>
import RecipeDescription from "./RecipeDescription.vue";
import RecipeIngredients from "./RecipeIngredients.vue";
import RecipeGuide from "./RecipeGuide.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useStore();
async function getDetailDataFromStore() {
  try {
    await store.dispatch("getRecipeDetail", route.params.id);
  } catch (error) {
    console.log(error);
  }
}
await getDetailDataFromStore();
</script>
