<template>
  <div class="col-12 col-lg-3 col-sm-4 position-relative" style="padding-top: 12px; padding-bottom: 12px">
    <div class="card text-decoration-none" style="height: 398px">
      <img :src="props.recipe.imageLink" class="card-img-top" alt="Food" height="240" width="285" style="object-fit: cover" />
      <div class="card-body">
        <p class="mb-0">{{ props.recipe.category }}</p>
        <div class="h-50">
          <h4 class="fs-5 mb-0" style="cursor: pointer" @click="goToDetail">{{ props.recipe.name }}</h4>
        </div>
        <p>Recipe by {{ props.recipe.username }}</p>
      </div>
    </div>
    <div class="position-absolute text-secondary bg-light px-2 py-1 rounded-circle top-0 end-0 m-4 like-icon">
      <i class="fas fa-heart"></i>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  recipe: { type: Object },
});
const router = useRouter();

async function goToDetail() {
  try {
    router.push({
      name: "detailPage",
      params: { id: props.recipe.id },
    });
  } catch (error) {
    console.log(error);
  }
}
</script>
