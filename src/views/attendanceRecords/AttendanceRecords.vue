<template>
  <div class="flex-col">
    <div class="text-2xl font-extrabold text-gray-600 flex items-center">
      <el-icon class="mr-2"><List /></el-icon>
      出席紀錄區
    </div>
    <div class="my-1">
      <BarChart :chartData="testchartData" :options="testOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

const testchartData = ref({
  labels: [
    '2023/09/12',
    '2023/09/13',
    '2023/09/14',
    '2023/09/15',
    '2023/09/16',
    '2023/09/17',
    '2023/09/18',
  ],
  datasets: [
    {
      data: [4, 10, 5, 13, 8, 9, 20],
      backgroundColor: '#9D9D9D',
    },
  ],
});

const testOptions = ref({
  responsive: true,
  scales: {
    x: {
      type: 'category',
      grid: {
        display: false,
      },
      position: 'top',
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: '出席紀錄',
      font: {
        size: 20,
        weight: 'bold',
      },
    },
    datalabels: {
      display: false,
    },
  },
  indexAxis: 'x', // 設定為 'y' 表示 X 軸對應到資料的位置
  barPercentage: 0.5, // 設定每個 bar 的寬度相對於刻度寬度的比例
  categoryPercentage: 0.5, // 設定每個 bar 的寬度相對於刻度寬度的比例，同時考慮到 bar 與 bar 之間的間隔
});
</script>

<style lang="scss" scoped></style>
