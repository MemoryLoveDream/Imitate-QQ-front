<script setup>
import ChatInput from '../../components/chat/ChatInput.vue'
import { inject, onBeforeMount, ref, watch } from 'vue'
import { useRelationshipStore } from '../../store/relationship'
import StatefulButton from '../../components/base/StatefulButton.vue'
import { StatefulIcon } from '../../constants/assets'
import Chat from '../../components/chat/Chat.vue'

const rs = useRelationshipStore()
const scrollbar = ref()
const inner = ref()
const refreshKey = ref(0)

const clickFunctions = [
  () => {},
  () => {
    window.api.createWindow(
      'video_call',
      700,
      680,
      `/video_call/${inject('userId').value}/${rs.chatter.id}`
    )
  },
  () => {}
]

watch(
  () => rs.chatter.id,
  () => {
    refreshKey.value++
    scrollToBottom()
  }
)

watch(
  () => rs.chatter.history.chats,
  () => {
    scrollToBottom()
  },
  { immediate: true, deep: true }
)

function scrollToBottom() {
  setTimeout(() => {
    let h = inner.value.clientHeight
    scrollbar.value.setScrollTop(h)
  }, 100)
}

onBeforeMount(() => {
  StatefulIcon.ChatFunctionBar.forEach((icon, index) => {
    icon.click = clickFunctions[index]
  })
})
</script>

<template>
  <div class="message-block">
    <!--    ChatFunctionBar  -->
    <div class="chat-function-bar">
      <div class="nickname">{{ rs.chatter.info.nickname }}</div>
      <StatefulButton
        v-for="(icon, index) in StatefulIcon.ChatFunctionBar"
        :key="index"
        class="icon"
        :paths="icon"
        tip
        hover-effect="icon"
      />
    </div>
    <!--    Divider  -->
    <div class="divider1"></div>
    <!--    ChatDetails  -->
    <div class="chat-details">
      <el-scrollbar ref="scrollbar">
        <div ref="inner" :key="refreshKey">
          <Chat
            v-for="(chat, index) in rs.chatter.history.chats"
            :key="index"
            class="row"
            :chat="chat"
          />
        </div>
      </el-scrollbar>
    </div>
    <!--    Divider  -->
    <div class="divider2"></div>
    <!--    ChatInput  -->
    <ChatInput class="chat-input" />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.message-block {
  .container();
  .user-cannot-select();
  background-color: whitesmoke;
}

.chat-function-bar {
  position: absolute;
  width: 100%;
  height: 70px;
  .user-cannot-select();
  display: flex;
  justify-content: end;

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
}

.divider {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}

.divider1 {
  .divider();
  top: 70px;
}

.chat-details {
  position: absolute;
  top: 70px;
  height: calc(100% - 270px);
  width: 100%;

  .row {
    position: relative;
    width: 100%;
  }
}

.divider2 {
  .divider();
  top: calc(100% - 201px);
}

.chat-input {
  position: absolute;
  bottom: 0;
  height: 200px;
  width: 100%;
}
</style>
