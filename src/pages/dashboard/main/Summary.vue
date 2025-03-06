<template>

  <div class="main-view">

    <el-row :gutter="10" class="responsive-row">
      <!-- 왼쪽 3개 아코디언 -->
      <el-col :xs="24" :sm="24" :md="4">
        <el-collapse
          v-model="accordionState[0].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 0) }"
          :style="{ minHeight: isExpanded('1', 0) ? '100%' : '50px' }"
        >
          <el-collapse-item title="내 자산현황" name="1" class="dash-title">
            <p style="font-size: 18px; color: #4CAF50;">안전</p>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <el-collapse
          v-model="accordionState[1].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 1) }"
          :style="{ minHeight: isExpanded('1', 1) ? '100%' : '50px' }"
        >
          <el-collapse-item title="진행중인 심의" name="1" class="dash-title">
            <div>
              <p ref="progressText" class="progress-text">현대카드 메인 홈페이지 UX/UI 개편</p>
              <progress class="progress-bar" value="70" max="100"></progress>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :xs="24" :sm="24" :md="4">
        <el-collapse
          v-model="accordionState[2].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 2) }"
          :style="{ minHeight: isExpanded('1', 2) ? '100%' : '50px' }"
        >
          <el-collapse-item title="조치필요 취약점" name="1" class="dash-title">
            <div>
              <p style="font-size: 20px; font-weight: 900; margin-bottom: 5px;">12<span style="font-size: 12px; color: #777777;">개</span></p>
              <p style="font-size: 12px; color: #777777;">이전달 대비 <span style="color: #D32F2F;">+9</span></p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <el-collapse
          v-model="accordionState[3].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 3) }"
          :style="{ minHeight: isExpanded('1', 3) ? '100%' : '50px' }"
        >
          <el-collapse-item title="조치 지연 취약점" name="1" class="dash-title">
            <div>
              <p ref="progressText" class="progress-text" style="margin-bottom: 5px;">
                현대카드 메인 홈페이지 cross-site Scripting
              </p>
              <p style="font-size: 12px; color: #777777;">등 3건</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>



    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="16">
        <el-collapse
          v-model="accordionState[4].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 4) }"
          :style="{ minHeight: isExpanded('1', 4) ? '100%' : '50px' }"
        >
          <el-collapse-item title="취약점 현황" name="1" class="dash-title">
            <div>
              <TableComponent :tableColumns="tableColumns" :tableData="tableData" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <el-collapse
          v-model="accordionState[5].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 5) }"
          :style="{ minHeight: isExpanded('1', 5) ? '100%' : '50px' }"
        >
          <el-collapse-item title="취약점 조치 현황" name="1" class="dash-title">
            <div class="chart-container">
              <!-- ECharts 도넛 차트 -->
              <div ref="chartRef" class="chart"></div>

              <!-- 퍼센트 리스트 -->
              <ul class="percentage-list">
                <li v-for="item in chartData" :key="item.name">
                  <span class="dot" :style="{ backgroundColor: item.color }"></span>
                  <span>{{ item.name }}</span>
                  <span class="percent">{{ item.value }}%</span>
                </li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="16">
        <el-collapse
          v-model="accordionState[6].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 6) }"
          :style="{ minHeight: isExpanded('1', 6) ? '100%' : '50px' }"
        >
          <el-collapse-item title="보안선 심의 현황" name="1" class="dash-title">
            <div>
              <TableComponent :tableColumns="tableColumns_2" :tableData="tableData_2" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <el-collapse
          v-model="accordionState[7].state"
          accordion
          class="custom-collapse"
          :class="{ 'collapsed-style': !isExpanded('1', 7) }"
          :style="{ minHeight: isExpanded('1', 7) ? '100%' : '50px' }"
        >
          <el-collapse-item title="취약점 조치 현황" name="1" class="dash-title">
            <el-calendar v-model="selectedDate">
              <template #date-cell="{ data }">
                <div :class="['calendar-day', { today: isToday(data.timestamp) }]">
                  {{ data.day.substr(8,9) }}
                </div>
              </template>
            </el-calendar>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import TableComponent from '@/components/Table.vue';
