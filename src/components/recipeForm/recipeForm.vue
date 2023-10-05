<template>
  <ul class="list-group">
    <recipe-form-header></recipe-form-header>
    <recipe-form-body :isEdit="isEdit"></recipe-form-body>
  </ul>
</template>

<script setup>
import recipeFormBody from "./recipeFormBody.vue";
import recipeFormHeader from "./recipeFormHeader.vue";
defineProps({
  isEdit: { type: Boolean, default: false },
});
</script>
