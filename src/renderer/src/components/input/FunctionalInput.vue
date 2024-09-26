<script setup>
import { ref } from 'vue'

const props = defineProps({ placeholder: String, type: String })
const text = ref('')
const show = ref(false)
const inner_placeholder = ref(props.placeholder)

function focusin() {
  show.value = true
  if (text.value === '') inner_placeholder.value = ''
}

function focusout() {
  setTimeout(() => {
    show.value = false
    if (text.value === '') inner_placeholder.value = props.placeholder
  }, 200)
}

defineExpose({ text })
</script>

<template>
  <div>
    <input
      v-model="text"
      class="input"
      :placeholder="inner_placeholder"
      :type="props.type"
      @focusin="focusin"
      @focusout="focusout"
    />
    <el-icon v-if="show" class="icon" color="#888" @click="text = ''">
      <slot></slot>
    </el-icon>
  </div>
</template>

<style scoped lang="less">
.input {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-50%);
  text-align: center !important;
  border-width: 0;
  border-color: transparent;
  border-radius: 3px;
  outline: none;
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  width: 30px;
  height: 30px;
}
</style>
