<script setup>
import { inject, onMounted, ref } from 'vue'
import { ChatType, RelationshipType } from '../../constants/enums'
import api from '../../service/api'
import { Icon } from '../../constants/assets'
import { chatFormat } from '../../utils/date'

const props = defineProps({ chat: Object })
const chatClass = ref('')
const timeClass = ref('')
const textClass = ref('')
const timeVisible = ref(false)
let timer

function showTime() {
  timer = setTimeout(() => {
    timeVisible.value = true
  }, 1000)
}

function hiddenTime() {
  clearTimeout(timer)
  timeVisible.value = false
}

onMounted(() => {
  if (props.chat.senderId === inject('userId').value) {
    chatClass.value = 'my-chat'
    timeClass.value = 'my-time'
    textClass.value = 'my-text'
  } else {
    chatClass.value = 'chat'
    timeClass.value = 'time'
    textClass.value = 'text'
  }
})
</script>

<template>
  <div>
<!--    <div class="time">{{ props.chat.sendTime }}</div>-->
    <div :class="chatClass">
      <el-avatar
        class="avatar"
        :size="30"
        :src="api.getAvatarPath(RelationshipType.FRIEND, props.chat.senderId)"
      />
      <div v-if="timeVisible" :class="timeClass">{{ chatFormat(props.chat.sendTime) }}</div>
      <div
        v-if="props.chat.chatType === ChatType.TEXT"
        :class="textClass"
        @mouseover="showTime"
        @mouseout="hiddenTime"
      >
        {{ props.chat.content }}
      </div>
      <img
        v-else-if="props.chat.chatType === ChatType.PICTURE"
        class="picture"
        alt="content"
        :src="props.chat.content"
        @mouseover="showTime"
        @mouseout="hiddenTime"
      />
      <div
        v-else-if="props.chat.chatType === ChatType.FILE"
        class="file"
        @mouseover="showTime"
        @mouseout="hiddenTime"
      >
        <div class="name" :title="props.chat.content.name">{{ props.chat.content.name }}</div>
        <img class="icon" :src="Icon.Txt" alt="" />
        <div class="size">{{ props.chat.content.size }}B</div>
        <div class="size">7天后过期</div>
      </div>
      <div
        v-else-if="props.chat.chatType === ChatType.VOICE"
        class="file"
        @mouseover="showTime"
        @mouseout="hiddenTime"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.chat {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  display: flex;
  justify-content: start;
}

.my-chat {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
}

.avatar {
  margin: 20px 10px;
}

.time {
  position: absolute;
  top: 3px;
  left: 63px;
  font-size: 11px;
}

.my-time {
  position: absolute;
  top: 3px;
  right: 63px;
  font-size: 11px;
}

.box {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 7px;
}

.text {
  .box();
  max-width: 80%;
  background-color: white;
  padding: 8px;
  color: black;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.my-text {
  .box();
  max-width: 80%;
  background-color: dodgerblue;
  padding: 8px;
  color: white;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.picture {
  .box();
  max-width: 300px;
}

.file {
  position: relative;
  .box();
  border-radius: 5px;
  width: 220px;
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: start;

  .name {
    position: absolute;
    max-width: 70%;
    top: 10px;
    left: 10px;
    color: black;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    text-align: center;
  }

  .icon {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 40px;
    height: 40px;
  }

  .size {
    position: relative;
    margin-left: 10px;
    top: 60px;
    font-size: 12px;
  }
}
</style>
