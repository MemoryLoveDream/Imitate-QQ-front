<script setup>
import { ref, watch } from 'vue'
import { dateFormat } from '../../utils/date'

const props = defineProps({ n: Number, message: Object })
const emit = defineEmits(['after-click', 'right-click'])

const message_class = ref('message')
const nickname_class = ref('nickname')
const date_class = ref('date')
const content_class = ref('content')
const status = ref('inactive')

watch(status, (value) => {
  if (value === 'active') {
    message_class.value = 'message_active'
    nickname_class.value = 'nickname_active'
    date_class.value = 'date_active'
    content_class.value = 'content_active'
  } else if (value === 'hover') {
    message_class.value = 'message_hover'
    nickname_class.value = 'nickname'
    date_class.value = 'date'
    content_class.value = 'content'
  } else {
    message_class.value = 'message'
    nickname_class.value = 'nickname'
    date_class.value = 'date'
    content_class.value = 'content'
  }
})

function mouseOver() {
  if (status.value === 'inactive') status.value = 'hover'
}

function mouseOut() {
  if (status.value === 'hover') status.value = 'inactive'
}

function setIsActive(status1) {
  status.value = status1
  if (status1 === 'active')
    emit('after-click', props.n, props.message.messageType, props.message.id)
}

function rightClick(event) {
  emit('right-click', event)
}

defineExpose({ setIsActive })
</script>

<template>
  <el-badge
    class="message"
    :value="props.message.unread"
    :max="99"
    :show-zero="false"
    :offset="[-20, 50]"
  >
    <div
      :class="message_class"
      @mouseover="mouseOver"
      @mouseout="mouseOut"
      @click="setIsActive('active')"
      @click.right="rightClick"
    >
      <el-avatar class="head" :size="40" :src="props.message.headUrl" />
      <div :class="nickname_class">
        {{ props.message.nickname }}
      </div>
      <div :class="date_class">{{ dateFormat(props.message?.sendTime) }}</div>
      <div :class="content_class">
        {{ props.message?.content }}
      </div>
    </div>
  </el-badge>
</template>

<style scoped lang="less">
.message {
  position: absolute;
  width: 330px;
  height: 70px;
  background-color: transparent;
  user-select: none;
}

.message_hover {
  .message();
  background-color: whitesmoke;
}

.message_active {
  .message();
  background-color: #0099ff;
}

.head {
  position: absolute;
  top: 15px;
  left: 15px;
}

.nickname {
  position: absolute;
  top: 15px;
  left: 60px;
  font-size: 14px;
  color: black;
}

.nickname_active {
  .nickname();
  color: white;
}

.date {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 10px;
  color: black;
}

.date_active {
  .date();
  color: white;
}

.content {
  position: absolute;
  bottom: 14px;
  left: 60px;
  font-size: 12px;
  color: #888;
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.content_active {
  .content();
  color: white;
}
</style>
