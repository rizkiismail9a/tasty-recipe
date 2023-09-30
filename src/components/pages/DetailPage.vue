<template>
  <main>
    <div class="container-md my-5 py-5">
      <div class="row my-4">
        <div class="col-12 col-sm-2"></div>
        <recipe-detail></recipe-detail>
        <!-- <suspense>
          <template #fallback>
            <div class="d-flex flex-md-row flex-column justify-content-center align-items-center">
              <img src="../../assets/images/logo.png" class="object-fit-cover" style="height: 50px" />
              <BaseLoading />
            </div>
          </template>
        </suspense> -->
        <div class="col-12 col-sm-2"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
// import BaseLoading from "../loading/BaseLoading.vue";
import RecipeDetail from "../detail/RecipeDetail.vue";
</script>
