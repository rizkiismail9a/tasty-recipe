<template>
  <div class="col-md-6 col-12 my-2">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <p class="mb-0">{{ recipe.category }}</p>
            <div class="h-50">
              <h4 class="fs-5 mb-0" @click="goToDetail(recipe.id)" style="cursor: pointer">{{ recipe.name }}</h4>
            </div>
            <slot></slot>
          </div>
          <div class="d-flex">
            <img :src="recipe.imageLink" alt="" width="90" height="80" class="rounded" style="object-fit: cover" />
          </div>
        </div>
        <div class="d-flex justify-content-between mt-3 pt-3 border-top">
          <button class="btn delete-btn px-3 py-2 rounded-pill" @click="$emit('delete', { id: recipe.id, index })">
            {{ buttonName[0] }}
          </button>
          <button class="btn edit-btn px-3 py-2 rounded-pill" @click="$emit('edit', recipe.id)">
            {{ buttonName[1] }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

defineProps({
  recipe: { type: Object, require: true },
  buttonName: { type: Array, require: true },
  index: { type: Number },
});
const router = useRouter();
function goToDetail(id) {
  router.push({
    name: "detailPage",
    params: { id },
  });
}
</script>
