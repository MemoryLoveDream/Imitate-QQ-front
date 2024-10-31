<script setup>
import { ref, watch } from 'vue'
import Chat from './Chat.vue'

const props = defineProps({ history: Object })
const scrollbar = ref()
const inner = ref()
const n = ref(0)

watch(
  props.history,
  () => {
    scrollToBottom()
  },
  { immediate: true }
)

function scrollToBottom() {
  setTimeout(() => {
    let h = inner.value.clientHeight
    scrollbar.value.setScrollTop(h)
  }, 100)
}

function refresh() {
  n.value++
  scrollToBottom()
}

defineExpose({ refresh })
</script>

<template>
  <div class="chat-details">
    <el-scrollbar ref="scrollbar">
      <div ref="inner" :key="n">
        <Chat v-for="(chat, index) in props.history" :key="index" class="row" :chat="chat" />
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="less">
.chat-details {
  position: absolute;
  top: 70px;
  height: calc(100% - 270px);
  width: 100%;
  background-color: transparent;
}

.row {
  position: relative;
  width: 100%;
}
</style>
