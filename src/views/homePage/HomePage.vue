<template>
  <div>
    <div class="text-2xl font-extrabold text-gray-600 flex items-center">
      <el-icon class="mr-2"><HomeFilled /></el-icon>
      首頁
    </div>
    <div class="my-1">
      <PieChart :chartData="pieData" :options="pieOptions" />
    </div>
    <div class="my-1">
      <LineChart :chartData="lineData" :options="lineOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PieChart, LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const pieData = ref({
  labels: ["一般會員", "高級會員", "尊榮會員"],
  datasets: [
    {
      data: [35, 15, 8],
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B"],
    },
  ],
});

const pieOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "會員比例",
      font: {
        size: 20, // 調整 title 字體大小
        weight: "bold", // 調整 title 字體粗細
      },
    },
  },
});

const lineData = ref({
  labels: ["2023/01", "2023/02", "2023/03", "2023/04"],
  datasets: [
    {
      label: "總會員",
      data: [2, 8, 20, 30],
      borderColor: "#FF9224",
      fill: false,
    },
    {
      label: "高級會員",
      data: [1, 3, 5, 6],
      borderColor: "#5CADAD",
      fill: false,
    },
    {
      label: "尊榮會員",
      data: [1, 1, 2, 4],
      borderColor: "#AD5A5A",
      fill: false,
    },
  ],
});

const lineOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "人數成長",
      font: {
        size: 20,
        weight: "bold",
      },
    },
  },
});
</script>

<style lang="scss" scoped></style>
