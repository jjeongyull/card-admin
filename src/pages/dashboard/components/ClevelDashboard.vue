<template>

  <div class="main-view">
    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <h4 style="margin-bottom: 15px;">이행점검 목록</h4>
        <BaseCard>
          <BaseChart
            :chartData="chartData"
            chartType="bar"
            chartTitle="차트 타이틀"
          />
        </BaseCard>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <h4 style="margin-bottom: 15px;">외부 노출 서비스 현황</h4>
        <BaseCard>
          <BaseTable :tableColumns="tableColumns" :tableData="tableData" :allData="tableData" :pageUse="false" />
        </BaseCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <h4 style="margin-bottom: 15px;">고위험 서비스</h4>
        <BaseCard>
          <BaseTable :tableColumns="tableColumns" :tableData="tableData" :allData="tableData" :pageUse="false" />
        </BaseCard>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <h4 style="margin-bottom: 15px;">장기 미조치 취약점</h4>
        <BaseCard>
          <BaseTable :tableColumns="tableColumns" :tableData="tableData" :allData="tableData" :pageUse="false"/>
        </BaseCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <h4 style="margin-bottom: 15px;">취약점 점검 (진행중)</h4>
        <BaseCard>
          <BaseTable :tableColumns="tableColumns_2" :tableData="tableData_2" :allData="tableData_2" :pageUse="false" />
        </BaseCard>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <h4 style="margin-bottom: 15px;">취약점 조치 현황</h4>
        <BaseCard>
          <Calendar></Calendar>
        </BaseCard>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const tableColumns = ref([]);
const tableColumns_2 = ref([]);
const tableData = ref([]);
const tableData_2 = ref([]);

const loadTableData = async () => {
  try {
    const response = await fetch('src/assets/data/tableData.json');
    // const response = await fetch('/assets/data/tableData.json');
    const data = await response.json();
    tableColumns.value = data.tableColumns;
    tableColumns_2.value = data.tableColumns_2;
    tableData.value = data.tableData;
    tableData_2.value = data.tableData_2;
  } catch (error) {
    console.error("JSON 데이터 로드 실패:", error);
  }
};



const chartData = ref({
  categories: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10"], // x축
  series: [
    {
      name: "취약점",
      type: "bar",
      data: [15, 18, 30, 28, 22, 25, 20, 23, 24, 30], // 막대 그래프 데이터
      color: "#F4C945",
    },
    {
      name: "취약서비스",
      type: "line",
      data: [10, 12, 14, 9, 11, 13, 10, 9, 8, 12], // 선 그래프 데이터
      color: "#E74C3C",
    },
  ],
});


onMounted(() => {
  loadTableData();
});
</script>

<style scoped src="@/assets/styles/pages/Summary.css"></style>
