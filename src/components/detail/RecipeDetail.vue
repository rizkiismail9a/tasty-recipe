<template>
  <div class="d-flex justify-content-center align-items-center" v-if="isLoading === true">
    <img src="../../assets/images/logo.png" class="object-fit-cover" style="height: 50px" />
    <BaseLoading />
  </div>
  <div class="col-12 col-sm-8" v-else>
    <RecipeDescription :detail-from-store="recipeData" />
    <recipe-ingredients :detail-from-store="recipeData"></recipe-ingredients>
    <recipe-guide :detail-from-store="recipeData"></recipe-guide>
  </div>
</template>

<script setup>
import BaseLoading from "../loading/BaseLoading.vue";
import RecipeDescription from "./RecipeDescription.vue";
import RecipeIngredients from "./RecipeIngredients.vue";
import RecipeGuide from "./RecipeGuide.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
const isLoading = ref(false);
const route = useRoute();
const store = useStore();

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch("getRecipeDetail", route.params.id);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = true;
    console.log(error);
  }
});
const recipeData = computed(() => {
  return store.getters.getDetail;
});
</script>
