<template>
  <div>
    <h2 class="title">수동점검</h2>
    <div class="data-details">
      <el-row :gutter="5" class="mb-20">
        <el-col :xs="24" :sm="24" :md="10">
          <el-radio-group v-model="activeTab" class="status-buttons">
            <el-radio-button
              v-for="(status, index) in TabList"
              :key="index"
              :label="status"
              :value="status"
              class="w-full"
              />
          </el-radio-group>
        </el-col>
        <el-col :xs="24" :sm="24" :md="2">
          <BaseSelect
            v-model="inspectionName"
            placeholder="점검명"
            :selectData="['점검명1', '점검명2', '점검명3']"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="5">
          <el-input
            v-model="searchDetail"
            placeholder="검색어를 입력하세요"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="2">
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="시작일자"
            style="width: 100%;"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="2">
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="종료일자"
            style="width: 100%;"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="3" style="display: flex; flex-wrap: nowrap; gap: 5px;">
          <BaseButton class="white-button"><el-icon><Download/></el-icon></BaseButton>
          <BaseButton class="black-button w-full">점검프로젝트 등록&nbsp;<el-icon><Plus/></el-icon></BaseButton>
        </el-col>
      </el-row>

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
const TabList = ref(["전체", "서버", "운영", "DB", "네트워크", "보안장비", "WEB/WES", "전문", "웹", "앱"]);
const inspectionName = ref('');
const searchDetail = ref('');
const startDate = ref('');
const endDate = ref('');


// 상세보기 페이지로 이동
const doRowClick = () => {
  uRouter.goToByName('passivityInspectionDetail');
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