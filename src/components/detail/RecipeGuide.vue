<template>
  <div class="my-3">
    <div class="card">
      <div class="card-header">
        <p class="fs-4 my-0 fw-semibold">Directions</p>
      </div>
      <div class="card-body">
        <div v-for="(item, i) in recipeDetail.detailFromStore.directions" :key="i">
          <p class="my-2 fs-5 fw-semibold">Step {{ i + 1 }}</p>
          <p class="my-2">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const recipeDetail = defineProps({
  detailFromStore: { type: Object },
});
</script>
