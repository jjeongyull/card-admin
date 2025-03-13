<template>

  <el-row :gutter="10" class="chart-wrapper">
    <el-col :xs="24" :sm="24" :md="18">
      <div class="chart-container">
        <div ref="chartRef" class="chart"></div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="6">
      <div v-if="showLegend" class="legend">
        <div v-for="item in legendData" :key="item.name" class="legend-item">
          <span class="dot" :style="{ backgroundColor: item.color }"></span>
          <span class="legend-text">{{ item.name }}</span>
          <span class="percent">{{ item.value }}</span>
        </div>
      </div>
    </el-col>

  </el-row>


</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  chartData: Array, // 차트 데이터 (pie: [{ name, value, color }], bar/line: { categories, series })
  chartTitle: { type: String, default: "" }, // 차트 제목
  chartType: { type: String, default: "pie" }, // 차트 타입 ("pie", "bar", "line")
  radius: { type: Array, default: () => ["60%", "80%"] }, // 도넛 차트 크기 설정
  showLegend: { type: Boolean, default: true }, // 범례 표시 여부
});

const chartRef = ref(null);
let myChart = null;
let resizeObserver = null;

// 범례 데이터 변환 (pie 차트일 때만 사용)
const legendData = computed(() => {
  if (props.chartType === "pie") {
    return props.chartData; // Pie 차트는 그대로 사용
  }
  if (props.chartType === "bar" || props.chartType === "line") {
    return props.chartData.series.map((series) => ({
      name: series.name,
      value: series.data.reduce((a, b) => a + b, 0), // 총합 계산
      color: series.color,
    }));
  }
  return [];
});

// 차트 초기화
const initChart = () => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    updateChart();
  }
};

// 차트 옵션 설정
const updateChart = () => {
  if (!myChart) return;

  let options = { tooltip: { trigger: "axis" } };

  if (props.chartType === "pie") {
    options = {
      ...options,
      tooltip: { trigger: "item" },
      legend: { show: false },
      series: [
        {
          name: props.chartTitle,
          type: "pie",
          radius: props.radius,
          label: { show: false },
          data: props.chartData.map((item) => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: item.color },
          })),
        },
      ],
    };
  } else if (props.chartType === "bar" || props.chartType === "line") {
    options = {
      ...options,
      xAxis: {
        type: "category",
        data: props.chartData.categories, // X축 (w1 ~ w10)
      },
      yAxis: { type: "value" },
      grid: { left: "5%", right: "5%", bottom: "10%", containLabel: true },
      series: props.chartData.series.map((item) => ({
        name: item.name,
        type: item.type,
        data: item.data,
        itemStyle: { color: item.color },
        smooth: item.type === "line",
      })),
    };
  }

  myChart.setOption(options);
};

// 창 크기 변경 시 차트 리사이징
const resizeChart = () => {
  if (myChart) myChart.resize();
};

// 부모 컨테이너 크기 변화 감지
const observeParentResize = () => {
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => resizeChart());
    resizeObserver.observe(chartRef.value.parentElement);
  }
};

// 데이터 변경 시 차트 업데이트
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
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<style scoped src="@/assets/styles/components/ChartComponent.css"></style>
