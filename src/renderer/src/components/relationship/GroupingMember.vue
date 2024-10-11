<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ code: Object, info: Object })
const emit = defineEmits(['after-select'])

const message_class = ref('message')
const nickname_class = ref('nickname')
const signature_class = ref('signature')
const name_class = ref('name')
const status = ref('inactive')

watch(status, (value) => {
  if (value === 'active') {
    message_class.value = 'message_active'
    nickname_class.value = 'nickname_active'
    signature_class.value = 'signature_active'
    name_class.value = 'name_active'
  } else if (value === 'hover') {
    message_class.value = 'message_hover'
    nickname_class.value = 'nickname'
    signature_class.value = 'signature'
    name_class.value = 'name'
  } else {
    message_class.value = 'message'
    nickname_class.value = 'nickname'
    signature_class.value = 'signature'
    name_class.value = 'name'
  }
})

function mouseOver() {
  if (status.value === 'inactive') status.value = 'hover'
}

function mouseOut() {
  if (status.value === 'hover') status.value = 'inactive'
}

function click() {
  status.value = 'active'
  emit('after-select', props.code, props.info)
}

function setInactive() {
  status.value = 'inactive'
}

defineExpose({ setInactive })
</script>

<template>
  <div :class="message_class" @mouseover="mouseOver" @mouseout="mouseOut" @click="click">
    <el-avatar class="head" :size="40" :src="props.info.headUrl" />
    <div v-if="props.info.type === 1">
      <div id="nickname_id" :class="nickname_class">
        {{ props.info.nickname }}
      </div>
      <div id="latest_message_id" :class="signature_class">
        {{ props.info.signature }}
      </div>
    </div>
    <div v-if="props.info.type === 2" :class="name_class">{{ props.info.name }}</div>
  </div>
</template>

<style scoped lang="less">
.message {
  position: relative;
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

.signature {
  position: absolute;
  bottom: 17px;
  left: 60px;
  font-size: 12px;
  color: #888;
  max-width: 77%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.signature_active {
  .signature();
  color: white;
}

.name {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 60px;
  font-size: 14px;
  color: black;
}

.name_active {
  .name();
  color: white;
}
</style>
