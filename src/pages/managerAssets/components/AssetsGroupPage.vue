<template>
  <div>
    <div class="mb-20 flex-end">
      <BaseButton class="black-button" @click="assetsGroupOpen">점검그룹 등록 &nbsp; <el-icon><Plus/></el-icon></BaseButton>
    </div>

    <BaseTable
      :tableColumns="columns"
      :tableData="tableData"
      :allData="tableData"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @update:currentPage="updateCurrentPage"
      @cell-click="handleCellClick"
    />

    <!-- 점검그룹 등록 팝업 -->
    <AssetManagerDialog
    :visible="CreateAssetsGroupVisible"
    @close="assetsGroupClose"
    @other="AddInspectAssetDialogOpen"
    :table-list="assetsGroupList"
    />

    <!-- 점검그룹 추가 팝업 -->
    <AddInspectAssetDialog
      :visible="AddInspectAssetDialogVisible"
      @close="AddInspectAssetDialogClose"
      @result="creatAssetGroupList"
    />

  </div>
</template>

<script setup>
import { ref } from "vue";
import AssetManagerDialog from "../dialogs/AssetManagerDialog.vue";
import AddInspectAssetDialog from "../dialogs/AddInspectAssetDialog.vue";

// 자산점검 등록 리스트
const assetsGroupList = ref([]);

// 자산점검 등록하기
const creatAssetGroupList = (items) => {
  assetsGroupList.value = items;
}
// 자산등록 팝업관리
const CreateAssetsGroupVisible = ref(false);
const assetsGroupOpen = () => {
  CreateAssetsGroupVisible.value = true;
}
const assetsGroupClose = () => {
  CreateAssetsGroupVisible.value = false;
}

// 점검그룹 추가 팝업
const AddInspectAssetDialogVisible = ref(false);
const AddInspectAssetDialogOpen = () => {
  AddInspectAssetDialogVisible.value = true;
}
const AddInspectAssetDialogClose = () => {
  AddInspectAssetDialogVisible.value = false;
}

// cell을 클릭했을때 점검그룹 수정 창
const handleCellClick = (items) => {

  let columName = items.column;

  if(columName === 'name'){

  }
}

const currentPage = ref(1);
const pageSize = ref(5); // 한 페이지에 표시할 개수
// 페이지 변경 이벤트 처리
const updateCurrentPage = (page) => {
  currentPage.value = page;
};
const columns = ref([
{ prop: "name", label: "그룹명", width: "600", sortable: true },
{ prop: "all", label: "전체", width: "100", sortable: true },
{ prop: "web", label: "웹", width: "100", sortable: true },
{ prop: "app", label: "앱", width: "100", sortable: true },
{ prop: "network", label: "네트워크", width: "120", sortable: true },
{ prop: "secure", label: "보안장비", width: "120", sortable: true },
{ prop: "server", label: "서버", width: "100", sortable: true },
{ prop: "db", label: "DB", width: "100", sortable: true },
{ prop: "wws", label: "WEB/WAS", width: "100", sortable: true },
]);
const tableData = ref([
  {name: '현대카드 인프라 점검용', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: 'Dive 앱 점검', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '현대카드 메인 홈페이지', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '테스트 점검 그룹', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '인프라 점검용', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '현대카드 인프라 점검용', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '앱 점검', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '테스트 점검', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '현대카드 메인 홈페이지', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '앱 점검', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
  {name: '앱 점검', all: 12, web: 3, app: 2, network: 1, secure: 4, server: 5, db: 2, wws: 4},
]);
</script>

<style scoped>

</style>