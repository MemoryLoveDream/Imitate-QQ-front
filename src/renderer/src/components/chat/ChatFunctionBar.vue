<script setup>
import { inject, onBeforeMount } from 'vue'
import StatefulButton from '../base/StatefulButton.vue'
import { chatFunctionBarIcons } from '../../constants/assets'

const props = defineProps({ chatter: Object })
const clickFunctions = [
  () => {},
  () => {
    window.api.createWindow(
      'video_call',
      700,
      680,
      `/video_call/${inject('userId').value}/${props.chatter.id}`
    )
  },
  () => {}
]

onBeforeMount(() => {
  chatFunctionBarIcons.forEach((icon, index) => {
    icon.click = clickFunctions[index]
  })
})
</script>

<template>
  <div class="chat-function-bar">
    <div class="nickname">
      {{ props.chatter.name ?? props.chatter.nickname }}
    </div>
    <StatefulButton
      v-for="(icon, index) in chatFunctionBarIcons"
      :key="index"
      class="icon"
      :urls="icon"
      tip
      hover-effect="icon"
    />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.chat-function-bar {
  display: flex;
  justify-content: end;
}

.nickname {
  position: absolute;
  top: 35px;
  left: 18px;
  font-size: 16px;
  color: black;
}

.icon {
  position: relative;
  width: 40px;
  height: 40px;
  top: 30px;
}
</style>
