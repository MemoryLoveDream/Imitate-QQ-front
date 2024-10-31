<script setup>
import WindowButtons from '../components/base/WindowButtons.vue'
</script>

<template>
  <div class="short-video">
    <WindowButtons control="video" class="window-buttons" />
    <video class="video" src="E:/铭冥/2023/冬日散步.mp4" autoplay></video>
  </div>
</template>

<style scoped lang="less">
@import '../assets/css/base';

.short-video {
  .container();
}

.window-buttons {
  background-color: black;
}

.video {
  position: absolute;
  top: 25px;
  height: calc(100% - 25px);
  width: auto;
  left: 50%;
  transform: translateX(-50%);
}
</style>
