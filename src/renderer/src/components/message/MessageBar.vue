<script setup>
import { ref, watch } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import Message from './Message.vue'
import router from '../../router'
import { useComponentsStore } from '../../store/components'
import { useRelationshipStore } from '../../store/relationship'

const relationshipStore = useRelationshipStore()
const components = useComponentsStore()

const text = ref('')
const messagesRef = ref([])
const selected = ref(-1)

watch(selected, () => router.replace('/main/two/message'), { once: true })

function afterSelect(n, type, id) {
  relationshipStore.addInfo(type, id, () => {
    relationshipStore.changeChatterUid(type, id)
    if (selected.value !== n) {
      if (selected.value !== -1) {
        messagesRef.value[selected.value].setInactive()
        // router.replace('/main/two/message')
        components.refreshChatHistory()
      }
      selected.value = n
    }
  })
}
</script>

<template class="container">
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
</template>

<style scoped lang="less">
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
