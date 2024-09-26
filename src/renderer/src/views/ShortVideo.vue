<script setup>
import WindowButtons from '../components/base/WindowButtons.vue'
</script>

<template>
  <div class="short-video">
    <div class="header-bar"><WindowButtons name="video" /></div>
    <video class="video" src="E:/铭冥/2023/冬日散步.mp4" autoplay>

    </video>
  </div>
</template>

<style scoped lang="less">
.short-video {
  width: 100%;
  height: 100%;
}

.header-bar {
  position: absolute;
  top: 0;
  width: 100%;
  height: 25px;
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
