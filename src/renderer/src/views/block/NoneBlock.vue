<script setup>
import { Picture } from '../../constants/assets'
</script>

<template>
  <div class="none-block" @dragstart.prevent>
    <img :src="Picture.NoneBlock" alt="" />
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
  .center();
  width: 40%;
  height: auto;
  opacity: 0.5;
}
</style>
