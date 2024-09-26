<script setup>
import { CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({ name: { type: String, default: 'main' } })
const close_color = ref('#333')

function close() {
  window.api.quit(props.name)
}

function mouseOver() {
  close_color.value = 'white'
}

function mouseOut() {
  close_color.value = '#333'
}
</script>

<template>
  <div class="close" @click="close" @mouseover="mouseOver" @mouseout="mouseOut">
    <el-icon class="icon" :color="close_color">
      <CloseBold />
    </el-icon>
  </div>
</template>

<style scoped lang="less">
.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 25px;
  background-color: transparent;
  border-width: 0;
  :hover {
    background-color: red;
  }
}

.icon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  padding: 15%;
  transform: translate(-50%, -50%);
}
</style>
