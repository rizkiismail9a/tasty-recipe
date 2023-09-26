<template>
  <div class="container-md my-5 py-5">
    <div class="recipe__title text-center">
      <h2>All Recipe</h2>
      <p style="font-size: 15px">Find and share everyday cooking inspiration on Allrecipes.Discover recipes, cooks, videos, and how-tos based on the food you love and the friends you follow.</p>
    </div>
    <Suspense>
      <RecipeList />
      <template #fallback>
        <div class="d-flex flex-md-row flex-column justify-content-center align-items-center">
          <img src="../../assets/images/logo.png" class="object-fit-cover" style="height: 50px" />
          <BaseLoading />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import RecipeList from "../recipe/RecipeList.vue";
import BaseLoading from "../loading/BaseLoading.vue";
</script>
