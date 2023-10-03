<template>
  <div class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none" style="text-align: right">
    <i class="fa-solid fa-user" style="color: #4c4ddc"></i>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"> My Profile </a>
        <ul class="dropdown-menu">
          <li class="dropdown-item"><router-link to="/user/personal-info" class="text-decoration-none text-black">My Profile</router-link></li>
          <li class="dropdown-item"><router-link to="/user/favorite-recipe" class="text-decoration-none text-black">Favorited Recipes</router-link></li>
          <li class="dropdown-item"><router-link to="/user/user-recipe" class="text-decoration-none text-black">My Recipe</router-link></li>
          <li><hr class="dropdown-divider" /></li>
          <li class="w-75 mx-2 btn btn-danger" @click="logout">Logout</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
async function logout() {
  store.commit("auth/clearLoginData");
  router.push("/");
}
</script>
