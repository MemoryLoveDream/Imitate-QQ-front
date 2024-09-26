<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../store/user'

const user = useUserStore()
const props = defineProps({ chat: Object })

const head = ref('')
const text = ref('')
const picture = ref('')

onMounted(() => {
  if (props.chat.sender_id === user.current_user.id) {
    head.value = 'head1'
    text.value = 'text1'
    picture.value = 'picture1'
  } else {
    head.value = 'head'
    text.value = 'text'
    picture.value = 'picture'
  }
})
</script>

<template>
  <div class="chat">
    <el-avatar :class="head" :size="30" :src="props.chat.head_url" />
    <div v-if="props.chat.type === 'text'" :class="text">{{ props.chat.content }}</div>
    <img
      v-else-if="props.chat.type === 'picture'"
      :class="picture"
      alt="content"
      :src="props.chat.content"
    />
    <div class="clear"></div>
  </div>
</template>

<style scoped lang="less">
.chat {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}

.head {
  margin: 20px 10px;
  float: left;
}

.head1 {
  margin: 20px 10px;
  float: right;
}

.box {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.text {
  .box();
  float: left;
  max-width: 80%;
  background-color: white;
  padding: 8px;
  color: black;
}

.text1 {
  .box();
  float: right;
  max-width: 80%;
  background-color: dodgerblue;
  padding: 8px;
  color: white;
}

.picture {
  .box();
  float: left;
  max-width: 300px;
}

.picture1 {
  .box();
  float: right;
  max-width: 300px;
}

.clear:after {
  content: '';
  height: 0;
  width: 0;
  clear: both;
  display: block;
}
</style>
