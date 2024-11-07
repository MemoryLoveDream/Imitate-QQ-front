<script setup>
import { Plus, Search } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import RelationshipGrouping from '../../components/card/RelationshipGrouping.vue'
import { useUserStore } from '../../store/user'
import { useRelationshipStore } from '../../store/relationship'
import { useComponentsStore } from '../../store/components'
import { MessageType } from '../../constants/enums'
import { useRouter } from 'vue-router'
import api from '../../services/apis'

const userStore = useUserStore()
const relationshipStore = useRelationshipStore()
const componentsStore = useComponentsStore()
const router = useRouter()
const personalGrouping = ref([])
const groupGrouping = ref([
  {
    name: '置顶群',
    number: '0',
    members: []
  },
  {
    name: '我创建的群',
    number: '1',
    members: [
      {
        type: 2,
        id: 1000000000,
        name: '元老会',
        headUrl: '/src/assets/pic/head/icon.png'
      }
    ]
  },
  {
    name: '我管理的群',
    number: '0',
    members: []
  },
  {
    name: '我加入的群',
    number: '0',
    members: []
  }
])
const text = ref('')
const type = ref('single')
const singleGroupingsRef = ref([])
const groupGroupingsRef = ref([])
const selected = ref({ n1: -1, n2: -1, n3: -1 })

async function afterSelect(code, info) {
  await relationshipStore.changeInfoUid(info.type, info.id)
  if (
    selected.value.n1 !== code.n1 ||
    selected.value.n2 !== code.n2 ||
    selected.value.n3 !== code.n3
  ) {
    if (selected.value.n1 !== -1 && selected.value.n2 !== -1 && selected.value.n3 !== -1) {
      if (selected.value.n1 === MessageType.PERSON)
        singleGroupingsRef.value[selected.value.n2].setInactive(selected.value.n3)
      else groupGroupingsRef.value[selected.value.n2].setInactive(selected.value.n3)
    }
    selected.value = { n1: code.n1, n2: code.n2, n3: code.n3 }
  }
  if (info.type === MessageType.PERSON) await router.replace('/main/two/relationship_person')
  else await router.replace('/main/two/relationship_group')
  componentsStore.refreshInformationBlock()
}

onBeforeMount(async () => {
  personalGrouping.value = (await api.getPersonalGrouping(userStore.currentUser.id)).data.data

})
</script>

<template>
  <div class="relationship-bar">
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
          v-for="(grouping, index) in personalGrouping"
          ref="singleGroupingsRef"
          :key="index"
          :code="{ n1: MessageType.PERSON, n2: index }"
          class="grouping"
          :grouping="grouping"
          @after-select="afterSelect"
        />
      </div>
      <div v-show="type === 'group'">
        <RelationshipGrouping
          v-for="(grouping, index) in groupGrouping"
          ref="groupGroupingsRef"
          :key="index"
          :code="{ n1: MessageType.GROUP, n2: index }"
          class="grouping"
          :grouping="grouping"
          @after-select="afterSelect"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.relationship-bar {
  .container();
  background-color: white;
}

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
