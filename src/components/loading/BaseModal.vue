<template>
  <Teleport to="#modal">
    <div class="modal__container">
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup></script>

<style scoped>
.modal__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(105, 105, 105, 0.349);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  z-index: 999;
}
.modal__content {
  background-color: #fff;
  max-width: 768px;
  padding: 14px;
  margin: 32px auto;
}
</style>
