<script setup>
import { Minus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import CloseButton from './CloseButton.vue'

const props = defineProps({ control: { type: String, default: 'main' } })
const max = ref(false)
const url = ref('/src/assets/pic/window_buttons/rectangle-small.svg')

function minimize() {
  window.api.minimize(props.control)
}

function maximize() {
  if (max.value === false) {
    window.api.maximize(props.control)
    url.value = '/src/assets/pic/window_buttons/copy.svg'
    max.value = true
  } else {
    window.api.unmaximize(props.control)
    url.value = '/src/assets/pic/window_buttons/rectangle-small.svg'
    max.value = false
  }
}
</script>

<template>
  <div class="window-buttons">
    <div class="top-area-drag"></div>
    <div class="minimize" @click="minimize">
      <el-icon class="icon" color="#333">
        <Minus />
      </el-icon>
    </div>
    <div class="maximize" @click="maximize">
      <img class="icon" :src="url" alt="" />
    </div>
    <CloseButton :control="props.control" />
  </div>
</template>

<style scoped lang="less">
.window-buttons {
  position: absolute;
  width: 100%;
  height: 25px;
  top: 0;
}

.drag {
  position: absolute;
  width: calc(100% - 96px);
  height: 25px;
  top: 0;
  left: 0;
  background-color: blue;
  -webkit-app-region: drag;
}

.maximize {
  position: absolute;
  top: 0;
  right: 32px;
  width: 32px;
  height: 25px;
  user-select: none;
  :hover {
    background-color: #eeeeee;
  }
}

.icon {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 15%;
}

.minimize {
  position: absolute;
  top: 0;
  right: 64px;
  width: 32px;
  height: 25px;
  :hover {
    background-color: #eeeeee;
  }
}
</style>
