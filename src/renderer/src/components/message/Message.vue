<script setup>
import { ref, watch } from 'vue'
import { dateFormat } from '../../utils/date'

const props = defineProps({ n: Number, message: Object })
const emit = defineEmits(['after-select'])

const message_class = ref('message')
const nickname_class = ref('nickname')
const date_class = ref('date')
const latest_message_class = ref('latest_message')
const status = ref('inactive')
const unread = ref(props.message.unread)

watch(status, (value) => {
  if (value === 'active') {
    message_class.value = 'message_active'
    nickname_class.value = 'nickname_active'
    date_class.value = 'date_active'
    latest_message_class.value = 'latest_message_active'
    unread.value = 0
  } else if (value === 'hover') {
    message_class.value = 'message_hover'
    nickname_class.value = 'nickname'
    date_class.value = 'date'
    latest_message_class.value = 'latest_message'
  } else {
    message_class.value = 'message'
    nickname_class.value = 'nickname'
    date_class.value = 'date'
    latest_message_class.value = 'latest_message'
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
    emit('after-select', props.n, props.message.messageType, props.message.senderId)
}

defineExpose({ setIsActive })
</script>

<template>
  <el-badge class="message" :value="unread" :max="99" :show-zero="false" :offset="[-20, 50]">
    <div
      :class="message_class"
      @mouseover="mouseOver"
      @mouseout="mouseOut"
      @click="setIsActive('active')"
    >
      <el-avatar class="head" :size="40" :src="props.message.headUrl" />
      <div id="nickname_id" :class="nickname_class">
        {{ props.message.nickname }}
      </div>
      <div id="date_id" :class="date_class">{{ dateFormat(props.message?.sendTime) }}</div>
      <div id="latest_message_id" :class="latest_message_class">
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

.latest_message {
  position: absolute;
  bottom: 17px;
  left: 60px;
  font-size: 12px;
  color: #888;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.latest_message_active {
  .latest_message();
  color: white;
}
</style>
