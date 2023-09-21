<template>
  <div>
    <WebHeader />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <WebFooter />
  </div>
</template>

<script setup>
// import HomeView from "./components/pages/HomeView.vue";
import WebFooter from "./components/footer/WebFooter.vue";
import WebHeader from "./components/header/WebHeader.vue";
</script>
<style>
.page-enter.active,
.page-leave-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
