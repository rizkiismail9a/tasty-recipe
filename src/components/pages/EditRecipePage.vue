<template>
  <div class="container-md my-5 py-5">
    <recipe-form v-if="detailData" :isEdit="true"></recipe-form>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import recipeForm from "../recipeForm/recipeForm.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const store = useStore();
const route = useRoute();
const detailData = ref();
// const isLoading = ref(false);
onMounted(async () => {
  try {
    // isLoading.value = true;
    await store.dispatch("recipe/getRecipeDetail", route.params.id);
    detailData.value = store.getters["recipe/getDetail"];
    // isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
});
</script>
