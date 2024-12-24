<script setup>
import { onMounted, ref, watch } from 'vue'
import { State } from '../../constants/enums'

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
const state = ref(State.INACTIVE)
const path = ref(props.paths.inactive_path)
const btn = ref()
const icon = ref()

watch(state, (value) => {
  if (value === State.INACTIVE) {
    path.value = props.paths.inactive_path
    btn.value.style.backgroundColor = 'transparent'
  } else {
    if (props.hoverEffect === 'background') btn.value.style.backgroundColor = '#e0e0e0'
    if (
      value === State.HOVERING &&
      props.hoverEffect === 'icon' &&
      props.paths.hovering_path !== undefined
    )
      path.value = props.paths.hovering_path
    else if (value === State.ACTIVE && props.paths.active_path !== undefined)
      path.value = props.paths.active_path
  }
})

function hover() {
  if (state.value === State.INACTIVE) state.value = State.HOVERING
}

function leave() {
  if (state.value === State.HOVERING) state.value = State.INACTIVE
}

function activate(event) {
  if (
    (state.value === State.INACTIVE || state.value === State.HOVERING) &&
    props.paths.active_path !== undefined
  )
    state.value = State.ACTIVE
  else if (state.value === State.ACTIVE && props.alterable) state.value = State.INACTIVE
  props.paths.click?.(event, state.value)
  emit('after-click', props.index)
}

function setState(state1) {
  state.value = state1
}

defineExpose({ setState })

onMounted(() => {
  icon.value.style.width = `${props.ratio}%`
  icon.value.style.height = `${props.ratio}%`
})
</script>

<template>
  <div ref="btn" class="btn" @mouseover="hover" @mouseout="leave" @click="activate">
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
