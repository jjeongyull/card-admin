<template>
  <div class="responsive-row">
    <!-- 필터 헤더 -->
    <h2 class="title">자산현황</h2>
    <div class="filter-header">
      <BaseButtonTab
        v-model="selectedCategory"
        :tabData="categories"
      />
    </div>

    <el-row :gutter="20" class="responsive-row-inner">
      <!-- 왼쪽: 트리 데이터 리스트 -->
      <el-col :xs="24" :sm="24" :md="5">
        <div class="data-list">
          <div class="left-header mb-20">
            <h4>전체 7건</h4>
            <BaseButton size="small" class="white-button" @click="openAssetPopup">자산 그룹 등록</BaseButton>
          </div>

          <el-row :gutter="10" class="filter-section">
            <el-col :span="9">
              <BaseSelect
                v-model="assetsSelectedStatus"
                placeholder="운영"
                style="width: 100%;"
                :selectData="['운영', '종료', '폐기']"
              />
            </el-col>
            <el-col :span="15">
              <el-input  v-model="assetsSearchQuery" placeholder="자산 그룹명을 입력하세요."/>
            </el-col>
          </el-row>

          <ul class="asset-list list-warpper-500">
            <ExtraList
              v-for="(asset, index) in filteredAssets"
              :key="index"
              :asset="asset"
              @history-click="histoyClick"
              @edit-click="editClick"
            />
          </ul>

        </div>
      </el-col>

      <!-- 오른쪽: 선택된 데이터 상세 -->
      <el-col :xs="24" :sm="24" :md="19">
        <div class="data-details">
          <BaseButtonTab
            v-model="activeTab"
            :tabData="TabList"
            class="mb-10"
            style="width: 100%;"
          />

          <el-row :gutter="10" class="mb-20">
            <el-col :xs="24" :sm="24" :md="7">
              <el-radio-group v-model="selectedCategory" >
                <el-radio-button
                  v-for="(status, index) in statusFilters"
                  :key="index"
                  :label="status"
                  :value="status"
                  @click="setStatusFilter(status)"
                  />
              </el-radio-group>

            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <el-input  v-model="searchQuery" placeholder="정책명을 입력하세요"/>
            </el-col>

            <el-col :xs="12" :sm="6" :md="2">
              <BaseSelect
                v-model="selectedPlatform"
                placeholder="플랫폼"
                style="width: 100%;"
                :selectData="platforms"
              />
            </el-col>

            <el-col :xs="12" :sm="6" :md="2">
              <BaseSelect
                v-model="selectedSecurity"
                placeholder="보안"
                style="width: 100%;"
                :selectData="securityLevels"
              />
            </el-col>

            <el-col :xs="12" :sm="6" :md="2">
              <BaseButton class="black-button w-100" @click="openAssetDataPopup">자산 등록 &nbsp;<el-icon><Plus /></el-icon></BaseButton>
            </el-col>
            <el-col :xs="12" :sm="6" :md="2">
              <BaseButton v-if="tableSelectList.length === 0" class="white-button w-100" @click="openbulkPopup">일괄 등록&nbsp;<el-icon><Upload /></el-icon></BaseButton>
              <BaseButton v-else class="white-button w-100" @click="openbulkUpdatePopup">일괄 변경&nbsp;<el-icon><Edit /></el-icon></BaseButton>
            </el-col>

            <el-col :xs="12" :sm="6" :md="1">
              <BaseButton class="white-button w-100"><el-icon><Download /></el-icon></BaseButton>
            </el-col>
          </el-row>

          <BaseTable
            :tableColumns="columns"
            :tableData="filteredData"
            :allData="tableData"
            @cell-click="handleCellClick"
            @sort="sortTable"
            :currentPage="currentPage"
            :pageSize="pageSize"
            @update:currentPage="updateCurrentPage"
            :cheackValue="true"
            @history-click="histoyClick"
            @actions-click="editClick"
            @selected-rows="tableCheck"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 자산 그룹 등록 -->
    <NewAssetsGroup
      :visible="NewAssetsGroupVisible"
      @close="NewAssetsGroupVisible = false"
      :SelectData="SelectAssetGroupData"
    />

    <!-- 자산 등록 -->
    <NewAssetsData
      :visible="NewAssetsDataVisible"
      @close="NewAssetsDataVisible = false"
    />

    <!-- 히스토리 팝업 -->
     <ChangeLogDialog
      :visible="historyVisible"
      @close="historyVisible = false"
      :changeLogs="changeLogs"
     />

     <!-- 일괄등록 팝업 -->
     <BulkRegistration
      :visible="bulkVisible"
      @close="bulkVisible = false"
      @result="OpenResultPopup"
     />

     <!-- 일괄등록 결과 팝업 -->
     <BulkResult
      :visible="BulkResultVisible"
      @close="BulkResultVisible = false"
      :data="assetsALLResponseData"
     />

  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import NewAssetsGroup from "./components/NewAssetsGroup.vue";
