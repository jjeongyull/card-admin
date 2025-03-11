<template>
  <div class="chart-wrapper">
    <div class="chart-container">
      <div ref="chartRef" class="chart"></div>
    </div>
    <div class="legend">
      <div v-for="item in chartData" :key="item.name" class="legend-item">
        <span class="dot" :style="{ backgroundColor: item.color }"></span>
        <span class="legend-text">{{ item.name }}</span>
        <span class="percent">{{ item.value }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  chartData: Array, // 차트 데이터
  chartTitle: { type: String }, // 차트 제목
  chartType: { type: String, default: "pie" }, // 차트 타입
  radius: { type: Array, default: () => ["60%", "80%"] }, // 도넛 크기 설정
});

const chartRef = ref(null);
let myChart = null;
let resizeObserver = null;

// 차트 초기화
const initChart = () => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value, null, {
      width: 220, // 차트 넓이를 내부 크기에 맞게 설정
      height: 220,
    });
    updateChart();
  }
};

// 차트 데이터 업데이트
const updateChart = () => {
  if (myChart) {
    myChart.setOption({
      tooltip: { trigger: "item" },
      legend: { show: false },
      series: [
        {
          name: props.chartTitle,
          type: props.chartType,
          radius: props.chartType === "pie" ? props.radius : undefined,
          label: { show: false },
          data: props.chartData.map((item) => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: item.color },
          })),
        },
      ],
    });
  }
};

// 창 크기 변경 시 차트 크기 자동 조절
const resizeChart = () => {
  if (myChart) {
    myChart.resize({
      width: 220, // 차트 크기 고정
      height: 220,
    });
  }
};

// 부모 요소 크기 변화 감지 (ResizeObserver)
const observeParentResize = () => {
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => {
      resizeChart();
    });
    resizeObserver.observe(chartRef.value.parentElement);
  }
};

// props가 변경될 때마다 차트 업데이트
watch(() => props.chartData, updateChart, { deep: true });

onMounted(() => {
  nextTick(() => {
    initChart();
    observeParentResize();
    window.addEventListener("resize", resizeChart);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped src="@/assets/styles/components/ChartComponent.css"></style>
