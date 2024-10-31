<script setup>
const url = '/src/assets/pic/background/none.svg'
</script>

<template>
  <div class="none-block" @dragstart.prevent>
    <img :src="url" alt="" />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.none-block {
  .container();
  .user-cannot-select();
  background-color: whitesmoke;
}

img {
  position: absolute;
  width: 40%;
  height: auto;
  .center();
  opacity: 0.5;
}
</style>
