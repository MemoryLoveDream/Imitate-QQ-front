<script setup>
import { ArrowDownBold, ArrowUpBold, CloseBold } from '@element-plus/icons-vue'
import { onBeforeMount, ref, watch } from 'vue'
import { useUserStore } from '../../store/user'

const user = useUserStore()
const props = defineProps({ placeholder: String, handleChange: Function })
const text = ref('')
const show = ref(false)
const isDown = ref(false)
const inner_placeholder = ref(props.placeholder)

function dropItems() {
  isDown.value = !isDown.value
  if (text.value === '') {
    if (isDown.value) inner_placeholder.value = ''
    else inner_placeholder.value = props.placeholder
  }
}

function selectItem(id) {
  text.value = String(id)
  isDown.value = false
}

function deleteItem(index) {
  user.logined_users.splice(index, 1)
  if (user.logined_users.length === 0) {
    isDown.value = false
    inner_placeholder.value = props.placeholder
  }
}

function focusinEffect() {
  show.value = true
  isDown.value = false
  if (text.value === '') inner_placeholder.value = ''
}

function focusoutEffect() {
  setTimeout(() => {
    show.value = false
    if (text.value === '') inner_placeholder.value = props.placeholder
  }, 200)
}

watch(text, (value) => {
  for (let i of user.logined_users) {
    if (String(i.id) === value) {
      props.handleChange(i.head_url)
      break
    } else props.handleChange('/src/assets/pic/head/head.png')
  }
})

defineExpose({ text })

onBeforeMount(() => {
  // user.logined_users.splice(0, 4)
  // user.logined_users.push({
  //   id: 1000000000,
  //   nickname: '忆恋梦',
  //   head_url: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg'
  // })
  // user.logined_users.push({
  //   id: 1000000001,
  //   nickname: '努力工作的小熊',
  //   head_url: '/src/assets/png/working_bear.png'
  // })
})
</script>

<template>
  <div class="select-input">
    <input
      v-model="text"
      class="input"
      :placeholder="inner_placeholder"
      @focusin="focusinEffect"
      @focusout="focusoutEffect"
    />
    <el-icon v-if="show" class="clear" color="#888" @click="text = ''">
      <CloseBold />
    </el-icon>
    <el-icon class="drop" color="#888" @click="dropItems">
      <ArrowDownBold v-if="!isDown" />
      <ArrowUpBold v-if="isDown" />
    </el-icon>
    <div v-if="isDown" class="drop-items">
      <div
        v-for="(item, index) in user.logined_users"
        :key="index"
        class="item"
        @click="selectItem(item.id)"
      >
        <el-avatar class="item_avatar" :size="15" :src="item.head_url" />
        <div class="item_text">{{ item.id }}</div>
        <el-icon class="item_clear" @click.stop="deleteItem(index)">
          <CloseBold />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.input {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-50%);
  text-align: center !important;
  border-width: 0;
  border-color: transparent;
  border-radius: 3px;
  outline: none;
}

.clear {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10%;
  width: 30px;
  height: 30px;
}

.drop {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  width: 30px;
  height: 30px;
}

.drop-items {
  position: relative;
  width: 100%;
  top: 50px;
  max-height: 120px;
}

.item {
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px #999;
}

.item_avatar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2%;
  width: 25px;
  height: 25px;
}

.item_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.item_clear {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  width: 30px;
  height: 30px;
}
</style>
