<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
      <div class="text-center">
        <img src="../../assets/images/logo.png" alt="Logo" />
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>
      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6">
            <BaseInput type="text" identity="firstname" placeholder="Ex: Dudung" label="Firstname" v-model="signupData.firstname" />
          </div>
          <div class="col-md-6">
            <BaseInput type="text" identity="lastname" placeholder="Ex: Sarudung" label="Lastname" v-model="signupData.lastname" />
          </div>
        </div>
        <div class="my-4">
          <BaseInput type="text" identity="username" placeholder="Your username" label="Username" v-model="signupData.username" />
        </div>
        <div class="my-4">
          <BaseInput type="email" identity="email" placeholder="Ex: dudung@mail.com" label="Email" v-model="signupData.email" />
        </div>
        <div class="my-4">
          <BaseInput type="password" identity="password" placeholder="Create New Password" label="Password" @keyInput="passwordCheck" v-model="signupData.password" />
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: passwordStatusDisplay }">The password field must be at least 8 characters</p>
        </div>
        <div class="my-4">
          <BaseInput type="password" identity="password" placeholder="Write Again Your Password" label="Confirmation Password" @keyInput="passwordConfirmCheck" v-model="signupData.confirmationPassword" />
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: passwordConfirmStatus }">Password confirmation doesn't match</p>
        </div>
        <!-- Profile photo -->
        <div class="my-4">
          <base-input type="file" identity="recipeImage" label="Profile Photo" isImage="true" @input="checkImage">
            <div>
              <div class="border p-1 mt-2 rounded-circle">
                <img v-if="!signupData.imageLink" src="../../assets/images/user.png" alt="Picture by GhoneamArt" class="rounded-circle" width="140" height="150" style="object-fit: cover" />
                <img v-else :src="signupData.imageLink" alt="Picture by GhoneamArt" class="rounded-circle" width="140" height="150" style="object-fit: cover" />
              </div>
              <div class="text-center" style="transform: translateY(-24px)">
                <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
              </div>
            </div>
          </base-input>
        </div>

        <base-button class="w-100 login my-3"> Register </base-button>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?<span style="color: #4c4ddc"><router-link to="/login" class="text-decoration-none"> Login</router-link></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const passwordStatusDisplay = ref("none");
const passwordConfirmStatus = ref("none");
const signupData = reactive({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  // isLogin: false,
  imageLink: "",
});
const passwordCheck = () => {
  // signupData.password = data;
  if (signupData.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
};
const passwordConfirmCheck = () => {
  // signupData.confirmationPassword = data;
  if (signupData.confirmationPassword !== signupData.password) {
    passwordConfirmStatus.value = "block";
  } else {
    passwordConfirmStatus.value = "none";
  }
};
const checkImage = (e) => {
  let image = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  });

  // atau, namun, cara di bawah membuat gambar hanya bisa diakses sementara

  // let link = URL.createObjectURL(image);
  // return (signupData.imageLink = link);
};

async function register() {
  if (signupData.password !== signupData.confirmationPassword || signupData.password.length < 8) {
    signupData.confirmationPassword = "";
    signupData.password = "";
    confirmPasswordDoesNotMacth.value = "none";
    confirmPasswordMacth.value = "none";
    return alert("Please fill the form correctly :)");
  }
  try {
    await store.dispatch("auth/getRegData", signupData);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
}
</script>
