<script setup>
import { ref } from 'vue'

const props = defineProps({ placeholder: String, type: String })
const emit = defineEmits(['handle-click'])
const inner_placeholder = ref(props.placeholder)
const text = ref('')
const buttonText = ref('发送验证码')
const disable = ref(false)
const countdown = ref(60)

function focusin() {
  if (text.value === '') inner_placeholder.value = ''
}

function focusout() {
  setTimeout(() => {
    if (text.value === '') inner_placeholder.value = props.placeholder
  }, 400)
}

function click() {
  emit('handle-click')
  disable.value = true
  buttonText.value = `${countdown.value}s`
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      buttonText.value = `${--countdown.value}s`
    } else {
      clearInterval(interval)
      buttonText.value = '发送验证码'
      countdown.value = 60
      disable.value = false
    }
  }, 1000)
}

defineExpose({ text })
</script>

<template>
  <div>
    <input
      v-model="text"
      class="input"
      spellcheck="false"
      :placeholder="inner_placeholder"
      :type="props.type"
      @focusin="focusin"
      @focusout="focusout"
    />
    <el-button class="verify" color="lightgreen" :disabled="disable" @click="click">{{
      buttonText
    }}</el-button>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.input {
  .container();
  .input-no-border();
  text-align: center;
  border-radius: 3px;
}

.verify {
  position: absolute;
  width: 25%;
  height: 100%;
  right: 0;
  font-size: 10px;
}
</style>
