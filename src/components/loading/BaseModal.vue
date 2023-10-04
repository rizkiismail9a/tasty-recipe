<template>
  <Teleport to="#modal">
    <div class="modal__container d-flex position-fixed top-0 start-0 w-100 justify-content-center align-items-start">
      <Transition>
        <div class="modal__content">
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup></script>

<style scoped>
.modal__container {
  min-height: 100vh;
}
.modal__content {
  max-width: 768px;
  padding: 14px;
  margin: 100px auto;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
