<script setup>
import WindowButtons from '../../components/base/WindowButtons.vue'
import ChatFunctionBar from '../../components/chat/ChatFunctionBar.vue'
import ChatDetails from '../../components/chat/ChatDetails.vue'
import ChatInput from '../../components/chat/ChatInput.vue'
import { onMounted, ref } from 'vue'
import { useStatusStore } from '../../store/components'

const status = useStatusStore()
const chat_details = ref()

onMounted(() => {
  status.chat_details = chat_details.value
})
</script>

<template>
  <div class="message-block">
    <ChatFunctionBar />
    <ChatDetails ref="chat_details" />
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
