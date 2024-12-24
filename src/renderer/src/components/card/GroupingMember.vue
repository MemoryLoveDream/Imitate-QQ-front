<script setup>
import { ref, watch } from 'vue'
import api from '../../service/api'
import { RelationshipType, State } from '../../constants/enums'
import string from '../../utils/string'

const props = defineProps({ code: Object, info: Object })
const emit = defineEmits(['after-select'])

const messageClass = ref('message')
const nicknameClass = ref('nickname')
const signatureClass = ref('signature')
const nameClass = ref('name')
const status = ref(State.INACTIVE)

watch(status, (value) => {
  if (value === State.ACTIVE) {
    messageClass.value = 'message-active'
    nicknameClass.value = 'nickname-active'
    signatureClass.value = 'signature-active'
    nameClass.value = 'name-active'
  } else if (value === State.HOVERING) {
    messageClass.value = 'message-hover'
    nicknameClass.value = 'nickname'
    signatureClass.value = 'signature'
    nameClass.value = 'name'
  } else {
    messageClass.value = 'message'
    nicknameClass.value = 'nickname'
    signatureClass.value = 'signature'
    nameClass.value = 'name'
  }
})

function mouseOver() {
  if (status.value === State.INACTIVE) status.value = State.HOVERING
}

function mouseOut() {
  if (status.value === State.HOVERING) status.value = State.INACTIVE
}

function click() {
  status.value = State.ACTIVE
  emit('after-select', props.code, props.info)
}

function setInactive() {
  status.value = State.INACTIVE
}

defineExpose({ setInactive })
</script>

<template>
  <div :class="messageClass" @mouseover="mouseOver" @mouseout="mouseOut" @click="click">
    <el-avatar
      class="head"
      :size="40"
      :src="api.getAvatarPath(props.info.relationshipType, props.info.id)"
    />
    <div v-if="props.info.relationshipType === RelationshipType.FRIEND">
      <div :class="nicknameClass">
        {{ string.joinIfExists(props.info.nickname, props.info.note) }}
      </div>
      <div :class="signatureClass">{{ props.info.signature }}</div>
    </div>
    <div v-if="props.info.relationshipType === RelationshipType.GROUP" :class="nameClass">
      {{ string.joinIfExists(props.info.name, props.info.note) }}
    </div>
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

.message-hover {
  .message();
  background-color: whitesmoke;
}

.message-active {
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

.nickname-active {
  .nickname();
  color: white;
}

.signature {
  position: absolute;
  bottom: 14px;
  left: 60px;
  font-size: 12px;
  color: #888;
  max-width: 77%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.signature-active {
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

.name-active {
  .name();
  color: white;
}
</style>
