<script setup>
import { ArrowDownBold, ArrowUpBold, CloseBold } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({ placeholder: String, selectableItems: Array })
const emit = defineEmits(['handle-change', 'delete-item'])
const text = ref('')
const show = ref(false)
const isDown = ref(false)
const items = ref(props.selectableItems)
const innerPlaceholder = ref(props.placeholder)
const itemsRef = ref()

function dropItems() {
  isDown.value = !isDown.value
  if (text.value === '') {
    if (isDown.value) innerPlaceholder.value = ''
    else innerPlaceholder.value = props.placeholder
  }
}

function selectItem(id) {
  text.value = id
  isDown.value = false
}

function deleteItem(index, id) {
  items.value.splice(index, 1)
  if (items.value.length === 0) {
    isDown.value = false
    innerPlaceholder.value = props.placeholder
  }
  emit('delete-item', id)
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
  }, 400)
}

watch(text, (id) => {
  emit('handle-change', id)
})

watch(items, (value) => {
  itemsRef.value.style.height = `${value.length * 60}%`
})

defineExpose({ text })

onMounted(() => {
  itemsRef.value.style.height = `${items.value.length * 60}%`
})
</script>

<template>
  <div class="select-input">
    <input
      v-model="text"
      class="input"
      spellcheck="false"
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
    <div v-show="isDown" ref="itemsRef" class="drop-items">
      <div v-for="(item, index) in items" :key="index" class="item" @click="selectItem(item.id)">
        <el-avatar class="item_avatar" :size="15" :src="item.avatarPath" />
        <div class="item_text">{{ item.id }}</div>
        <el-icon class="item_clear" @click.stop="deleteItem(index, item.id)">
          <CloseBold />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.input {
  .container();
  .input-no-border();
  text-align: center;
  border-radius: 3px;
}

.clear {
  .vertical-center();
  right: 15%;
  height: 50%;
  width: auto;
}

.drop {
  .vertical-center();
  right: 5%;
  height: 50%;
  width: auto;
}

.drop-items {
  position: fixed;
  width: 100%;
  top: 100%;
  max-height: 120px;
}

.item {
  position: relative;
  width: 100%;
  height: 80%;
  margin-bottom: 3px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px #999;

  .item_avatar {
    .vertical-center();
    left: 5%;
    height: 60%;
    width: auto;
  }

  .item_text {
    .center();
  }

  .item_clear {
    .vertical-center();
    right: 5%;
    height: 50%;
    width: auto;
  }
}
</style>
