<template>
  <button class="btn rounded-pill" :type="type">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: { type: String },
});
</script>
