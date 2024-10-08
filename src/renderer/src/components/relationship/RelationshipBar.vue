<script setup>
import { Plus, Search } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import RelationshipGrouping from './RelationshipGrouping.vue'
import router from '../../router'
import { useRelationshipStore } from '../../store/relationship'

const relationshipStore = useRelationshipStore()
const text = ref('')
const type = ref('single')
const singleGroupingsRef = ref([])
const groupGroupingsRef = ref([])
const selected = ref({ n1: -1, n2: -1, n3: -1 })

watch(selected, () => router.replace('/main/two/relationship'), { once: true })

function afterSelect(code, info) {
  if (
    selected.value.n1 !== code.n1 ||
    selected.value.n2 !== code.n2 ||
    selected.value.n3 !== code.n3
  ) {
    if (selected.value.n1 !== -1 && selected.value.n2 !== -1 && selected.value.n3 !== -1) {
      if (selected.value.n1 === 1)
        singleGroupingsRef.value[selected.value.n2].setInactive(selected.value.n3)
      else groupGroupingsRef.value[selected.value.n2].setInactive(selected.value.n3)
    }
    selected.value = { n1: code.n1, n2: code.n2, n3: code.n3 }
  }
  relationshipStore.relationshipType = info.type
}
</script>

<template>
  <el-input v-model="text" class="input" placeholder="搜索" :prefix-icon="Search"></el-input>
  <el-button class="plus" color="whitesmoke">
    <el-icon><Plus /></el-icon>
  </el-button>
  <div class="tab">
    <div class="radio-inputs">
      <label class="radio" @click="type = 'single'">
        <input type="radio" name="radio" checked />
        <span class="name">好友</span>
      </label>
      <label class="radio" @click="type = 'group'">
        <input type="radio" name="radio" />
        <span class="name">群聊</span>
      </label>
    </div>
  </div>
  <div class="groupings">
    <div v-show="type === 'single'">
      <RelationshipGrouping
        v-for="(grouping, index) in relationshipStore.singleGrouping"
        ref="singleGroupingsRef"
        :key="index"
        :code="{ n1: 1, n2: index }"
        class="grouping"
        :grouping="grouping"
        @after-select="afterSelect"
      />
    </div>
    <div v-show="type === 'group'">
      <RelationshipGrouping
        v-for="(grouping, index) in relationshipStore.groupGrouping"
        ref="groupGroupingsRef"
        :key="index"
        :code="{ n1: 2, n2: index }"
        class="grouping"
        :grouping="grouping"
        @after-select="afterSelect"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.input {
  position: absolute;
  top: 25px;
  left: 15px;
  max-width: 250px;
  width: 250px;
  user-select: none;
}

.plus {
  position: absolute;
  top: 25px;
  right: 15px;
  width: 30px;
  height: 30px;
}

.tab {
  position: absolute;
  top: 70px;
  margin-left: 15px;
  margin-right: 15px;
  user-select: none;
}

.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #eee;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  width: 300px;
  font-size: 14px;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0;
  color: rgba(51, 65, 85, 1);
  transition: all 0.15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: #fff;
  font-weight: 600;
}

.groupings {
  position: absolute;
  top: 120px;
  width: 100%;
  height: calc(100% - 120px);
}

.grouping {
  position: relative;
}
</style>
