<template>
  <div class="responsive-row">
    <!-- 필터 헤더 -->
    <h2 class="title">자산현황</h2>
    <div class="filter-header">
      <el-tabs v-model="selectedCategory" class="custom-tabs">
        <el-tab-pane
          v-for="(category, index) in categories"
          :key="index"
          :label="category"
          :name="category"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <el-row :gutter="20" class="responsive-row-inner">
      <!-- 왼쪽: 트리 데이터 리스트 -->
      <el-col :xs="24" :sm="24" :md="5">
        <div class="data-list">
          <div class="left-header mb-20">
            <h4>전체 7건</h4>
            <BaseButton size="small">자산 그룹 등록</BaseButton>
          </div>

          <el-row :gutter="10" class="filter-section">
            <el-col :span="9">
              <el-select v-model="assetsSelectedStatus" placeholder="운영" clearable>
                <el-option label="운영" value="운영" />
                <el-option label="종료" value="종료" />
                <el-option label="폐기" value="폐기" />
              </el-select>
            </el-col>
            <el-col :span="15">
              <el-input v-model="assetsSearchQuery" placeholder="자산 그룹명을 입력하세요." clearable />
            </el-col>
          </el-row>

          <div class="asset-list list-warpper-500">
            <AssetItem
              v-for="(asset, index) in filteredAssets"
              :key="index"
              :asset="asset"
            />
          </div>

        </div>
      </el-col>

      <!-- 오른쪽: 선택된 데이터 상세 -->
      <el-col :xs="24" :sm="24" :md="19">
        <div class="data-details">
          <el-tabs v-model="activeTab" class="custom-tabs mb-20">
            <el-tab-pane label="웹/앱" name="웹/앱"></el-tab-pane>
            <el-tab-pane label="인프라" name="인프라"></el-tab-pane>
          </el-tabs>

          <el-row :gutter="10" class="mb-20">
            <el-col :xs="24" :sm="24" :md="7">
              <el-button-group class="status-buttons">
                <BaseButton
                  v-for="(status, index) in statusFilters"
                  :key="index"
                  :class="{ active: activeStatus === status }"
                  @click="setStatusFilter(status)"
                >
                  {{ status }}
                </BaseButton>
              </el-button-group>
            </el-col>
            <el-col :xs="24" :sm="12" :md="10">
              <el-input v-model="searchQuery" placeholder="정책명을 입력하세요" clearable />
            </el-col>

            <el-col :xs="12" :sm="6" :md="2">
              <el-select v-model="selectedPlatform" placeholder="플랫폼" clearable>
                <el-option v-for="platform in platforms" :key="platform" :label="platform" :value="platform" />
              </el-select>
            </el-col>

            <el-col :xs="12" :sm="6" :md="2">
              <el-select v-model="selectedSecurity" placeholder="보안" clearable>
                <el-option v-for="security in securityLevels" :key="security" :label="security" :value="security" />
              </el-select>
            </el-col>

            <el-col :xs="12" :sm="6" :md="2">
              <BaseButton class="black-button w-100">자산 등록 <el-icon><Plus /></el-icon></BaseButton>
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
          />
        </div>
      </el-col>
    </el-row>



  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AssetItem from "./components/AssetItem.vue";

// 더미 데이터
const assets = ref([
  { name: "현대카드 IOS 앱 수정", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "Dive 운영관리", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "현대카드", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "Auto Digital", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "현대카드용 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" },
  { name: "Finance 서버", status: "운영", managers: ["관리자", "김민준"], date: "2023-03-28 16:14:32" }
]);

const assetsSearchQuery = ref("");
const assetsSelectedStatus = ref("");

const filteredAssets = computed(() => {
  return assets.value.filter(asset =>
    (!assetsSelectedStatus.value || asset.status === assetsSelectedStatus.value) &&
    (!assetsSearchQuery.value || asset.name.includes(assetsSearchQuery.value))
  );
});

const categories = ref(["전체", "애플리케이션", "보안장비", "기타그룹"]);
const selectedCategory = ref("전체");
const activeTab = ref('웹/앱');
const searchQuery = ref("");
const selectedPlatform = ref("");
const selectedSecurity = ref("");


watch(activeTab);

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

</script>

<style scoped src="@/assets/styles/pages/AssetGroup.css"></style>