import { More } from "@element-plus/icons-vue";
import * as echarts from "echarts";
import { nextTick, onMounted, ref, watch } from "vue";

  export default {
    components: {
      More,
      TableComponent
    },
    setup() {
      const accordionState = ref([
        {state: '1'},
        {state: '1'},
        {state: '1'},
        {state: '1'},
        {state: '1'},
        {state: '1'},
        {state: '1'},
        {state: '1'}
      ]);
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
      const isExpanded = (name, num) => accordionState.value[num].state === name;

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
        tableColumns, tableData, 
        tableColumns_2, tableData_2, 
        chartRef, onCollapseChange, 
        getStatusTag, getStatusClass, 
        sortTable, filterTable, 
        chartRef, chartData, 
        selectedDate, isToday,
        accordionState, isExpanded
      };
    },
};
</script>

<style scoped>
 .main-view {
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;
  }
  .responsive-row {
    display: flex;
    flex-wrap: wrap; /* 줄바꿈 허용 */
  }
  @media (max-width: 600px) {
    .responsive-row {
      gap: 20px; /* 테이블과 차트 사이 여백 추가 */
    }
  }
  /* 그리드 레이아웃 */
  .grid {
    display: grid;
    gap: 20px;
    align-items: flex-start;
  }
  .t {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .grid-0 {
    grid-template-columns: 1fr 2fr 1fr;
  }

  .grid-1 {
    grid-template-columns: 4fr 2fr;
  }

  .grid-2 {
    grid-template-columns: 4fr 2fr;
  }

  .grid-3 {
    grid-template-columns: 4fr 2fr;
  }

  /* 카드 스타일 */
  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    font-size: 14px;
    font-weight: bold;
  }

  .card-1{
    height: 116px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .progress-text {
    display: inline-block; /* 글자 길이만큼만 차지 */
    font-size: 16px;
  }
  .progress-bar {
    appearance: none; /* 브라우저 기본 스타일 제거 */
    width: 100%; /* 기본 너비 설정 */
    height: 10px; /* 프로그래스 바 높이 */
    border-radius: 5px; /* 둥근 모서리 */
    background-color: #ececec;
  }
  /* 프로그래스 바 채워진 부분 */
  .progress-bar::-webkit-progress-bar {
    background-color: #ececec;
    border-radius: 5px;
  }
  .progress-bar::-webkit-progress-value {
    background-color: #bebebe; /* 진행 중 색상 */
    border-radius: 5px;
  }
  .progress-bar::-moz-progress-bar {
    background-color: #bebebe;
    border-radius: 5px;
  }
  .dash-title2{
    font-size: 16px;
    margin-bottom: 15px;
  }
  .ellipsis {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .chart-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .chart {
    width: 350px;
    height: 250px;
  }

  .percentage-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .percentage-list li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }

  .percent {
    margin-left: auto;
    font-weight: bold;
  }
  .selected-range {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .calendar-day {
    text-align: center;
    padding: 5px;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .today {
    background-color: #409eff;
    color: white;
    font-weight: bold;
  }
  .selected {
    background-color: #67c23a;
    color: white;
    font-weight: bold;
  }
  .in-range {
    background-color: #f0f9eb;
  }


  .today {
    background-color: #409eff;
    color: white;
    font-weight: bold;
  }
  .custom-collapse {
    border-radius: 7px;
    overflow: hidden; /* border-radius 적용을 위한 설정 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    height: 100%;
    background-color: #fff;
  }
  .collapsed-style {
    border-radius: 8px;
    box-shadow: none;
    overflow: hidden;
    background-color: transparent;
  }
</style>
<style>
  .el-table td.el-table__cell div{
    color: #000;
  }
  .el-calendar-table thead th{
    padding: 5px 0;
  }
  .el-calendar-table .el-calendar-day{
    height: auto;
    font-size: 12px;
    padding: 4px;
  }
  .el-collapse{
    border-bottom: none;
    border-top: none;
  }
  .el-collapse-item__header{
    padding: 0 20px;
    font-size: 16px;
    font-weight: 900;
  }
  .el-collapse-item__wrap{
    padding: 0 20px;
    border-bottom: none;
    height: 100%;
  }
</style>