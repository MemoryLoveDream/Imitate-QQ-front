<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  icon: String,
  text: String,
  iconRatio: { type: Number, default: 80 },
  left: { type: Number, default: 30 },
  textStyle: String
})
const imgRef = ref()
const textRef = ref()

onMounted(() => {
  imgRef.value.style.height = `${props.iconRatio}%`
  textRef.value.style.left = `${props.left}px`
})
</script>

<template>
  <div class="container">
    <img ref="imgRef" :src="props.icon" alt="" />
    <div ref="textRef" class="text" :style="props.textStyle">{{ props.text }}</div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

img {
  .vertical-center();
  height: 80%;
  width: auto;
}

.text {
  .vertical-center();
  left: 30px;
  color: black;
}
</style>
