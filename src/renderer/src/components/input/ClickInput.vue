<script setup>
import { ref } from 'vue'

const props = defineProps({ text: { type: String, default: '' }, placeholder: String })
const emit = defineEmits(['after-focusout'])
const text = ref(props.text)
const editable = ref(false)
const input = ref()

function click() {
  editable.value = true
  setTimeout(() => input.value.focus(), 5)
}

function focusout() {
  editable.value = false
  emit('after-focusout', text.value)
}
</script>

<template>
  <div class="click-input">
    <input
      v-show="editable"
      ref="input"
      v-model="text"
      :placeholder="props.placeholder"
      @focusout="focusout"
    />
    <div v-show="!editable" :class="text === '' ? 'text_placeholder' : 'text'" @click="click">
      {{ text === '' ? props.placeholder : text }}
    </div>
  </div>
</template>

<style scoped lang="less">
input {
  outline-color: #0099ff;
  width: 100%;
}

.text_placeholder {
  float: right;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.text {
  float: right;
  max-width: 100%;
  color: black;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
