<template>
  <div class="header__navbar row justify-content-between align-items-center" style="width: 450px">
    <SearchBar />
    <component :is="components[componentActive]"></component>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import SearchBar from "./SearchBar.vue";
import SignupMenu from "./SignupMenu.vue";
import ProfileMenu from "./ProfileMenu.vue";
import { watch, ref, computed } from "vue";
const store = useStore();
const componentActive = ref("signup-menu");
const components = {
  "signup-menu": SignupMenu,
  "profile-menu": ProfileMenu,
};
const getToken = computed(() => {
  return store.state.auth.accessToken;
});
watch(getToken, (newValue, oldValue) => {
  if (!newValue) {
    componentActive.value = "signup-menu";
  } else {
    componentActive.value = "profile-menu";
  }
});
</script>
