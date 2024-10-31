<script setup>
import { CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({ control: { type: String, default: 'main' } })
const close_color = ref('#333')

function close() {
  window.api.close(props.control)
}

function mouseover() {
  close_color.value = 'white'
}

function mouseout() {
  close_color.value = '#333'
}
</script>

<template>
  <div class="close" @click="close" @mouseover="mouseover" @mouseout="mouseout">
    <el-icon class="icon" :color="close_color">
      <CloseBold />
    </el-icon>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 25px;
  :hover {
    background-color: red;
  }
}

.icon {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 15%;
}
</style>
