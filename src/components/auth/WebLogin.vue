<template>
  <base-modal v-if="errorMsg">
    <div class="alert alert-danger" role="alert">{{ errorMsg }}</div>
  </base-modal>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff; width: 400px min-height: 100vh;" class="p-5 m-auto login-form">
      <div class="text-center">
        <img src="../../assets/images/logo.png" alt="Logo" />
        <h2 class="mt-4">Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>
      <form @submit.prevent="login">
        <div class="my-4">
          <BaseInput type="email" identity="email" placeholder="your registered email" label="Email" v-model="loginData.email" />
        </div>
        <div class="my-4">
          <BaseInput type="password" identity="password" placeholder="Create New Password" label="Password" v-model="loginData.password" />
        </div>
        <base-button class="w-100 login my-3"> Login </base-button>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don’t have an account?<span style="color: #4c4ddc"> <router-link to="/signup" class="text-decoration-none"> Signup</router-link></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseModal from "../loading/BaseModal.vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const errorMsg = ref(null);
const store = useStore();
const router = useRouter();
const loginData = reactive({
  email: "",
  password: "",
});

async function login() {
  if (!loginData.password || !loginData.email) {
    errorMsg.value = "Please, fill the form correctly";
    return setTimeout(() => {
      errorMsg.value = null;
    }, 3000);
  }
  try {
    await store.dispatch("auth/getLoginData", loginData);
    router.push("/");
  } catch (error) {
    errorMsg.value = error;
    setTimeout(() => {
      errorMsg.value = null;
    }, 3000);
  }
}
</script>
