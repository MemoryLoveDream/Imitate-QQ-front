<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  n: Number,
  urls: Object,
  tip: { type: Boolean, default: false },
  hoverable: { type: Boolean, default: false }
})
const emit = defineEmits(['after-select'])

const status = ref('inactive')
const url = ref(props.urls.inactive_url)
const btn = ref()
const icon = ref()

watch(status, (value) => {
  if (value === 'inactive') {
    url.value = props.urls.inactive_url
    btn.value.style.backgroundColor = 'transparent'
  } else {
    if (props.hoverable) btn.value.style.backgroundColor = '#e0e0e0'
    if (value === 'active') url.value = props.urls.active_url
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
  emit('after-select', props.n)
  props.urls.click()
}

function setIsActive(status1) {
  status.value = status1
}

defineExpose({ setIsActive })
</script>

<template>
  <div ref="btn" class="btn" @mouseover="mouseOver" @mouseout="mouseOut" @click="click">
    <el-tooltip
      :disabled="!props.tip"
      placement="right"
      effect="light"
      :content="props.urls.name"
      :show-arrow="false"
      :show-after="200"
    >
      <img ref="icon" alt="" :src="url" />
    </el-tooltip>
  </div>
</template>

<style scoped lang="less">
img {
  position: absolute;
  width: 60%;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
