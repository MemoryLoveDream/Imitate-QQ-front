<script setup>
import { onMounted, ref } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import Message from '../../components/card/Message.vue'
import { useRoute, useRouter } from 'vue-router'
import { useComponentsStore } from '../../store/components'
import { useRelationshipStore } from '../../store/relationship'
import { MessageType } from '../../constants/enums'
import { messageBarIcons } from '../../constants/assets'
import IconText from '../../components/base/IconText.vue'
import apis from "../../services/apis";

const rs = useRelationshipStore()
const cs = useComponentsStore()
const router = useRouter()
const route = useRoute()
const text = ref('')
const messagesRef = ref([])
const selected = ref(-1)
const frame = ref()
const frameVisible = ref(false)

async function afterSelect(n, type, id) {
  await rs.changeChatterUid(type, id)
  if (type === MessageType.PERSON) await router.replace('/main/two/message_person/none')
  else await router.replace('/main/two/message_group/none')
  if (selected.value !== n) {
    if (selected.value !== -1) {
      messagesRef.value[selected.value].setIsActive('inactive')
      cs.refreshChatHistory()
    }
    rs.messageList[n].unread = 0
    selected.value = n
  }
}

function rightClick(event) {
  let x = event.clientX
  let y = event.clientY
  let width = document.documentElement.clientWidth
  let height = document.documentElement.clientHeight
  if (x + 180 <= width) {
    frame.value.style.left = `${x}px`
  } else {
    frame.value.style.left = `${x - 180}px`
  }
  if (y + 215 <= height) {
    frame.value.style.top = `${y}px`
  } else {
    frame.value.style.top = `${height - 215}px`
  }
  frameVisible.value = true
}

function setMessageActive(index) {
  selected.value = index
  messagesRef.value[index].setIsActive('active')
  rs.messageList[index].unread = 0
}

defineExpose({ setMessageActive })

onMounted(() => {
  if (route.params.index !== 'none' && route.params.index !== undefined)
    setMessageActive(Number(route.params.index))
  document.onmouseup = () => {
    frameVisible.value = false
  }
  // apis.upload()
})
</script>

<template>
  <div class="message-bar">
    <el-input v-model="text" class="input" placeholder="搜索" :prefix-icon="Search"></el-input>
    <el-button class="plus" color="whitesmoke">
      <el-icon><Plus /></el-icon>
    </el-button>
    <div class="messages">
      <Message
        v-for="(message, index) in rs.messageList"
        ref="messagesRef"
        :key="index"
        :n="index"
        :message="message"
        class="message"
        @after-click="afterSelect"
        @right-click="rightClick"
      />
    </div>
    <div v-show="frameVisible" ref="frame" class="frame">
      <div v-for="(icon, index) in messageBarIcons" :key="index" class="shadow">
        <IconText class="item" :icon="icon.icon" :text="icon.text" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.message-bar {
  .container();
  background-color: white;
}

.input {
  position: absolute;
  top: 25px;
  left: 15px;
  max-width: 250px;
  width: 250px;
  user-select: none;
}

.plus {
  position: absolute;
  top: 25px;
  right: 15px;
  width: 30px;
  height: 30px;
}

.messages {
  position: absolute;
  top: 70px;
  left: 0;
}

.message {
  position: relative;
}

.frame {
  position: fixed;
  width: 180px;
  height: 215px;
  top: 320px;
  left: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #aaa;
  color: black;
  padding: 2.5px;
  z-index: 4;

  .shadow {
    position: relative;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    padding-left: 7.5px;
    padding-right: 7.5px;
  }

  .shadow:hover {
    .shadow();
    background-color: #eeeeee;
  }

  .item {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 20px;
  }
}
</style>
