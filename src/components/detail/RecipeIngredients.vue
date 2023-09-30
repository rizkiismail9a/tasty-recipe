<template>
  <div class="my-3">
    <div class="card">
      <div class="card-header">
        <p class="fs-4 my-0 fw-semibold">Ingredients</p>
      </div>
      <div class="card-body">
        <ul class="mb-0">
          <li v-for="(item, i) in recipeDetail.detailFromStore.ingredients" :key="i">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const recipeDetail = defineProps({
  detailFromStore: { type: Object },
});
</script>
