<template>
  <div class="col-sm-8 col-4 py-0">
    <div class="d-none d-sm-block">
      <div class="header__searchbar input-group align-items-center border rounded-pill">
        <span class="px-2"><i class="fa-solid fa-magnifying-glass"></i></span>
        <input type="text" class="form-control form-control-sm border-0 rounded-pill" placeholder="Search Recipe" @keyup="search" v-model="keyword" />
      </div>
    </div>
    <div class="d-block d-sm-none border-end text-end px-3">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
// const emits = defineEmits(["search"]);
const keyword = ref();
const store = useStore();
function search() {
  store.commit("recipe/setSearchRecipeResult", { keyword: keyword.value });
}
</script>
