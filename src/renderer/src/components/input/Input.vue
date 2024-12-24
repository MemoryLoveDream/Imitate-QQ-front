<script setup>
import { ref } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'

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
  }, 400)
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
    <el-icon v-if="show" class="clear" color="#888" @click="text = ''">
      <CloseBold />
    </el-icon>
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

.clear {
  .vertical-center();
  right: 5%;
  height: 50%;
  width: auto;
}
</style>
