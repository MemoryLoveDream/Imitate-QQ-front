<script setup>
import StatefulButton from '../../components/base/StatefulButton.vue'
import IconText from '../../components/base/IconText.vue'
import ClickInput from '../../components/input/ClickInput.vue'
import { useUserStore } from '../../store/user'
import { useRelationshipStore } from '../../store/relationship'
import { useComponentsStore } from '../../store/components'
import { useRouter } from 'vue-router'
import api from '../../service/api'
import { Sex, Tab } from '../../constants/enums'
import { StatefulIcon, Icon } from '../../constants/assets'
import { onBeforeMount, ref, watch } from 'vue'
import debug from '../../utils/debug'

const us = useUserStore()
const rs = useRelationshipStore()
const cs = useComponentsStore()
const router = useRouter()
const refreshKey = ref(0)
const personalGroupingTypes = ref([])

watch(
  () => rs.displayer.id,
  () => refreshKey.value++
)

async function updateFriendNote(text) {
  rs.displayer.info.note = text
  let res = await api.updateFriendNote({
    i: us.currentUser.id,
    you: rs.displayer.info.id,
    newValue: text
  })
  if (res.data.data === false) debug.errorMessage('网络连接出错！')
}

async function updateFriendGrouping(value) {
  rs.displayer.info.grouping = value
  let res = await api.updateFriendGrouping({
    i: us.currentUser.id,
    you: rs.displayer.info.id,
    newValue: value
  })
  if (res.data.data === false) debug.errorMessage('网络连接出错！')
}

async function toMessage() {
  cs.changeTab(Tab.MESSAGE)
  rs.chatter = await rs.getInfo(rs.displayer.relationshipType, rs.displayer.id)
  await router.replace(
    `/main/two/message_friend/${rs.addMessage(rs.displayer.relationshipType, rs.displayer.id)}`
  )
}

onBeforeMount(async () => {
  personalGroupingTypes.value = (await api.listFriendGroupingTypes(us.currentUser.id)).data.data
})
</script>

<template>
  <div class="friend-information">
    <div :key="refreshKey" class="card">
      <div class="header">
        <el-avatar
          class="head"
          :src="api.getAvatarPath(rs.displayer.relationshipType, rs.displayer.id)"
          :size="100"
          @dragstart.prevent
        />
        <div class="nickname">{{ rs.displayer.info.nickname }}</div>
        <div class="id">id {{ rs.displayer.info.id }}</div>
        <IconText
          class="status"
          :icon="rs.displayer.info.status === 1 ? Icon.Online : Icon.Offline"
          :text="rs.displayer.info.status === 1 ? '在线' : '离线'"
        />
        <StatefulButton class="thumbs-up" :paths="StatefulIcon.ThumbsUp" />
      </div>
      <div class="divider1"></div>
      <div class="line0">
        <IconText
          class="sex"
          :icon="rs.displayer.info.sex === Sex.MALE ? Icon.Male : Icon.Female"
          :text="rs.displayer.info.sex === Sex.MALE ? '男' : '女'"
          :left="20"
        />
        <div class="field">24岁</div>
        <div class="field">9月12日 处女座</div>
        <div class="field">现居 {{ rs.displayer.info.location }}</div>
      </div>
      <div class="lines">
        <div class="line">
          <IconText class="item" :icon="Icon.Note" text="备注" />
          <ClickInput
            class="note-input"
            placeholder="设置好友备注"
            :text="rs.displayer.info.note"
            @after-focusout="updateFriendNote"
          />
        </div>
        <div class="line2">
          <IconText class="grouping" :icon="Icon.Grouping" text="好友分组" />
          <el-select
            v-model="rs.displayer.info.grouping"
            class="grouping-select"
            @change="updateFriendGrouping"
          >
            <el-option
              v-for="item in personalGroupingTypes"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="line">
          <IconText class="item" :icon="Icon.Signature" text="签名" />
          <div class="signature-text">
            {{ rs.displayer.info.signature === '' ? '暂无签名' : rs.displayer.info.signature }}
          </div>
        </div>
      </div>
      <div class="divider2"></div>
      <div class="line4">
        <el-button class="btn">分享</el-button>
        <el-button class="btn">音视频通话</el-button>
        <el-button class="btn" color="#0099ff" @click="toMessage">发消息</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.friend-information {
  .container();
  background-color: white;
}

.card {
  .center();
  height: 500px;
  width: 500px;
  .user-cannot-select;
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
    width: 80px;
    height: 35px;
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

.divider {
  .horizontal-center();
  width: 95%;
  height: 1px;
  background-color: #eeeeee;
}

.divider1 {
  .divider();
  top: 120px;
}

.line0 {
  position: absolute;
  width: 100%;
  height: 15px;
  top: 130px;
  left: 10px;
  font-size: 12px;
  color: black;
  display: flex;
  justify-content: left;

  .field {
    position: relative;
    margin-right: 20px;
  }

  .sex {
    .field();
    width: 32px;
    height: 15px;
  }
}

.lines {
  position: absolute;
  width: 100%;
  height: 170px;
  top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 15px;
  padding-right: 15px;
}

.line {
  position: relative;
  height: 20px;
}

.item {
  width: 120px;
  height: 20px;
}

.note-input {
  .align-right();
  width: 40%;
}

.line2 {
  position: relative;
  height: 30px;

  .grouping {
    .vertical-center();
    .item();
  }

  .grouping-select {
    .align-right();
    width: 140px;
  }
}

.signature-text {
  .align-right();
  max-width: 70%;
  color: black;
  .text-ellipsis();
}

.divider2 {
  .divider();
  top: 310px;
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
