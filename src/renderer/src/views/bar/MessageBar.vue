<script setup>
import { onMounted, ref } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import Message from '../../components/card/Message.vue'
import { useRoute, useRouter } from 'vue-router'
import { useComponentsStore } from '../../store/components'
import { useRelationshipStore } from '../../store/relationship'
import { MessageType } from '../../constants/enums'

const relationshipStore = useRelationshipStore()
const componentsStore = useComponentsStore()
const router = useRouter()
const route = useRoute()
const text = ref('')
const messagesRef = ref([])
const selected = ref(-1)

async function afterSelect(n, type, id) {
  await relationshipStore.changeChatterUid(type, id)
  if (type === MessageType.PERSON) await router.replace('/main/two/message_person/none')
  else await router.replace('/main/two/message_group/none')
  if (selected.value !== n) {
    if (selected.value !== -1) {
      messagesRef.value[selected.value].setIsActive('inactive')
      relationshipStore.messageList[n].unread = 0

      componentsStore.refreshChatHistory()
    }

    selected.value = n
  }
}

function setMessageActive(index) {
  selected.value = index
  messagesRef.value[index].setIsActive('active')
}

defineExpose({ setMessageActive })

onMounted(() => {
  if (route.params.index !== 'none' && route.params.index !== undefined)
    setMessageActive(Number(route.params.index))
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
        v-for="(message, index) in relationshipStore.messageList"
        ref="messagesRef"
        :key="index"
        :n="index"
        :message="message"
        class="message"
        @after-select="afterSelect"
      />
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
</style>
