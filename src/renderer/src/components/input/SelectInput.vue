<script setup>
import { ArrowDownBold, ArrowUpBold, CloseBold } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'

const props = defineProps({ placeholder: String, selectableItems: Object })
const emit = defineEmits(['handle-change', 'delete-item'])
const text = ref('')
const show = ref(false)
const isDown = ref(false)
const innerPlaceholder = ref(props.placeholder)

function dropItems() {
  isDown.value = !isDown.value
  if (text.value === '') {
    if (isDown.value) innerPlaceholder.value = ''
    else innerPlaceholder.value = props.placeholder
  }
}

function selectItem(id) {
  text.value = String(id)
  isDown.value = false
}

function deleteItem(index) {
  props.selectableItems.splice(index, 1)
  if (props.selectableItems.length === 0) {
    isDown.value = false
    innerPlaceholder.value = props.placeholder
  }
  emit('delete-item', index)
}

function focusin() {
  show.value = true
  isDown.value = false
  if (text.value === '') innerPlaceholder.value = ''
}

function focusout() {
  setTimeout(() => {
    show.value = false
    if (text.value === '') innerPlaceholder.value = props.placeholder
  }, 200)
}

watch(text, (id) => {
  emit('handle-change', id)
})

defineExpose({ text })
</script>

<template>
  <div class="select-input">
    <input
      v-model="text"
      class="input"
      :placeholder="innerPlaceholder"
      @focusin="focusin"
      @focusout="focusout"
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
        v-for="(item, index) in props.selectableItems"
        :key="index"
        class="item"
        @click="selectItem(item.id)"
      >
        <el-avatar class="item_avatar" :size="15" :src="item.headUrl" />
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
  top: 45px;
  max-height: 120px;
}

.item {
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 3px;
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
