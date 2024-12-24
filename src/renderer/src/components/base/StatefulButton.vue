<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  index: Number,
  paths: Object,
  ratio: { type: Number, default: 60 },
  tip: Boolean,
  tipPlace: {
    validator(value) {
      return ['bottom', 'top', 'right', 'left'].includes(value)
    },
    default: 'bottom'
  },
  hoverEffect: {
    validator(value) {
      return ['background', 'icon', 'none'].includes(value)
    },
    default: 'none'
  },
  alterable: Boolean
})
const emit = defineEmits(['after-click'])
const status = ref('inactive')
const path = ref(props.paths.inactive_path)
const btn = ref()
const icon = ref()

watch(status, (value) => {
  if (value === 'inactive') {
    path.value = props.paths.inactive_path
    btn.value.style.backgroundColor = 'transparent'
  } else {
    if (props.hoverEffect === 'background') btn.value.style.backgroundColor = '#e0e0e0'
    if (
      value === 'hovering' &&
      props.hoverEffect === 'icon' &&
      props.paths.hovering_path !== undefined
    )
      path.value = props.paths.hovering_path
    else if (value === 'active' && props.paths.active_path !== undefined)
      path.value = props.paths.active_path
  }
})

function mouseover() {
  if (status.value === 'inactive') status.value = 'hovering'
}

function mouseout() {
  if (status.value === 'hovering') status.value = 'inactive'
}

function click(event) {
  if (
    (status.value === 'inactive' || status.value === 'hovering') &&
    props.paths.active_path !== undefined
  )
    status.value = 'active'
  else if (status.value === 'active' && props.alterable) status.value = 'inactive'
  props.paths.click?.(event, status.value)
  emit('after-click', props.index)
}

function setIsActive(bool) {
  status.value = bool ? 'active' : 'inactive'
}

defineExpose({ setIsActive })

onMounted(() => {
  icon.value.style.width = `${props.ratio}%`
  icon.value.style.height = `${props.ratio}%`
})
</script>

<template>
  <div ref="btn" class="btn" @mouseover="mouseover" @mouseout="mouseout" @click="click">
    <el-tooltip
      :disabled="!props.tip"
      :content="props.paths.name"
      :placement="props.tipPlace"
      effect="light"
      :show-arrow="false"
      :show-after="200"
    >
      <img ref="icon" alt="" :src="path" />
    </el-tooltip>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

img {
  .center();
  width: 60%;
  height: 60%;
}
</style>
