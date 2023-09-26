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
</script>
