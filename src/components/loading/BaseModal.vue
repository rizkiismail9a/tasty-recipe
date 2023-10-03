<template>
  <Teleport to="#modal">
    <Transition name="modal-container">
      <div class="modal__container d-flex position-fixed top-0 start-0 w-100 justify-content-center align-items-start">
        <Transition name="modal-content">
          <div class="modal__content">
            <slot></slot>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup></script>

<style scoped>
.modal__container {
  min-height: 100vh;
  z-index: 999;
}
.modal__content {
  max-width: 768px;
  padding: 14px;
  margin: 32px auto;
}
.modal-container-enter-active,
.modal-container-leave-active {
  transition: all 0.5s;
}
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.5s 0.15s;
}
.modal-container-enter-from,
.modal-content-enter-from {
  opacity: 0;
}
.modal-container-leave-to {
  opacity: 0;
}
.modal-content-enter-from {
  transform: translateY(300px);
}
.modal-content-leave-to {
  opacity: 0;
  transform: translateY(300px);
}
</style>
