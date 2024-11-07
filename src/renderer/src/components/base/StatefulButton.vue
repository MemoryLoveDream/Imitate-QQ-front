<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  index: Number,
  urls: Object,
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
const url = ref(props.urls.inactive_url)
const btn = ref()
const icon = ref()

watch(status, (value) => {
  if (value === 'inactive') {
    url.value = props.urls.inactive_url
    btn.value.style.backgroundColor = 'transparent'
  } else {
    if (props.hoverEffect === 'background') btn.value.style.backgroundColor = '#e0e0e0'
    if (
      value === 'hovering' &&
      props.hoverEffect === 'icon' &&
      props.urls.hovering_url !== undefined
    )
      url.value = props.urls.hovering_url
    else if (value === 'active' && props.urls.active_url !== undefined)
      url.value = props.urls.active_url
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
    props.urls.active_url !== undefined
  )
    status.value = 'active'
  else if (status.value === 'active' && props.alterable) status.value = 'inactive'
  props.urls.click?.(event, status.value)
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
      :content="props.urls.name"
      :placement="props.tipPlace"
      effect="light"
      :show-arrow="false"
      :show-after="200"
    >
      <img ref="icon" alt="" :src="url" />
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
