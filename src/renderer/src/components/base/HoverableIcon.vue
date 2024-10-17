<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({ urls: Object })
const icon = ref()
const url = ref(props.urls.inactive_url)

function mouseOver() {
  url.value = props.urls.hover_url
}

function mouseOut() {
  url.value = props.urls.inactive_url
}

onMounted(() => {
})
</script>

<template>
  <img
    ref="icon"
    alt=""
    :src="url"
    @mouseover="mouseOver"
    @mouseout="mouseOut"
    @click="props.urls.click"
  />
</template>

<style scoped lang="less"></style>
