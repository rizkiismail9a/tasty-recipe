<template>
  <div class="my-3">
    <div class="card">
      <div class="card-header">
        <p class="fs-4 my-0 fw-semibold">Ingredients</p>
      </div>
      <div class="card-body">
        <ul class="mb-0">
          <li v-for="(item, i) in recipeDetail.ingredients" :key="i">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const recipeDetail = computed(() => {
  return store.getters.getDetail;
});
</script>
