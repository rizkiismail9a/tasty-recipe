<template>
  <div class="my-2 p-4 d-flex flex-column-reverse flex-lg-row justify-content-between border border-secondary-sublet rounded">
    <div class="pe-lg-4">
      <h2>{{ props.detailFromStore.name }}</h2>
      <p>
        {{ props.detailFromStore.description }}
      </p>

      <!-- Phone Device -->
      <div class="d-flex d-lg-none flex-column justify-content-between border border-primary rounded bg-color-detail g-5">
        <div class="w-75 my-3 pb-3 mx-auto pe-lg-4 ps-lg-3 border-bottom border-primary">
          <p class="my-0">Preptime</p>
          <p class="my-0">{{ props.detailFromStore.prepTime }} Mins</p>
        </div>
        <div class="w-75 px-lg-4 pb-3 mx-auto border-bottom border-primary">
          <p class="my-0">Cooktime</p>
          <p class="my-0">{{ props.detailFromStore.cookTime }} Mins</p>
        </div>
        <div class="w-75 my-3 mx-auto ps-lg-4 pe-3">
          <p class="my-0">Total</p>
          <p class="my-0">{{ props.detailFromStore.totalTime }} Mins</p>
        </div>
      </div>

      <!-- PC Device -->
      <div class="d-none d-lg-flex flex-lg-row justify-content-between border border-primary rounded bg-color-detail">
        <div class="w-75 my-3 pb-3 mx-auto pe-lg-4 ps-lg-3 border-end border-primary">
          <p class="my-0">Preptime</p>
          <p class="my-0">{{ props.detailFromStore.prepTime }} Mins</p>
        </div>
        <div class="w-75 my-3 px-lg-4 mx-auto border-end border-primary">
          <p class="my-0">Cooktime</p>
          <p class="my-0">{{ props.detailFromStore.cookTime }} Mins</p>
        </div>
        <div class="w-75 my-3 mx-auto ps-lg-4 pe-3">
          <p class="my-0">Total</p>
          <p class="my-0">{{ props.detailFromStore.totalTime }} Mins</p>
        </div>
      </div>
      <p class="my-3">Recipe By {{ props.detailFromStore.username }}</p>
      <div>
        <button class="btn fav-btn px-3 py-2 rounded-pill" v-if="!isLiked" @click="likePost"><i class="far fa-heart pe-2"></i>Add To Favorite</button>
        <div class="btn fav-btn px-3 py-2 rounded-pill" v-else @click="disLikeTheRecipe"><i class="far fa-heart pe-2"></i>Favorited</div>
      </div>
    </div>
    <div class="ps-lg-4 text-center">
      <img :src="props.detailFromStore.imageLink" alt="Food" class="recipe__detail-img rounded m-auto w-100" style="object-fit: cover" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({
  detailFromStore: { type: Object },
});
const route = useRoute();
const router = useRouter();
const isLiked = ref(false);
const store = useStore();
onMounted(() => {
  const userId = store.state.auth.userLogin.userId;
  const likes = props.detailFromStore.likes;
  for (let key in likes) {
    if (likes[key] === userId) {
      isLiked.value = true;
    }
  }
});
async function likePost() {
  const userId = store.state.auth.userLogin.userId;
  if (userId) {
    isLiked.value = true;
    const payload = {
      id: route.params.id,
    };
    await store.dispatch("recipe/likeThePost", payload);
  } else {
    router.push("/login");
  }
}
async function disLikeTheRecipe() {
  try {
    isLiked.value = false;
    const userId = store.state.auth.userLogin.userId;
    await store.dispatch("recipe/disLike", { id: route.params.id, userId });
  } catch (error) {
    console.log(error);
  }
}
</script>
