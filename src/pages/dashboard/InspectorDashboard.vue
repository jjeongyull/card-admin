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
        <AccordionItem title="조치 필요 취약점" defaultState>
          <p style="font-size: 20px; font-weight: 900; margin-bottom: 5px;">12<span style="font-size: 12px; color: #777777;">개</span></p>
          <p style="font-size: 12px; color: #777777;">이전달 대비 <span style="color: #D32F2F;">+9</span></p>
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8">
        <AccordionItem title="점검 필요.예정 현황" defaultState>
          <el-row class="card-content">
            <el-col :span="6" class="card-item">
              <span>전자금융기반 시설</span>
              <p><strong>12</strong>개</p>
            </el-col>
            <el-col :span="6" class="card-item">
              <span>보안성 심의</span>
              <p><strong>12</strong>개</p>
            </el-col>
            <el-col :span="6" class="card-item">
              <span>소스코드/오픈소스</span>
              <p><strong>12</strong>개</p>
            </el-col>
            <el-col :span="6" class="card-item">
              <span>CVE</span>
              <p><strong>12</strong>개</p>
            </el-col>
          </el-row>
        </AccordionItem>
      </el-col>
    </el-row>


    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="이행점검 목록" defaultState>
            <BaseTable :tableColumns="tableColumns" :tableData="tableData" :allData="tableData" />
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="취약점 현황" defaultState>
          <BaseTable :tableColumns="tableColumns" :tableData="tableData" :allData="tableData" />
        </AccordionItem>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="responsive-row">
      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="보안선 심의 현황" defaultState>
          <BaseTable :tableColumns="tableColumns_2" :tableData="tableData_2" :allData="tableData_2" />
        </AccordionItem>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12">
        <AccordionItem title="취약점 조치 현황" defaultState>
          <BaseTable :tableColumns="tableColumns_2" :tableData="tableData_2" :allData="tableData_2" />
        </AccordionItem>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

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


onMounted(() => {
  loadTableData();
});

</script>

<style scoped src="@/assets/styles/pages/Summary.css"></style>
