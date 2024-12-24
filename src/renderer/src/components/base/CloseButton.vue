<script setup>
import { CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({ control: { type: String, default: 'main' } })
const iconColor = ref('#333')

function close() {
  window.api.close(props.control)
}
</script>

<template>
  <div class="close" @click="close" @mouseover="iconColor = 'white'" @mouseout="iconColor = '#333'">
    <el-icon class="icon" :color="iconColor">
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
