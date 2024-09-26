<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({ code: String, text: String, color: Object, data: Object })
const selected = ref(0)

onMounted(() => {
  let myChart = echarts.init(document.getElementById(props.code))
  myChart.setOption({
    color: props.color,
    series: [
      {
        type: 'pie',
        radius: ['70%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
          formatter: (data) =>
            data.name + '\n' + data.value + '人\n' + data.percent.toFixed(0) + '%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            color: '#888'
          }
        },
        data: props.data
      }
    ]
  })
  myChart.dispatchAction({
    type: 'highlight',
    seriesIndex: selected.value,
    dataIndex: selected.value
  })
  myChart.on('mouseover', (e) => {
    if (e.dataIndex !== selected.value) {
      myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: selected.value })
      myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex })
      selected.value = e.dataIndex
    }
  })
})
</script>

<template>
  <div class="circular-chart">
    <div :id="props.code" class="chart"></div>
    <div class="text">{{ props.text }}</div>
  </div>
</template>

<style scoped lang="less">
.circular-chart {
  position: relative;
  height: 100px;
  width: 80px;
}

.chart {
  position: absolute;
  height: 80px;
  width: 80px;
}

.text {
  position: absolute;
  top: 80px;
  left: 50%;
  height: 20px;
  width: 80px;
  transform: translateX(-50%);
  text-align: center;
  color: black;
}
</style>
