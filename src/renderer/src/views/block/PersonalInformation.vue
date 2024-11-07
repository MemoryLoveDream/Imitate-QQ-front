<script setup>
import StatefulButton from '../../components/base/StatefulButton.vue'
import IconText from '../../components/base/IconText.vue'
import ClickInput from '../../components/input/ClickInput.vue'
import { useUserStore } from '../../store/user'
import { useRelationshipStore } from '../../store/relationship'
import { useComponentsStore } from '../../store/components'
import { useRouter } from 'vue-router'
import api from '../../services/apis'
import { ElMessage } from 'element-plus'
import { Tab } from '../../constants/enums'
import { thumbsUpIcon, Icon } from '../../constants/assets'

const us = useUserStore()
const rs = useRelationshipStore()
const componentsStore = useComponentsStore()
const router = useRouter()

async function updatePersonalNote(text) {
  rs.displayer.info.note = text
  let res = await api.updatePersonalNote({
    i: us.currentUser.id,
    you: rs.displayer.info.id,
    newValue: text
  })
  if (res.data.data === false) ElMessage({ type: 'error', message: '网络连接出错！' })
}

async function updatePersonalGrouping(value) {
  rs.displayer.info.grouping = value
  let res = await api.updatePersonalGrouping({
    i: us.currentUser.id,
    you: rs.displayer.info.id,
    newValue: value
  })
  if (res.data.data === false) ElMessage({ type: 'error', message: '网络连接出错！' })
}

async function click() {
  componentsStore.changeTab(Tab.MESSAGE)
  await rs.changeChatterUid(rs.displayer.type, rs.displayer.id)
  await router.replace(
    `/main/two/message_person/${await rs.addMessage(rs.displayer.type, rs.displayer.id)}`
  )
}
</script>

<template>
  <div class="personal-information">
    <div :key="componentsStore.personalInformationKey" class="card">
      <div class="header">
        <el-avatar class="head" :src="rs.displayer.info.headUrl" :size="100" @dragstart.prevent />
        <div class="nickname">{{ rs.displayer.info.nickname }}</div>
        <div class="id">id {{ rs.displayer.info.id }}</div>
        <IconText
          class="status"
          :icon="rs.displayer.info.status === 1 ? Icon.ONLINE : Icon.OFFLINE"
          :text="rs.displayer.info.status === 1 ? '在线' : '离线'"
        />
        <StatefulButton class="thumbs-up" :urls="thumbsUpIcon" />
      </div>
      <div class="divider1"></div>
      <div class="line0">
        <IconText
          class="sex"
          :icon="rs.displayer.info.sex === 1 ? Icon.MALE : Icon.FEMALE"
          :text="rs.displayer.info.sex === 1 ? '男' : '女'"
          :left="20"
        />
        <div class="field">24岁</div>
        <div class="field">9月12日 处女座</div>
        <div class="field">现居 {{ rs.displayer.info.location }}</div>
      </div>
      <div class="lines">
        <div class="line">
          <IconText class="item" :icon="Icon.NOTE" text="备注" />
          <ClickInput
            class="note-input"
            placeholder="设置好友备注"
            :text="rs.displayer.info.note"
            @after-focusout="updatePersonalNote"
          />
        </div>
        <div class="line2">
          <IconText class="grouping" :icon="Icon.GROUPING" text="好友分组" />
          <el-select
            v-model="rs.displayer.info.grouping"
            class="grouping-select"
            @change="updatePersonalGrouping"
          >
            <el-option
              v-for="item in rs.personalGroupingTypes"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="line">
          <IconText class="item" :icon="Icon.SIGNATURE" text="签名" />
          <div class="signature-text">
            {{ rs.displayer.info.signature === '' ? '暂无签名' : rs.displayer.info.signature }}
          </div>
        </div>
      </div>
      <div class="divider2"></div>
      <div class="line4">
        <el-button class="btn">分享</el-button>
        <el-button class="btn">音视频通话</el-button>
        <el-button class="btn" color="#0099ff" @click="click">发消息</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.personal-information {
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
