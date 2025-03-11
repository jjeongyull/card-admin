<template>

  <div class="main-view">

    <el-row :gutter="10" class="responsive-row">
      <!-- 왼쪽 3개 아코디언 -->
      <el-col :xs="24" :sm="24" :md="4">
        <AccordionItem title="내 자산현황" defaultState>
          <p style="font-size: 18px; color: #4CAF50;">안전</p>
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <AccordionItem title="진행중인 심의" defaultState>
          <p ref="progressText" class="progress-text">현대카드 메인 홈페이지 UX/UI 개편</p>
          <progress class="progress-bar" value="70" max="100"></progress>
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="4">
        <AccordionItem title="조치필요 취약점" defaultState>
          <p style="font-size: 20px; font-weight: 900; margin-bottom: 5px;">12<span style="font-size: 12px; color: #777777;">개</span></p>
          <p style="font-size: 12px; color: #777777;">이전달 대비 <span style="color: #D32F2F;">+9</span></p>
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <AccordionItem title="조치 지연 취약점" defaultState>
          <p ref="progressText" class="progress-text" style="margin-bottom: 5px;">
            현대카드 메인 홈페이지 cross-site Scripting
          </p>
          <p style="font-size: 12px; color: #777777;">등 3건</p>
        </AccordionItem>
      </el-col>
    </el-row>


    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="16">
        <AccordionItem title="조치 지연 취약점" defaultState>
            <TableComponent :tableColumns="tableColumns" :tableData="tableData" />
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <AccordionItem title="취약점 조치 현황" defaultState>
          <ChartComponent
            :chartData="chartData"
            chartType="pie"
            chartTitle="차트 타이틀"
            :radius="['40%', '80%']"
          />
        </AccordionItem>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="16">
        <AccordionItem title="보안선 심의 현황" defaultState>
          <TableComponent :tableColumns="tableColumns_2" :tableData="tableData_2" />
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
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
import * as echarts from "echarts";
import { nextTick, onMounted, ref, watch } from "vue";

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
      const selectedDate = ref(new Date());
      const isToday = (timestamp) => {
        const today = new Date();
        const date = new Date(timestamp);
        return (
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate()
        );
      };

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

      const chartRef = ref(null);
      let myChart = null;
      const chartData = ref([
        { name: "조치완료", value: 50, color: "#67C23A" }, // 초록색
        { name: "조치필요", value: 30, color: "#E6A23C" }, // 주황색
        { name: "조치지연", value: 20, color: "#F56C6C" }, // 빨간색
      ]);
      const updateChartSize = () => {
        if (chartRef.value) {
          chartRef.value.style.width = window.innerWidth < 768 ? "100%" : "80%";
        }
      };
      const initChart = () => {
        if (chartRef.value) {
          myChart = echarts.init(chartRef.value);
          myChart.setOption({
            tooltip: { trigger: "item" },
            legend: { show: false },
            series: [
              {
                name: "취약점 조치 현황",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: true,
                label: { show: false },
                data: chartData.value.map((item) => ({
                  value: item.value,
                  name: item.name,
                  itemStyle: { color: item.color },
                })),
              },
            ],
          });
        }
      };
      const onCollapseChange = async (activeName) => {
        if (activeName === "1") { // 아코디언이 열렸을 때
          await nextTick(); // DOM 업데이트 후 실행
          myChart?.resize(); // 차트 크기 조정
        }
      };
      onMounted(() => {
        window.addEventListener("resize", updateChartSize);
        initChart();
        loadTableData();
      });

      watch(() => window.innerWidth, updateChartSize);
      return {
        tableColumns, tableData, defaultState,
        tableColumns_2, tableData_2,
        chartRef, onCollapseChange,
        getStatusTag, getStatusClass,
        sortTable, filterTable,
        chartRef, chartData,
        selectedDate, isToday
      };
    },
};
</script>

<style scoped src="@/assets/styles/pages/Summary.css"></style>
