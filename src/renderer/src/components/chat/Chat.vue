<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../store/user'
import { ChatType } from '../../store/constants'

const userStore = useUserStore()
const props = defineProps({ chat: Object })

const head = ref('')
const text = ref('')
const picture = ref('')

onMounted(() => {
  if (props.chat.senderId === userStore.currentUser.id) {
    head.value = 'head1'
    text.value = 'text1'
    picture.value = 'picture1'
  } else {
    head.value = 'head'
    text.value = 'text'
    picture.value = 'picture'
  }
})
</script>

<template>
  <div class="chat">
    <el-avatar :class="head" :size="30" :src="props.chat.headUrl" />
    <div v-if="props.chat.chatType === ChatType.TEXT" :class="text">{{ props.chat.content }}</div>
    <img
      v-else-if="props.chat.chatType === ChatType.PICTURE"
      :class="picture"
      alt="content"
      :src="props.chat.content"
    />
    <div class="clear"></div>
  </div>
</template>

<style scoped lang="less">
.chat {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}

.head {
  margin: 20px 10px;
  float: left;
}

.head1 {
  margin: 20px 10px;
  float: right;
}

.box {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.text {
  .box();
  float: left;
  max-width: 80%;
  background-color: white;
  padding: 8px;
  color: black;
}

.text1 {
  .box();
  float: right;
  max-width: 80%;
  background-color: dodgerblue;
  padding: 8px;
  color: white;
}

.picture {
  .box();
  float: left;
  max-width: 300px;
}

.picture1 {
  .box();
  float: right;
  max-width: 300px;
}

.clear:after {
  content: '';
  height: 0;
  width: 0;
  clear: both;
  display: block;
}
</style>
