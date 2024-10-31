<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  router.replace('/main/two/message_null')
})
</script>

<template>
  <div class="first"><router-view name="first" /></div>
  <div class="divider"></div>
  <div class="second"><router-view name="second" /></div>
</template>

<style scoped lang="less">
.first {
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
  height: 100%;
}

.divider {
  position: absolute;
  left: 330px;
  height: 100%;
  width: 2px;
  background-color: whitesmoke;
}

.second {
  position: absolute;
  top: 0;
  left: 332px;
  width: calc(100% - 332px);
  height: 100%;
}
</style>
