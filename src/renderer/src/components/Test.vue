<script setup>
import { ref } from 'vue'

const hello = ref('你好')

const sayHello = () => {
  console.log('Hello')
}

defineExpose({ hello, sayHello })
</script>

<template>
  <div class="l">ajjsjjd</div>
</template>

<style scoped></style>
