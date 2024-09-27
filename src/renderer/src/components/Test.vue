<script setup>
import { ref } from 'vue'

const hello = ref('你好')

const sayHello = () => {
  console.log('Hello')
}

defineExpose({ hello, sayHello })
</script>

<template>
  <div class="l">Hello World!</div>
</template>

<style scoped></style>
