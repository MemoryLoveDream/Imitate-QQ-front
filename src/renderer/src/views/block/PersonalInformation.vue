<script setup>
import { ref } from 'vue'
import ActivatableIcon from '../../components/base/ActivatableIcon.vue'
import IconText from '../../components/base/IconText.vue'
import ClickInput from '../../components/input/ClickInput.vue'
import WindowButtons from '../../components/base/WindowButtons.vue'
import { useUserStore } from '../../store/user'
import { useRelationshipStore } from '../../store/relationship'
import { useComponentsStore } from '../../store/components'
import { useRouter } from 'vue-router'
import api from '../../services/apis'
import { ElMessage } from 'element-plus'
import { Tab } from '../../store/constants'

const userStore = useUserStore()
const relationshipStore = useRelationshipStore()
const componentsStore = useComponentsStore()
const router = useRouter()
const urls = ref({
  name: 'PersonalInformation',
  inactive_url: '/src/assets/pic/info/thumbs_up.svg',
  active_url: '/src/assets/pic/info/thumbs_up_active.svg',
  click: () => {}
})

async function afterFocusout(text) {
  relationshipStore.info.note = text
  let res = await api.updatePersonalNote({
    i: userStore.currentUser.id,
    you: relationshipStore.info.id,
    newValue: text
  })
  if (res.data.data === false) ElMessage({ type: 'error', message: '网络连接出错！' })
}

async function change(value) {
  relationshipStore.info.grouping = value
  let res = await api.updatePersonalGrouping({
    i: userStore.currentUser.id,
    you: relationshipStore.info.id,
    newValue: value
  })
  if (res.data.data === false) ElMessage({ type: 'error', message: '网络连接出错！' })
}

async function click() {
  componentsStore.changeTab(Tab.MESSAGE)
  await relationshipStore.changeChatterUid(...relationshipStore.infoUid)
  await router.replace(
    `/main/two/message_person/${await relationshipStore.addMessage(...relationshipStore.infoUid)}`
  )
}
</script>

<template>
  <div class="personal-relationship.relationshipStore.relationshipStore.information">
    <div :key="componentsStore.personalInformationKey" class="card">
      <div class="header">
        <el-avatar class="head" :src="relationshipStore.info.headUrl" :size="100" />
        <div class="nickname">{{ relationshipStore.info.nickname }}</div>
        <div class="id">id {{ relationshipStore.info.id }}</div>
        <IconText
          class="status"
          :url="
            relationshipStore.info.status === 1
              ? '/src/assets/pic/info/online.svg'
              : '/src/assets/pic/info/offline.svg'
          "
          :text="relationshipStore.info.status === 1 ? '在线' : '离线'"
          :size="[35, 80, -5]"
        />
        <ActivatableIcon class="thumbs-up" :urls="urls" />
      </div>
      <div class="divider1"></div>
      <div class="line1">
        <IconText class="note" url="/src/assets/pic/info/note.svg" text="备注" />
        <ClickInput
          class="note-input"
          placeholder="设置好友备注"
          :text="relationshipStore.info.note"
          @after-focusout="afterFocusout"
        />
      </div>
      <div class="line2">
        <IconText
          class="grouping"
          url="/src/assets/pic/info/grouping.svg"
          text="好友分组"
          :size="[20, 120, 10]"
        />
        <el-select
          v-model="relationshipStore.info.grouping"
          class="grouping-select"
          @change="change"
        >
          <el-option
            v-for="item in relationshipStore.personalGroupingTypes"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="line3">
        <IconText
          class="signature"
          url="/src/assets/pic/info/signature.svg"
          text="签名"
          :size="[20, 120, 10]"
        />
        <div class="signature-text">{{ relationshipStore.info.signature }}</div>
      </div>
      <div class="divider2"></div>
      <div class="line4">
        <el-button class="btn">分享</el-button>
        <el-button class="btn">音视频通话</el-button>
        <el-button class="btn" color="#0099ff" @click="click">发消息</el-button>
      </div>
    </div>
    <WindowButtons />
  </div>
</template>

<style scoped lang="less">
.personal-information {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  height: 500px;
  width: 500px;
  user-select: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.header {
  position: absolute;
  top: 0;
  width: 100%;

  .head {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .nickname {
    position: absolute;
    top: 20px;
    left: 130px;
    font-size: 20px;
    color: black;
  }

  .id {
    position: absolute;
    top: 50px;
    left: 130px;
    font-size: 13px;
  }

  .status {
    position: absolute;
    top: 70px;
    left: 120px;
  }

  .thumbs-up {
    position: absolute;
    top: 50px;
    right: 10px;
    height: 30px;
    width: 30px;
  }
}

.divider1 {
  position: absolute;
  width: 95%;
  height: 1px;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #eeeeee;
}

.center {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.line1 {
  position: absolute;
  top: 160px;
  width: 100%;

  .note {
    .center();
    left: 10px;
  }

  .note-input {
    .center();
    right: 30px;
    height: 20px;
    width: 40%;
  }
}

.line2 {
  position: absolute;
  top: 200px;
  width: 100%;
  height: 30px;

  .grouping {
    .center();
    left: 10px;
  }

  .grouping-select {
    .center();
    right: 30px;
    width: 140px;
  }
}

.line3 {
  position: absolute;
  top: 270px;
  width: 100%;

  .signature {
    .center();
    left: 10px;
  }

  .signature-text {
    .center();
    right: 30px;
    max-width: 70%;
    color: black;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.divider2 {
  position: absolute;
  width: 95%;
  height: 1px;
  top: 310px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #eeeeee;
}

.line4 {
  position: absolute;
  top: 330px;
  width: 100%;
  display: flex;
  justify-content: center;

  .btn {
    position: relative;
    top: 20px;
  }
}
</style>
