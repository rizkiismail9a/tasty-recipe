<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Recipe</p>
          <p class="my-0 text-secondary">Add your original recipe here</p>
        </div>
        <div>
          <router-link :to="{ name: 'New Recipe' }" class="btn add-btn px-3 py-2 rounded-pill"><i class="fa-solid fa-circle-plus pe-2"></i>Add Recipe</router-link>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="recipes.length < 1 && !loading">
        <p>Click the "&plus;" button above to add new recipe</p>
      </div>
      <div class="row" v-else>
        <!-- User Recipe Card -->
        <user-recipe-card v-for="r in recipes" :key="r.id" :recipe="r" :button-name="['Delete', 'Edit']">
          <p>{{ new Date(r.createdAt).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) }}</p>
        </user-recipe-card>
      </div>
    </li>
  </ul>
</template>
<script setup>
import UserRecipeCard from "./UserRecipeCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
const loading = ref(false);
const store = useStore();
onMounted(async () => {
  try {
    loading.value = true;
    await store.dispatch("recipe/getRecipesData");
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});
const recipes = computed(() => {
  const allRecipe = store.state.recipe.recipes;
  const userId = store.state.auth.userLogin.userId;
  return allRecipe.filter((recipe) => recipe.userId === userId);
});
</script>
