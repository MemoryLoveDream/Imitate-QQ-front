<script setup>
import { onMounted, ref } from 'vue'
import { ArrowDownBold, ArrowRightBold } from '@element-plus/icons-vue'
import GroupingMember from './GroupingMember.vue'
import string from '../../utils/string'

const props = defineProps({ code: Object, grouping: Object })
const emit = defineEmits(['after-select'])
const container = ref()
const header = ref()
const members = ref()
const isDown = ref(false)
const membersRef = ref([])

function afterSelect(code, info) {
  emit('after-select', code, info)
}

function change_height() {
  setTimeout(() => {
    if (!isDown.value) container.value.style.height = '30px'
    else container.value.style.height = 30 + members.value.clientHeight + 'px'
  }, 10)
}

function click() {
  isDown.value = !isDown.value
  change_height()
}

function setInactive(n) {
  membersRef.value[n].setInactive()
}

defineExpose({ setInactive })

onMounted(() => {
  change_height()
})
</script>

<template>
  <div ref="container" class="relationship-grouping">
    <div ref="header" class="group-header" @click="click">
      <el-icon class="drop" color="#888">
        <ArrowRightBold v-if="!isDown" />
        <ArrowDownBold v-if="isDown" />
      </el-icon>
      <div class="name">{{ props.grouping.name }}</div>
      <div class="number">
        {{ `${string.ifExists(props.grouping.onlineNumber, '/')}${props.grouping.number}` }}
      </div>
    </div>
    <div v-show="isDown" ref="members" class="members">
      <GroupingMember
        v-for="(info, index) in props.grouping.members"
        ref="membersRef"
        :key="index"
        :code="{ n1: props.code.n1, n2: props.code.n2, n3: index }"
        :info="info"
        class="member"
        @after-select="afterSelect"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.relationship-grouping {
  position: relative;
  height: 30px;
}

.group-header {
  position: absolute;
  height: 30px;
  width: calc(100% - 30px);
  margin-left: 15px;
  margin-right: 15px;
  user-select: none;

  .drop {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .name {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    color: black;
  }

  .number {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    font-size: 10px;
  }
}

.members {
  position: absolute;
  top: 30px;
  left: 0;

  .member {
    position: relative;
  }
}
</style>
