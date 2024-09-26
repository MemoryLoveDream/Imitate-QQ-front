<script setup>
import WindowButtons from '../../components/base/WindowButtons.vue'
</script>

<template>
  <div class="none-block">
    <img src="/src/assets/pic/background/none.svg" alt="" draggable="false" />
    <WindowButtons />
  </div>
</template>

<style scoped lang="less">
.none-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  -webkit-user-select: none;
}

img {
  position: absolute;
  width: 40%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
