<script setup>
import { ref } from 'vue'
import IconText from '../../components/base/IconText.vue'
import ClickInput from '../../components/input/ClickInput.vue'
import CircularChart from '../../components/data/CircularChart.vue'
import { useComponentsStore } from '../../store/components'
import api from '../../services/apis'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../store/user'
import { useRelationshipStore } from '../../store/relationship'
import { useRouter } from 'vue-router'
import { Tab } from '../../constants/enums'
import { Icon } from "../../constants/assets";

const us = useUserStore()
const rs = useRelationshipStore()
const componentsStore = useComponentsStore()

const router = useRouter()
const dataset = ref([
  {
    code: 'chart1',
    text: '活跃度',
    color: ['#E06974', '#67CDDF'],
    data: [
      { value: 2, name: '活跃' },
      { value: 4, name: '潜水' }
    ]
  },
  {
    code: 'chart2',
    text: '性别',
    color: ['#A06AF0', '#FF8800'],
    data: [
      { value: 4, name: '男' },
      { value: 2, name: '女' }
    ]
  },
  {
    code: 'chart3',
    text: '居住地',
    color: ['#E06974', '#67CDDF', '#A06AF0', '#FF8800', '#92C700'],
    data: [
      { value: 2, name: '南京' },
      { value: 1, name: '上海' },
      { value: 1, name: '北京' },
      { value: 1, name: '杭州' },
      { value: 1, name: '苏州' }
    ]
  },
  {
    code: 'chart4',
    text: '年龄',
    color: ['#E06974', '#A06AF0'],
    data: [
      { value: 3, name: '20-29' },
      { value: 3, name: '10-19' }
    ]
  }
])

async function afterFocusout1(text) {
  rs.displayer.info.note = text
  let res = await api.updateGroupNote({
    i: us.currentUser.id,
    you: rs.displayer.info.id,
    newValue: text
  })
  if (res.data.data === false) ElMessage({ type: 'error', message: '网络连接出错！' })
}

async function afterFocusout2(text) {
  rs.displayer.info.nickname = text
  let res = await api.updateGroupNickname({
    i: us.currentUser.id,
    you: rs.displayer.info.id,
    newValue: text
  })
  if (res.data.data === false) ElMessage({ type: 'error', message: '网络连接出错！' })
}

async function click() {
  componentsStore.changeTab(Tab.MESSAGE)
  await rs.changeChatterUid(rs.displayer.type, rs.displayer.id)
  await router.replace(
    `/main/two/message_group/
    ${await rs.addMessage(rs.displayer.type, rs.displayer.id)}`
  )
}
</script>

<template>
  <div class="group-information">
    <div :key="componentsStore.groupInformationKey" class="card">
      <div class="header">
        <el-avatar class="head" :src="rs.displayer.info.headUrl" :size="100" />
        <div class="name">{{ rs.displayer.info.name }}</div>
        <div class="id">id {{ rs.displayer.info.id }}</div>
      </div>
      <div class="divider"></div>
      <div class="lines">
        <div class="line">
          <IconText class="item" :icon="Icon.NOTE" text="备注" />
          <ClickInput
            class="note-input"
            :text="rs.displayer.info.note"
            placeholder="设置群备注"
            @after-focusout="afterFocusout1"
          />
        </div>
        <div class="line">
          <IconText class="item" :icon="Icon.PERSON" text="我的本群昵称" />
          <ClickInput
            class="nickname-input"
            :text="rs.displayer.info.nickname"
            placeholder="编辑群昵称"
            @after-focusout="afterFocusout2"
          />
        </div>
        <div class="line">
          <IconText class="item" :icon="Icon.INTRODUCTION" text="群介绍" />
          <div class="introduction-text">群主很懒，还没有群介绍哦~</div>
        </div>
        <div class="line">
          <IconText class="item" :icon="Icon.ANNOUNCEMENT" text="群公告" />
          <div class="announcement-text">未设置</div>
        </div>
        <div class="line5">
          <IconText
            class="item"
            :icon="Icon.GROUPING"
            :text="`群成员(${rs.displayer.info.number}人)`"
          />
          <div class="members-head">
            <el-avatar class="absolute" :src="rs.displayer.info.leaderHeadUrl" :size="30" />
            <div class="fence"></div>
            <div class="member-urls">
              <el-avatar
                v-for="(member_url, index) in rs.displayer.info.memberHeadUrls"
                :key="index"
                :src="member_url"
                :size="30"
                class="member-url"
              />
            </div>
          </div>
        </div>
        <div class="line6">
          <IconText class="item" :icon="Icon.PROPORTION" text="成员分布" />
          <div class="proportion-charts">
            <CircularChart
              v-for="(data, key) in dataset"
              :key="key"
              class="relative"
              :code="data.code"
              :text="data.text"
              :color="data.color"
              :data="data.data"
            />
          </div>
        </div>
        <div class="line7">
          <el-button class="btn">分享</el-button>
          <el-button class="btn" color="#0099ff" @click="click">发消息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.group-information {
  .container();
  background-color: white;
}

.card {
  .center();
  height: 600px;
  width: 500px;
  .user-cannot-select();
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

  .name {
    position: absolute;
    top: 30px;
    left: 130px;
    font-size: 20px;
    color: black;
  }

  .id {
    position: absolute;
    top: 60px;
    left: 130px;
    font-size: 13px;
  }
}

.divider {
  .horizontal-center();
  width: 95%;
  height: 1px;
  top: 120px;
  background-color: #eeeeee;
}

.lines {
  position: absolute;
  width: 100%;
  height: 430px;
  top: 120px;
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
  height: 20px;
  width: 40%;
}

.nickname-input {
  .align-right();
  width: 40%;
}

.introduction-text {
  .align-right();
  max-width: 70%;
  color: black;
  .text-ellipsis();
}

.announcement-text {
  .align-right();
  max-width: 70%;
  color: black;
  .text-ellipsis();
}

.line5 {
  position: relative;
  height: 60px;

  .members-head {
    position: absolute;
    top: 30px;
    height: 30px;
    width: 100%;

    .fence {
      .vertical-center();
      width: 1px;
      height: 20px;
      left: 40px;
      background-color: #eeeeee;
    }

    .member-urls {
      position: absolute;
      width: 400px;
      left: 50px;

      .member-url {
        position: relative;
        margin-right: 10px;
      }
    }
  }
}

.line6 {
  position: relative;
  height: 130px;

  .proportion-charts {
    .align-right();
    height: 100px;
    width: 100%;
    top: 30px;
    display: flex;
    justify-content: space-between;
  }
}

.line7 {
  position: relative;
  display: flex;
  justify-content: center;

  .btn {
    position: relative;
    top: 10px;
  }
}
</style>
