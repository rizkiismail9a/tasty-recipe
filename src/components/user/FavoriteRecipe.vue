<template>
  <base-modal v-if="showModal">
    <div class="alert alert-success" role="alert">Recipe's been deleted</div>
  </base-modal>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="mb-3 mb-sm-0">
        <p class="my-0 fs-4 fw-semibold">Favorite Recipe</p>
        <p class="my-0 text-secondary">Save the recipe that you loved here</p>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="recipes.length < 1 && !loading">
        <p>Nothing's here, but us chicken</p>
      </div>
      <div v-else class="row">
        <user-recipe-card v-for="(r, i) in recipes" :key="r.id" :recipe="r" :index="i" :button-name="['Delete']" @delete="deleteRecipe">
          <p>{{ new Date(r.createdAt).toLocaleDateString("en-EN", { weekday: "long", year: "numeric", month: "short", day: "numeric" }) }}</p>
        </user-recipe-card>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import BaseModal from "../loading/BaseModal.vue";
import UserRecipeCard from "./UserRecipeCard.vue";
import { useStore } from "vuex";
const loading = ref(true);
const showModal = ref(false);
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
  let newArr = [];
  allRecipe.forEach((recipe) => {
    for (let key in recipe.likes) {
      if (recipe.likes[key] === userId) {
        newArr.push(recipe);
      }
    }
  });
  return newArr;
});
async function deleteRecipe({ id }) {
  try {
    const userId = store.state.auth.userLogin.userId;
    await store.dispatch("recipe/disLike", { id, userId });
    showModal.value = true;
    setTimeout(() => {
      showModal.value = false;
    }, 4000);
  } catch (error) {
    console.log(error);
  }
}
</script>
