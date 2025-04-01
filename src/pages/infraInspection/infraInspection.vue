<template>
  <div >
    <h2 class="title">인프라 점검</h2>

    <el-row :gutter="10" class="mb-20">
      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <BaseCard title="진행중인 점검">
          <div>
            <p ref="progressText" class="progress-text">현대카드 인프라 점검용 5%</p>
            <progress class="progress-bar" value="5" max="100"></progress>
          </div>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <BaseCard title="대기중인 점검">
          <div>
            <p ref="progressText" class="progress-text" style="margin-bottom: 5px;">
              Dive 앱 서버 주기 점검
            </p>
            <p style="font-size: 12px; color: #777777;">등 3건</p>
          </div>
        </BaseCard>
      </el-col>
    </el-row>
    <div class="data-details">
      <div class="flex-space mb-20">
        <div class="flex gap-5">
          <BaseSelect
            v-model="selectYear"
            placeholder="년도"
            class="category-select"
            :selectData="['2025', '2024', '2023']"
          />
          <BaseSelect
            v-model="selectInspection"
            class="category-select"
            placeholder="점검명"
            :selectData="['점검명1', '점검명2', '점검명3']"
          />
          <el-input v-model="searchValue" placeholder="검색어" />
        </div>
        <div class="flex gap-5">
          <BaseButton class="white-button"><el-icon><Download/></el-icon></BaseButton>
          <BaseButton @click="openInspectPopup" class="black-button">점검프로젝트 등록&nbsp;<el-icon><Plus/></el-icon></BaseButton>
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


    <!-- 점검프로젝트 등록 팝업 -->
    <InfraInspectDialog
      :visible="inspectPopupVisible"
      @close="() => {inspectPopupVisible = false; selectedData=null; selectInspectList=[]}"
      :selectData="selectedData"
      :tableList="selectInspectList"
      @other="openAddInspectDialog"
    />

    <!-- 점검대상 등록 팝업 -->
     <AddInspectAssetDialog
      :visible="addInspectAssetVisible"
      @close="() => {addInspectAssetVisible = false;}"
      @result="creatInspectList"
     />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import InfraInspectDialog from './dialogs/InfraInspectDialog.vue';
import AddInspectAssetDialog from './dialogs/AddInspectAssetDialog.vue';
import uRouter from '@/utils/uRouter';

const selectYear = ref('2025');
const selectInspection = ref('');
const searchValue = ref('');

// 점검프로젝트 등록 팝업 관련
const inspectPopupVisible = ref(false);
const selectedData = ref(null)
const openInspectPopup = () => {
  inspectPopupVisible.value = true;
}

// 점검대상 등록 팝업 관련
const addInspectAssetVisible = ref(false);
const selectInspectList = ref([]);
const openAddInspectDialog = () => {
  addInspectAssetVisible.value = true;
}
// 자산점검 등록하기
const creatInspectList = (items) => {
  selectInspectList.value = items;
}

const currentPage = ref(1);
const pageSize = ref(5); // 한 페이지에 표시할 개수
const updateCurrentPage = (page) => {
  currentPage.value = page;
};

// 상세보기 페이지로 이동
const doRowClick = () => {
  uRouter.goToByName('infraDetail');
}

// 더미데이터
const tableColumns = [
  { label: '점검명', prop: 'title', sortable: true},
  { label: '점검대상', prop: 'target', width: 250 },
  { label: '점검 주기', prop: 'cycle', width: 100 },
  { label: '점검 시작일시', prop: 'startData' },
  { label: '점검율', prop: 'percent' },
  { label: '등록자', prop: 'manager', width: 130 },
  { label: '등록일자', prop: 'writeDate', width: 100 },
  { label: '수정', prop: 'update', width: 50 },
];
const dumiData = [
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
  {title: 'Dive 앱 서버 주기 점검', target: 'OS:2, DBMS: 4, WEB/WAS: 3', cycle: '주기', startData: '02/28 20:01:13', percent: '5%', manager: '총괄 관리자', writeDate: '02/28', update: '수정'},
]
</script>

<style scoped src="@/assets/styles/pages/AssetGroup.css"></style>