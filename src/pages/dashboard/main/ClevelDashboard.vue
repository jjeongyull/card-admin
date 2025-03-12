<template>

  <div class="main-view">
    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="이행점검 목록" defaultState>
          <ChartComponent
            :chartData="chartData"
            chartType="bar"
            chartTitle="차트 타이틀"
          />
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="외부 노출 서비스 현황" defaultState>
            <TableComponent :tableColumns="tableColumns" :tableData="tableData" />
        </AccordionItem>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="고위험 서비스" defaultState>
            <TableComponent :tableColumns="tableColumns" :tableData="tableData" />
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="장기 미조치 취약점" defaultState>
          <TableComponent :tableColumns="tableColumns" :tableData="tableData" />
        </AccordionItem>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="취약점 점검 (진행중)" defaultState>
          <TableComponent :tableColumns="tableColumns_2" :tableData="tableData_2" />
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="취약점 조치 현황" defaultState>
          <CalendarComponent></CalendarComponent>
        </AccordionItem>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import TableComponent from '@/components/Table.vue';
import { More } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

import AccordionItem from "@/components/AccordionItem.vue";
import ChartComponent from "@/components/ChartComponent.vue";
import CalendarComponent from "@/components/CalendarComponent.vue";

  export default {
    components: {
      More,
      TableComponent,
      AccordionItem,
      ChartComponent,
      CalendarComponent
    },
    setup() {
      const defaultState = ref(true);

      const tableColumns = ref([]);
      const tableColumns_2 = ref([]);
      const tableData = ref([]);
      const tableData_2 = ref([]);

      const loadTableData = async () => {
        try {
          const response = await fetch('/src/data/tableData.json');
          const data = await response.json();
          tableColumns.value = data.tableColumns;
          tableColumns_2.value = data.tableColumns_2;
          tableData.value = data.tableData;
          tableData_2.value = data.tableData_2;
        } catch (error) {
          console.error("JSON 데이터 로드 실패:", error);
        }
      };



      const getStatusTag = (status) => {
        switch (status) {
          case "조치완료":
            return "success"; // 초록색
          case "조치필요":
            return "warning"; // 노란색
          case "조치지연":
            return "danger"; // 빨간색
          default:
            return "";
        }
      };
      const getStatusClass = (status) => {
        switch (status) {
          case "조치완료":
            return "status-success";
          case "조치필요":
            return "status-warning";
          case "조치지연":
            return "status-danger";
          default:
            return "";
        }
      };


      const sortTable = (key) => {
        tableData.value.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      };


      const filterTable = (key) => {
        console.log(`필터 기능 (추후 구현) - 필터링할 키: ${key}`);
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

      return {
        tableColumns, tableData, defaultState,
        tableColumns_2, tableData_2,
        getStatusTag, getStatusClass,
        sortTable, filterTable, chartData
      };
    },
};
</script>

<style scoped src="@/assets/styles/pages/Summary.css"></style>
