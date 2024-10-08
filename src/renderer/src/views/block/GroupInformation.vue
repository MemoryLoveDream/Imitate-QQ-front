<script setup>
import { ref } from 'vue'
import IconText from '../base/IconText.vue'
import ClickInput from '../input/ClickInput.vue'
import { useRelationshipStore } from '../../store/relationship'
import CircularChart from '../data/CircularChart.vue'

const relationshipStore = useRelationshipStore()
const urls = ref({
  leader_url: 'img:///E:/project/Vue/easychat-front/assets/users/1000000000/head.jpg',
  member_urls: [
    '/src/assets/pic/head/working_bear.png',
    '/src/assets/pic/head/girl_snowman.png',
    '/src/assets/pic/head/wind_grass.png',
    '/src/assets/pic/head/yearbook.png',
    '/src/assets/pic/head/stones.png'
  ]
})
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

function afterFocusout1(text) {
  relationshipStore.groupInformation.note = text
}

function afterFocusout2(text) {
  relationshipStore.groupInformation.nickname = text
}
</script>

<template>
  <div class="group-information">
    <div class="card">
      <div class="header">
        <el-avatar class="head" :src="relationshipStore.groupInformation.headUrl" :size="100" />
        <div class="name">{{ relationshipStore.groupInformation.name }}</div>
        <div class="id">id {{ relationshipStore.groupInformation.id }}</div>
      </div>
      <div class="divider"></div>
      <div class="line1">
        <IconText class="note" url="/src/assets/pic/info/note.svg" text="备注" />
        <ClickInput
          class="note-input"
          :text="relationshipStore.groupInformation.note"
          placeholder="设置群备注"
          @after-focusout="afterFocusout1"
        />
      </div>
      <div class="line2">
        <IconText
          class="nickname"
          url="/src/assets/pic/info/person.svg"
          text="我的本群昵称"
          :size="[20, 120, 10]"
        />
        <ClickInput
          class="nickname-input"
          :text="relationshipStore.groupInformation.nickname"
          placeholder="编辑群昵称"
          @after-focusout="afterFocusout2"
        />
      </div>
      <div class="line3">
        <IconText
          class="introduction"
          url="/src/assets/pic/info/introduction.svg"
          text="群介绍"
          :size="[20, 120, 10]"
        />
        <div class="introduction-text">群主很懒，还没有群介绍哦~</div>
      </div>
      <div class="line4">
        <IconText
          class="announcement"
          url="/src/assets/pic/info/announcement.svg"
          text="群公告"
          :size="[20, 120, 10]"
        />
        <div class="announcement-text">未设置</div>
      </div>
      <div class="line5">
        <IconText
          class="members"
          url="/src/assets/pic/info/grouping.svg"
          text="群成员(6人)"
          :size="[20, 120, 10]"
        />
        <div class="members-head">
          <el-avatar class="leader-url" :src="urls.leader_url" :size="30" />
          <div class="fence"></div>
          <div class="member-urls">
            <el-avatar
              v-for="(member_url, index) in urls.member_urls"
              :key="index"
              :src="member_url"
              :size="30"
              class="member-url"
            />
          </div>
        </div>
      </div>
      <div class="line6">
        <IconText
          class="proportion"
          url="/src/assets/pic/info/proportion.svg"
          text="成员分布"
          :size="[20, 120, 10]"
        />
        <div class="proportion-charts">
          <CircularChart
            v-for="(data, key) in dataset"
            :key="key"
            class="chart"
            :code="data.code"
            :text="data.text"
            :color="data.color"
            :data="data.data"
          />
        </div>
      </div>
      <div class="line7">
        <el-button class="btn">分享</el-button>
        <el-button class="btn" color="#0099ff">发消息</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.group-information {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  height: 600px;
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
  top: 150px;
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
  top: 190px;
  width: 100%;

  .nickname {
    .center();
    left: 10px;
  }

  .nickname-input {
    .center();
    right: 30px;
    height: 20px;
    width: 40%;
  }
}

.line3 {
  position: absolute;
  top: 230px;
  width: 100%;

  .introduction {
    .center();
    left: 10px;
  }

  .introduction-text {
    .center();
    right: 30px;
    max-width: 70%;
    color: black;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.line4 {
  position: absolute;
  top: 270px;
  width: 100%;

  .announcement {
    .center();
    left: 10px;
  }

  .announcement-text {
    .center();
    right: 30px;
    max-width: 70%;
    color: black;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.line5 {
  position: absolute;
  top: 310px;
  width: 100%;

  .members {
    .center();
    left: 10px;
  }

  .members-head {
    position: absolute;
    top: 20px;
    left: 10px;
    height: 30px;
    width: 90%;

    .leader-url {
      .center();
    }

    .fence {
      .center();
      width: 1px;
      height: 20px;
      left: 40px;
      background-color: #eeeeee;
    }

    .member-urls {
      .center();
      left: 50px;

      .member-url {
        position: relative;
        margin-right: 10px;
      }
    }
  }
}

.line6 {
  position: absolute;
  top: 390px;
  width: 100%;

  .proportion {
    .center();
    left: 10px;
  }

  .proportion-charts {
    position: absolute;
    height: 100px;
    width: calc(100% - 40px);
    top: 20px;
    left: 10px;
    right: 30px;
    display: flex;
    justify-content: space-between;

    .chart {
      position: relative;
    }
  }
}

.line7 {
  position: absolute;
  top: 530px;
  width: 100%;
  display: flex;
  justify-content: center;

  .btn {
    position: relative;
    top: 10px;
  }
}
</style>
