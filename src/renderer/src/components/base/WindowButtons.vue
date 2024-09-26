<script setup>
import { Minus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import CloseButton from './CloseButton.vue'

const props = defineProps({ name: { type: String, default: 'main' } })
const max = ref(false)
const url = ref('/src/assets/pic/window_buttons/rectangle-small.svg')

function minimize() {
  window.api.minimize(props.name)
}

function maximize() {
  if (max.value === false) {
    window.api.maximize(props.name)
    url.value = '/src/assets/pic/window_buttons/copy.svg'
    max.value = true
  } else {
    window.api.unmaximize(props.name)
    url.value = '/src/assets/pic/window_buttons/rectangle-small.svg'
    max.value = false
  }
}
</script>

<template>
  <div class="minimize" @click="minimize">
    <el-icon class="icon" color="#333">
      <Minus />
    </el-icon>
  </div>
  <div class="maximize" @click="maximize">
    <img class="svg" :src="url" alt="" />
  </div>
  <CloseButton :name="props.name" />
</template>

<style scoped lang="less">
.maximize {
  position: absolute;
  top: 0;
  right: 32px;
  width: 32px;
  height: 25px;
  background-color: transparent;
  user-select: none;
  :hover {
    background-color: #eeeeee;
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

.minimize {
  position: absolute;
  top: 0;
  right: 64px;
  width: 32px;
  height: 25px;
  background-color: transparent;
  :hover {
    background-color: #eeeeee;
  }
}

.svg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  padding: 15%;
  transform: translate(-50%, -50%);
}
</style>
