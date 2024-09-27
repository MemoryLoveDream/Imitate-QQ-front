<script setup>
import WindowButtons from '../../components/base/WindowButtons.vue'
import ChatFunctionBar from '../../components/chat/ChatFunctionBar.vue'
import ChatDetails from '../../components/chat/ChatDetails.vue'
import ChatInput from '../../components/chat/ChatInput.vue'
import { onMounted, ref } from 'vue'
import { useComponentsStore } from '../../store/components'

const componentsStore = useComponentsStore()
const chatDetails = ref()

onMounted(() => {
  componentsStore.chatDetails = chatDetails.value
})
</script>

<template>
  <div class="message-block">
    <ChatFunctionBar />
    <ChatDetails ref="chatDetails" />
    <ChatInput />
    <WindowButtons />
  </div>
</template>

<style scoped lang="less">
.message-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}
</style>
