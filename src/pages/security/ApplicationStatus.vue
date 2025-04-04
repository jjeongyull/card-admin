<template>
  <div>
    <h2 class="title">신청현황</h2>
    <div class="data-details">
      <div class="flex-space mb-20">
        <div class="flex gap-10 w-full">
          <el-radio-group v-model="activeTab">
            <el-radio-button
              v-for="(status, index) in TabList"
              :key="index"
              :label="status"
              :value="status"
              />
          </el-radio-group>
          <BaseSelect
            v-model="inspectionName"
            placeholder="전체"
            style="max-width: 140px;"
            :selectData="['전체', '전체', '전체']"
          />
        </div>
        <div class="flex gap-10 w-full end">
          <BaseSelect
            v-model="inspectionName"
            placeholder="심의 신청명"
            style="max-width: 140px;"
            :selectData="['심의 신청명', '심의 신청명', '심의 신청명']"
          />
          <el-input
            v-model="searchDetail"
            style="max-width: 300px;"
            placeholder="검색어를 입력하세요"
          />
          <BaseButton class="black-button" @click="openInspectPopup">심의 신청&nbsp;<el-icon><Plus/></el-icon></BaseButton>
        </div>
      </div>

      <BaseTable
        :tableColumns="tableColumns"
        :tableData="dumiData"
        :allData="dumiData"
        @cell-click="doRowClick"
        @sort=""
        :currentPage="currentPage"
        :pageSize="pageSize"
        @update:currentPage="updateCurrentPage"
        @history-click=""
        @actions-click=""
        @selected-rows="tableCheck"
      />
    </div>

  </div>
</template>

<script setup>
import {ref} from 'vue';
import uRouter from '@/utils/uRouter';

const activeTab = ref('전체');
const TabList = ref(["전체", "개발", "전문", "ADSL"]);
const inspectionName = ref('');
const searchDetail = ref('');


// 상세보기 페이지로 이동
const doRowClick = () => {
  uRouter.goToByName('applyStatusDetail');
}
const currentPage = ref(1);
const pageSize = ref(5); // 한 페이지에 표시할 개수
const updateCurrentPage = (page) => {
  currentPage.value = page;
};
// 더미데이터
const tableColumns = [
  { label: '구분', prop: 'division', sortable: true, width: 80},
  { label: '대량수량', prop: 'count', width: 100},
  { label: '점검명', prop: 'title', sortable: true},
  { label: '보고시기', prop: 'reportDate', sortable: true, width: 120},
  { label: '점검 시작일시', prop: 'startData', width: 150},
  { label: '점검 종료일시', prop: 'endtData', width: 150},
  { label: '등록자', prop: 'manager', width: 130 },
  { label: '등록일자', prop: 'writeDate', width: 100 },
  { label: '수정', prop: 'update', width: 50 }
];
const dumiData = [
  {division: '웹', count: 4, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '서버(OS)', count: 2, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '웹', count: 4, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '서버(OS)', count: 2, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '웹', count: 4, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '서버(OS)', count: 2, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '웹', count: 4, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '서버(OS)', count: 2, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '웹', count: 4, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {division: '서버(OS)', count: 4, title: 'Dive 앱 서버 주기 점검', reportDate: '상반기', startData: '02/28 20:01:13', endData: '02/28 20:01:13', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
];
</script>

<style scoped src="@/assets/styles/pages/AssetGroup.css"></style>