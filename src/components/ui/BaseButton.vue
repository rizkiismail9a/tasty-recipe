<template>
  <button class="btn rounded-pill" :type="type" @click="$emit('clickButton')">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: { type: String },
});
</script>
