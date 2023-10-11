<template>
  <base-modal v-if="showModal">
    <div class="alert alert-success" role="alert">Recipe's been deleted</div>
  </base-modal>
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
        <user-recipe-card v-for="(r, i) in recipes" :key="r.id" :recipe="r" :index="i" :button-name="['Delete', 'Edit']" @delete="deleteRecipe" @edit="goToEditPage">
          <p>{{ new Date(r.createdAt).toLocaleDateString("en-EN", { weekday: "long", year: "numeric", month: "short", day: "numeric" }) }}</p>
        </user-recipe-card>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { useRouter } from "vue-router";
import BaseModal from "../loading/BaseModal.vue";
import UserRecipeCard from "./UserRecipeCard.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const loading = ref(false);
const store = useStore();
const showModal = ref(false);
const router = useRouter();
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
async function deleteRecipe({ id, index }) {
  try {
    // store.commit("recipe/spliceRecipe", index);
    await store.dispatch("recipe/deleteRecipe", { id, index });
    showModal.value = true;
    setTimeout(() => {
      showModal.value = false;
    }, 4000);
  } catch (error) {
    console.log(error);
  }
}
async function goToEditPage(id) {
  router.push({
    name: "Edit Recipe",
    params: { id },
  });
}
</script>
