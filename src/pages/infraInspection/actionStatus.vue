<template>
  <div>
    <h2 class="title">조치현황</h2>
    <div class="filter-header">
      <BaseButtonTab
        v-model="selectedCategory"
        :tabData="categories"
      />
    </div>

    <div class="mb-20 flex gap-10">
      <BaseSelect
        v-model="assetsSelectedStatus"
        placeholder="2025"
        style="max-width: 150px;"
        :selectData="['2025', '2024', '2023']"
      />
      <el-radio-group v-model="selectedStatus" >
        <el-radio-button
          v-for="(status, index) in statusFilters"
          :key="index"
          :label="status"
          :value="status"
          />
      </el-radio-group>
    </div>

    <div class="mb-20">
      <webAppSatus v-if="selectedCategory === '웹 / 앱'"/>
      <infraStatus v-else/>
    </div>

    <div class="mb-20">
      <h4 style="margin-bottom: 15px;">조치현황 상세</h4>
      <p class="flex gap-5" style="margin-bottom: 15px;"><el-icon><CircleCheckFilled /></el-icon>각 항목을 선택하여 세부 점검 결과를 확인하세요.</p>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :span-method="mergeCells"
      >
        <!-- 대상구분 왼쪽 셀 (애플리케이션 / 총계) -->
        <el-table-column prop="category" label="대상구분" />

        <!-- 대상구분 오른쪽 (웹/앱 등 세부 구분) -->
        <el-table-column prop="type" label=" " />

        <!-- 총 자산수 -->
        <el-table-column prop="totalAssets" label="총 자산수" />

        <!-- 2025 전체 그룹 -->
        <el-table-column label="2025 전체">
          <el-table-column prop="plan" label="점검 계획" />
          <el-table-column prop="complete" label="점검 완료" />
          <el-table-column prop="rate" label="점검 비율" />
        </el-table-column>

        <!-- 점검결과 (서버수) 그룹 -->
        <el-table-column label="점검결과 (서버수)">
          <el-table-column prop="count" label="점검 수량" />
          <el-table-column prop="safe" label="양호" />
          <el-table-column prop="weak" label="취약" />
        </el-table-column>
      </el-table>
    </div>

    <div class="white-box">
      <BaseTable
        :tableColumns="tableColumns"
        :tableData="dumiData"
        :allData="dumiData"
        :pageUse="false"
        @cell-click="doRowClick"
      />
    </div>

    <ResultPopup
      :visible="resultPopupVisible"
      @close="resultPopClose"
      @other="mailPopOpen"
    />

    <passivityInspectResultNoticeDialog
      :visible="mailPopupVisible"
      @close="mailPopClose"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from "vue";
import webAppSatus from "./components/webAppSatus.vue";
import infraStatus from "./components/infraStatus.vue";
import ResultPopup from "./dialogs/ResultPopup.vue";
import passivityInspectResultNoticeDialog from "./dialogs/passivityInspectResultNoticeDialog.vue";

const categories = ref(["웹 / 앱", "인프라"]);
const statusFilters = ref(["전체", "상반기", "하반기"]);
const selectedCategory = ref("웹 / 앱");
const selectedStatus = ref("전체");
const assetsSelectedStatus = ref("");
const resultPopupVisible = ref(false);
const mailPopupVisible = ref(false);

const doRowClick = () => {
  resultPopupVisible.value = true;
}
const resultPopClose = () => {
  resultPopupVisible.value = false;
}
const mailPopOpen = () => {
  mailPopupVisible.value = true;
}
const mailPopClose = () => {
  mailPopupVisible.value = false;
}
const tableColumns = [
  { label: '정책코드', prop: 'code', sortable: true},
  { label: '점검항목', prop: 'category', sortable: true },
  { label: '위험등급', prop: 'dangerousLevel', width: 100 },
  { label: '최초결과', prop: 'firstResult' },
  { label: '최종결과', prop: 'lastResult' },
  { label: '예외', prop: 'exception' },
  { label: '상태', prop: 'state' },
  { label: '이력', prop: 'record' },
];
const dumiData = [
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약',   exception: '', state: '양호', record: 'check'},
];
const tableData = [
  {
    category: '애플리케이션',
    type: '웹(WEB)',
    totalAssets: 7,
    plan: '2 🟡',
    complete: '5 🟢',
    rate: '25%',
    count: 4,
    safe: '2 🟢',
    weak: '2 🔴',
  },
  {
    category: '애플리케이션',
    type: '앱(APP)',
    totalAssets: 3,
    plan: '1 🟡',
    complete: '2 🟢',
    rate: '42%',
    count: 3,
    safe: '2 🟢',
    weak: '1 🔴',
  },
  {
    category: '총계',
    type: '', // 합계는 type 없음
    totalAssets: 10,
    plan: '3 🟡',
    complete: '7 🟢',
    rate: '67%',
    count: 7,
    safe: '4 🟢',
    weak: '3 🔴',
  },
]

const mergeCells = ({ rowIndex, columnIndex }) => {
  // 0,1번째 줄은 "애플리케이션" 이 두 칸(rowspan)
  if (columnIndex === 0) {
    if (rowIndex === 0) return [2, 1] // rowspan=2
    if (rowIndex === 1) return [0, 0] // 병합된 셀 숨김
  }

  // 2번째 줄(총계)은 category와 type 셀이 하나로 합쳐짐 (colspan=2)
  if (rowIndex === 2) {
    if (columnIndex === 0) return [1, 2] // colspan=2
    if (columnIndex === 1) return [0, 0] // 병합된 셀 숨김
  }

  return [1, 1] // 나머지는 기본
}
</script>

<style scoped src="@/assets/styles/pages/AssetGroup.css"></style>
