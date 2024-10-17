<script setup>
import HoverableIcon from '../base/HoverableIcon.vue'
import { reactive } from 'vue'
import { useRelationshipStore } from '../../store/relationship'

const relationshipStore = useRelationshipStore()
const icons = reactive([
  {
    name: 'more',
    inactive_url: '/src/assets/pic/chat_function_bar/more.svg',
    hover_url: '/src/assets/pic/chat_function_bar/more_hover.svg'
  },
  {
    name: 'video_call',
    inactive_url: '/src/assets/pic/chat_function_bar/video_call.svg',
    hover_url: '/src/assets/pic/chat_function_bar/video_call_hover.svg',
    click: () => {
      window.api.createChild('video_call', 700, 680, '/video_call')
    }
  },
  {
    name: 'voice_call',
    inactive_url: '/src/assets/pic/chat_function_bar/voice_call.svg',
    hover_url: '/src/assets/pic/chat_function_bar/voice_call_hover.svg'
  }
])
</script>

<template>
  <div class="chat-function-bar">
    <div class="nickname">
      {{ relationshipStore.chatter.name ?? relationshipStore.chatter.nickname }}
    </div>
    <div class="icons">
      <HoverableIcon v-for="icon in icons" :key="icon.name" class="icon" :urls="icon" />
    </div>
    <div class="divider"></div>
  </div>
</template>

<style scoped lang="less">
.chat-function-bar {
  position: absolute;
  height: 70px;
  width: 100%;
  background-color: transparent;
  user-select: none;
}

.nickname {
  position: absolute;
  top: 35px;
  left: 18px;
  font-size: 16px;
  color: black;
}

.icons {
  position: absolute;
  top: 30px;
  right: 0;
  height: 30px;
  width: 50%;
  background-color: transparent;
}

.icon {
  position: relative;
  float: right;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 15px;
}

.divider {
  position: absolute;
  top: 69px;
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}
</style>