import NewAssetsData from "./components/NewAssetsData.vue";
import BulkRegistration from "./components/BulkRegistration.vue";
import BulkResult from "./components/BulkResult.vue";

// 더미 데이터
const assets = ref([
  { name: "현대카드 IOS 앱 수정", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: ""},
  { name: "Dive 운영관리", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "현대카드", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "Auto Digital", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" },
  { name: "Finance 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32", description: "", files: [], scope: "" }
]);

const assetsSearchQuery = ref("");
const assetsSelectedStatus = ref("");

const filteredAssets = computed(() => {
  return assets.value.filter(asset =>
    (!assetsSelectedStatus.value || asset.status === assetsSelectedStatus.value) &&
    (!assetsSearchQuery.value || asset.name.includes(assetsSearchQuery.value))
  );
});

const sortTable = () => {

}

const categories = ref(["전체", "애플리케이션", "네트워크", "보안장비", "기타그룹"]);
const selectedCategory = ref("전체");
const activeTab = ref('웹/앱');
const searchQuery = ref("");
const selectedPlatform = ref("");
const selectedSecurity = ref("");


watch(activeTab);
const TabList = ref(['웹/앱', '인프라']);
const SelectAssetGroupData = ref(null);
const statusFilters = ["전체", "준비", "운영", "종료", "폐기", "기타"];
const platforms = ["Android", "iOS", "Windows", "Linux"];
const securityLevels = ["높음", "보통", "낮음"];

// 테이블 데이터
const columns = [
  { prop: "status", label: "상태", width: "100", sortable: true },
  { prop: "type", label: "유형", width: "120" },
  { prop: "security", label: "보안", width: "120" },
  { prop: "name", label: "이름", width: "180", tooltip: true },
  { prop: "checkGroup", label: "점검그룹", width: "100" },
  { prop: "os", label: "OS", width: "120" },
  { prop: "domain", label: "운영 도메인", width: "150", tooltip: true },
  { prop: "manager", label: "담당자", width: "120" },
  { prop: "history", label: "이력", width: "80" },
  { prop: "actions", label: "수정", width: "80" },
];

// 예제 데이터
const tableData = ref([
  { status: "운영", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "종료", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
  { status: "폐기", type: "웹", security: "대내", name: "Dive-웹", checkGroup: "[]", os: "Android", domain: "www.운영.com", manager: "관리자" },
]);

// 필터링된 데이터
const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    return (
      (selectedCategory.value === "전체" || item.status === selectedCategory.value) &&
      (!searchQuery.value || item.name.includes(searchQuery.value)) &&
      (!selectedPlatform.value || item.os === selectedPlatform.value) &&
      (!selectedSecurity.value || item.security === selectedSecurity.value)
    );
  });
});

// 상태 필터 변경
const setStatusFilter = (status) => {
  selectedCategory.value = status;
};

// 셀 클릭 이벤트
const handleCellClick = ({ column, row }) => {
  console.log(`${column} 클릭됨`, row);
};

const filter = ref({
  policyName: '',
  priority: '',
  riskLevel: '',
  status: '',
  target: '',
  tag: '',
});
const emit = defineEmits(["selectedCom"]);
const currentPage = ref(1);
const pageSize = ref(3); // 한 페이지에 표시할 개수

// 페이지 변경 이벤트 처리
const updateCurrentPage = (page) => {
  currentPage.value = page;
};

// 자산 그룹 등록
const NewAssetsGroupVisible = ref(false);
const openAssetPopup = () => {
  NewAssetsGroupVisible.value = true;
};

// 자산등록
const NewAssetsDataVisible = ref(false);
const openAssetDataPopup = () => {
  SelectAssetGroupData.value = null;
  NewAssetsDataVisible.value = true;
};

// 자산등록
const bulkVisible = ref(false);
const openbulkPopup = () => {
  bulkVisible.value = true;
};

// 자산 일괄 수정 버튼
const openbulkUpdatePopup = () => {

}

// 자산그룹 히스토리 클릭
const historyVisible = ref(false);
const changeLogs = ref([
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
  { timestamp: "2025-01-02T19:24:12", action: "순서변경", user: "관리자" },
]);

const histoyClick = (items) => {
  historyVisible.value = true;
}

// 자산그룹 수정 클릭
const editClick = (items) => {
  console.log(items)
  SelectAssetGroupData.value = items;
  NewAssetsGroupVisible.value = true;
}

// 자산그룹 일괄등록 결과
const BulkResultVisible = ref(false);
const assetsALLResponseData = ref({
  status: true,
  title: '테스트 2556',
  type: '-',
  other: '자산그룹명 중복'
});
const OpenResultPopup = () => {
  BulkResultVisible.value = true;
}

// 테이블 선택 시
const tableSelectList = ref([]);
const tableCheck = (row) => {
  tableSelectList.value = row;
  console.log(row)
}

</script>

<style scoped src="@/assets/styles/pages/AssetGroup.css"></style>
