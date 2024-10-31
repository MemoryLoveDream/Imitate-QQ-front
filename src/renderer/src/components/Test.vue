<script setup>
import { ref } from 'vue'

const hello = ref('你好')

const sayHello = () => {
  console.log('Hello')
}

defineExpose({ hello, sayHello })
</script>

<template>
  <div class="test"></div>
</template>

<style scoped lang="less">
@import '../assets/css/base';

.test {
  .container();
  border: 1px solid black;
  border-radius: 5px;
  //box-shadow: 1px 1px 10px grey;
  background-color: white;
}
</style>
