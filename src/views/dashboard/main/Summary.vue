<template>
  <div class="main-view">
    <!-- 첫 번째 줄 -->
    <div class="grid grid-1">
      <div class="grid grid-0">
        <div class="card card-1">
          <h4 class="dash-title">내 자산현황</h4>
          <p style="font-size: 18px; color: #4CAF50;">안전</p>
        </div>

        <div class="card card-1">
          <h4 class="dash-title">진행중인 심의</h4>
          <div>
            <p ref="progressText" class="progress-text">현대카드 메인 홈페이지 UX/UI 개편</p>
            <progress class="progress-bar" value="70" max="100"></progress>
          </div>
        </div>

        <div class="card card-1">
          <h4 class="dash-title">조치필요 취약점</h4>
          <div>
            <p style="font-size: 20px; font-weight: 900; margin-bottom: 5px;">12<span style="font-size: 12px; color: #777777;">개</span></p>
            <p style="font-size: 12px; color: #777777;">이전달 대비 <span style="color: #D32F2F;">+9</span></p>
          </div>
        </div>
      </div>


      <div class="card card-1">
        <h4 class="dash-title">조치 지연 취약점</h4>  
        <div>
          <p ref="progressText" class="progress-text" style="margin-bottom: 5px;">현대카드 메인 홈페이지 cross-site Scripting</p>
          <p style="font-size: 12px; color: #777777;">등 3건</p>
        </div>
      </div>
    </div>

    <!-- 두 번째 줄 -->
    <div class="grid grid-2">
      <div>
        <h3 class="dash-title2">취약점 현황</h3>
        <div class="card wide">
          <el-table :data="tableData" style="width: 100%">
            <!-- 테이블 컬럼을 동적으로 생성 -->
            <el-table-column
              v-for="column in tableColumns"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :show-overflow-tooltip="column.tooltip"
            >
              <!-- 헤더 영역 -->
              <template #header>
                <div class="header-with-menu">
                  {{ column.label }}
                  <el-dropdown trigger="click">
                    <el-icon class="header-menu"><More /></el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="sortTable(column.prop)">정렬</el-dropdown-item>
                        <el-dropdown-item @click="filterTable(column.prop)">필터</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>

              <!-- 데이터 영역 -->
              <template #default="{ row }">
                <template v-if="column.prop === 'status'">
                  <div class="status-container">
                    <el-tag :type="getStatusTag(row[column.prop])">
                      {{ row[column.prop] }}
                    </el-tag>
                    <span class="status-icon" :class="getStatusClass(row[column.prop])">!</span>
                  </div>
                </template>
                <template v-else>
                  <el-tooltip effect="dark" :content="row[column.prop]" placement="top">
                    <span class="ellipsis">{{ row[column.prop] }}</span>
                  </el-tooltip>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div>
        <h3 class="dash-title2">취약점 조치 현황</h3>
        <div class="card chart-container">
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
      </div>
    </div>

    <!-- 세 번째 줄 -->
    <div class="grid grid-3">
      <div>
        <h3 class="dash-title2">보안선 심의 현황</h3>
        <div class="card wide">
          <el-table :data="tableData_2" style="width: 100%">
            <!-- 테이블 컬럼을 동적으로 생성 -->
            <el-table-column
              v-for="column in tableColumns_2"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :show-overflow-tooltip="column.tooltip"
            >
              <!-- 헤더 영역 -->
              <template #header>
                <div class="header-with-menu">
                  {{ column.label }}
                  <el-dropdown trigger="click">
                    <el-icon class="header-menu"><More /></el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="sortTable(column.prop)">정렬</el-dropdown-item>
                        <el-dropdown-item @click="filterTable(column.prop)">필터</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>

              <!-- 데이터 영역 -->
              <template #default="{ row }">
                <template v-if="column.prop === 'status'">
                  <div class="status-container">
                    <el-tag :type="getStatusTag(row[column.prop])">
                      {{ row[column.prop] }}
                    </el-tag>
                    <span class="status-icon" :class="getStatusClass(row[column.prop])">!</span>
                  </div>
                </template>
                <template v-else>
                  <el-tooltip effect="dark" :content="row[column.prop]" placement="top">
                    <span class="ellipsis">{{ row[column.prop] }}</span>
                  </el-tooltip>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <h3 class="dash-title2">취약점 조치 현황</h3>
        <div class="card wide">
          <el-calendar v-model="selectedDate">
            <template #date-cell="{ data }">
              <div :class="['calendar-day', { today: isToday(data.timestamp) }]">
                {{ data.day.substr(8,9) }}
              </div>
            </template>
          </el-calendar>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { ref, onMounted  } from "vue";
  import { More } from "@element-plus/icons-vue";
  import * as echarts from "echarts";
  export default {
    components: {
      More,
    },
    setup() {

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
      
      const tableColumns = ref([
        { prop: "service", label: "서비스명", width: "200", tooltip: true },
        { prop: "vulnerability", label: "취약점내용", width: "300", tooltip: true },
        { prop: "status", label: "조치현황", width: "150", tooltip: false },
        { prop: "area", label: "점검영역", width: "200", tooltip: true },
        { prop: "dueDate", label: "조치기한", width: "150", tooltip: true },
      ]);
      
      const tableColumns_2 = ref([
        { prop: "service", label: "보안성 심의 과제명", width: "400", tooltip: true },
        { prop: "status", label: "조치현황", width: "150", tooltip: false },
        { prop: "playing", label: "진행단계", width: "200", tooltip: false },
        { prop: "dueDate", label: "심의 상신일", width: "150", tooltip: true },
      ]);

      const tableData = ref([
        {
          service: "결제 시스템",
          vulnerability: "SQL 인젝션 취약점 발견",
          status: "조치필요",
          area: "DB 보안",
          dueDate: "2025-03-01",
        },
        {
          service: "로그인 시스템",
          vulnerability: "취약한 패스워드 정책",
          status: "조치완료",
          area: "인증 보안",
          dueDate: "2025-02-15",
        },
        {
          service: "API 게이트웨이",
          vulnerability: "잘못된 인증 토큰 처리",
          status: "조치완료",
          area: "네트워크 보안",
          dueDate: "2025-02-25",
        },
        {
          service: "API 게이트웨이",
          vulnerability: "잘못된 인증 토큰 처리",
          status: "조치지연",
          area: "네트워크 보안",
          dueDate: "2025-02-25",
        },
        {
          service: "API 게이트웨이",
          vulnerability: "잘못된 인증 토큰 처리",
          status: "조치지연",
          area: "네트워크 보안",
          dueDate: "2025-02-25",
        },
      ]);

      const tableData_2 = ref([
        {
          service: "현대카드 메인 홈페이지",
          status: "조치필요",
          playing: "현업 조치중",
          dueDate: "2025-03-01",
        },
        {
          service: "현대카드 메인 홈페이지",
          status: "조치필요",
          playing: "현업 조치중",
          dueDate: "2025-03-01",
        },
        {
          service: "Dive 앱",
          status: "조치지연",
          playing: "취약점 점검 중",
          dueDate: "2025-03-01",
        },
        {
          service: "현대카드 디자인 라이브러리",
          status: "조치필요",
          playing: "현업 조치중",
          dueDate: "2025-03-01",
        },
        {
          service: "현대카드 메인 홈페이지",
          status: "조치완료",
          playing: "최종 결재완료",
          dueDate: "2025-03-01",
        },
        {
          service: "현대카드앱",
          status: "조치필요",
          playing: "최종 결재완료",
          dueDate: "2025-03-01",
        }
      ]);

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
      const chartData = ref([
        { name: "조치완료", value: 50, color: "#67C23A" }, // 초록색
        { name: "조치필요", value: 30, color: "#E6A23C" }, // 주황색
        { name: "조치지연", value: 20, color: "#F56C6C" }, // 빨간색
      ]);
      const initChart = () => {
        if (!chartRef.value) return;
        const myChart = echarts.init(chartRef.value);

        const option = {
          tooltip: { trigger: "item" },
          legend: { show: false }, // 옆에 퍼센트 리스트를 따로 표시하므로 기본 legend 숨김
          series: [
            {
              name: "취약점 조치 현황",
              type: "pie",
              radius: ["50%", "70%"], // 도넛 모양
              avoidLabelOverlap: false,
              itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
              label: { show: false },
              data: chartData.value.map((item) => ({
                value: item.value,
                name: item.name,
                itemStyle: { color: item.color },
              })),
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", myChart.resize); // 반응형 처리
      };
      onMounted(initChart);

      return { tableColumns, tableData, tableColumns_2, tableData_2, getStatusTag, getStatusClass, sortTable, filterTable, chartRef, chartData, selectedDate, isToday };
    },
};
</script>

<style scoped>
  .main-view {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  /* 그리드 레이아웃 */
  .grid {
    display: grid;
    gap: 20px;
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
  .header-with-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-menu {
    cursor: pointer;
    font-size: 16px;
    color: #999;
    margin-left: 5px;
  }
  .status-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .status-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    color: white;
  }

  .status-success {
    background-color: #67c23a; /* 초록색 */
  }

  .status-warning {
    background-color: #e6a23c; /* 노란색 */
  }

  .status-danger {
    background-color: #f56c6c; /* 빨간색 */
  }
  .chart-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
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
</style>