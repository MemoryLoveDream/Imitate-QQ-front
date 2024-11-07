<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  icon: String,
  text: String,
  iconRatio: { type: Number, default: 80 },
  left: { type: Number, default: 30 },
  textStyle: String
})

const img = ref()
const content = ref()

onMounted(() => {
  img.value.style.height = `${props.iconRatio}%`
  content.value.style.left = `${props.left}px`
})
</script>

<template>
  <div class="container">
    <img ref="img" :src="props.icon" alt="" />
    <div ref="content" class="text" :style="props.textStyle">{{ props.text }}</div>
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
