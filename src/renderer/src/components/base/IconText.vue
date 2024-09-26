<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  url: String,
  text: String,
  size: {
    type: Array,
    default() {
      return [20, 60, 10]
    }
  },
  textStyle: String
})
const container = ref()
const img = ref()
const content = ref()

onMounted(() => {
  container.value.style.height = props.size[0] + 'px'
  container.value.style.width = props.size[1] + 'px'
  img.value.style.height = props.size[0] + 'px'
  img.value.style.width = props.size[0] + 'px'
  content.value.style.left = props.size[0] + props.size[2] + 'px'
})
</script>

<template>
  <div ref="container" class="container">
    <img ref="img" :src="props.url" alt="" />
    <div ref="content" class="text" :style="props.textStyle">{{ props.text }}</div>
  </div>
</template>

<style scoped lang="less">
.container {
  position: absolute;
}

img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
}

.text {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 30px;
  color: black;
}
</style>
