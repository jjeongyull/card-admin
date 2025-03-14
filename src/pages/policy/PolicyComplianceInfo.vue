

<template>
<div class="responsive-row">

    <div class="category-slider">
      <!-- 왼쪽 스크롤 버튼 -->
      <BaseButton class="scroll-btn left-btn" @click="scrollLeft">
        <el-icon><ArrowLeft /></el-icon>
      </BaseButton>

      <!-- 가로 스크롤 가능한 리스트 -->
      <el-scrollbar ref="scrollbarRef" class="scroll-container" wrap-class="scroll-wrap">
        <div class="scroll-content">
          <BaseButton
            v-for="compliance in complianceList"
            :key="compliance.id"
            class="category-item"
            @click="selectCategory(compliance.id)"
          >
            {{ compliance.title }}
          </BaseButton>
        </div>
      </el-scrollbar>

      <!-- 오른쪽 스크롤 버튼 -->
      <BaseButton class="scroll-btn right-btn" @click="scrollRight">
        <el-icon><ArrowRight /></el-icon>
      </BaseButton>

      <!-- 신규 추가 버튼 -->
      <BaseButton class="black-button" @click="openCompliancepup">
        신규 컴플라이언스 &nbsp;<el-icon><Plus /></el-icon>
      </BaseButton>
    </div>

    <el-row :gutter="20" class="responsive-row-inner">
    <!-- 왼쪽: 트리 데이터 리스트 -->
      <el-col :xs="24" :sm="24" :md="4">
        <div class="data-list">
          <h4 class="mb-20">{{ treeTitle }}</h4>
          <TreeComponent
            :data="treeData"
            @edit="openUpdatePop"
            @add="openAddPolicyPop"
            @delete="deleteNode"
            @viewData="viewNodeData"
          />
          <div class="add-policy-button" @click="openAddPolicyPop">
            정책분야 추가 <el-icon><Plus /></el-icon>
          </div>
        </div>
      </el-col>

      <!-- 오른쪽: 선택된 데이터 상세 -->
      <el-col :xs="24" :sm="24" :md="20">
        <div class="data-details">
          <el-tabs v-model="activeTab" class="custom-tabs">
            <el-tab-pane label="전체" name="all"></el-tab-pane>
            <el-tab-pane label="관리" name="management"></el-tab-pane>
            <el-tab-pane label="물리" name="physics"></el-tab-pane>
            <el-tab-pane label="기술" name="tech"></el-tab-pane>
            <el-tab-pane label="개인정보" name="privacy"></el-tab-pane>
            <el-tab-pane label="기타" name="other"></el-tab-pane>
            <el-tab-pane label="N/A" name="n/a"></el-tab-pane>
          </el-tabs>

          <el-row :gutter="10" class="mb-10">
            <el-col :xs="24" :sm="24" :md="3">
              <el-select v-model="filter.policyName" placeholder="정책명" clearable>
                <el-option label="정책명1" value="정책명1" />
                <el-option label="정책명2" value="정책명2" />
                <el-option label="정책명3" value="정책명3" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="24" :md="5">
              <el-input v-model="searchDetail" placeholder="정책명을 입력하세요" clearable />
            </el-col>
            <el-col :xs="24" :sm="24" :md="3">
              <el-select v-model="filter.priority" placeholder="중요도" clearable>
                <el-option label="높음" value="high" />
                <el-option label="보통" value="medium" />
                <el-option label="낮음" value="low" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <el-select v-model="filter.riskLevel" placeholder="위험등급" clearable>
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <el-select v-model="filter.target" placeholder="대상구분" clearable>
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <el-select v-model="filter.tag" placeholder="태그" clearable>
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <el-select v-model="filter.status" placeholder="상태" clearable>
                <el-option label="상태1" value="상태1" />
                <el-option label="상태2" value="상태2" />
                <el-option label="상태3" value="상태3" />
              </el-select>
            </el-col>
            <el-col :sm="12" :md="3">
              <BaseButton class="black-button w-100" type="link" @click="openDataPop">
                단위정책 등록 &nbsp;<el-icon><Plus /></el-icon>
              </BaseButton>
            </el-col>
            <el-col :sm="6" :md="1">
              <BaseButton class="white-button w-100" type="link">
                <el-icon><Delete/></el-icon>
              </BaseButton>
            </el-col>
            <el-col :sm="6" :md="1">
              <BaseButton class="white-button w-100" type="link" @click="openDialog">
                <el-icon><Operation /></el-icon>
              </BaseButton>
            </el-col>
          </el-row>

          <div>
            <!--  @update="openUpdatePop" -->
            <ElcardDiv
              :filteredDetails="filteredDetails"
              @openPanel="openDetail"
            ></ElcardDiv>
          </div>

        </div>
      </el-col>
    </el-row>

    <!-- 신규 컴플라이언스 추가 -->
    <NewCompliance
      :visible="NewComplianceVisible"
      @close="NewComplianceVisible = false"
      :selectData="selectComplianceData"
    />

    <!-- 로그 리스트 -->
    <ChangeLogDialog
      :visible="dialogVisible"
      :changeLogs="changeLogs"
      @close="dialogVisible = false"
    />

  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

import menu from '@/data/menu.json';
import policyDetailData from '@/data/policy_detail.json';

import ElcardDiv from './components/ElcardDiv.vue';
import NewCompliance from "./components/NewCompliance.vue";

const props = defineProps({
  complianceList: Array,
  selectComplianceCategory: Object
});
const treeTitle = ref(props.selectComplianceCategory.title);
watch(
  () => props.selectComplianceCategory, // selectCompliance 값 감지
  (newValue, oldValue) => {
    treeTitle.value = newValue.title
    console.log("selectComplianceCategory 변경");
    console.log("이전 값:", oldValue);
    console.log("새로운 값:", newValue);
  },
  { deep: true, immediate: true } // 객체 내부 변화 감지 + 컴포넌트 초기 실행
);
const emit = defineEmits(["selectedCom"]);
const scrollbarRef = ref(null);
const dialogVisible = ref(false);
// 필터 및 검색어 상태
const searchDetail = ref('');
const activeTab = ref('all');
const filter = ref({
  policyName: '',
  priority: '',
  riskLevel: '',
  status: '',
  target: '',
  tag: '',
});

const selectComplianceData = ref(null);


// 탭 버튼 상태
const dataViewState = ref(0);
watch(activeTab, (newValue) => {
  dataViewState.value = newValue === "privacy" ? 1 : 0;
});

// 정책 데이터
const details = ref(policyDetailData);
const filteredDetails = computed(() => {
  return details.value.filter(item =>
    (!filter.value.policyName || item.category === filter.value.policyName) &&
    (!searchDetail.value || item.title.includes(searchDetail.value))
  );
});

// 트리 데이터
const treeData = ref(menu);

const complianceList = ref(props.complianceList);

const scrollLeft = () => {
  const wrap = scrollbarRef.value?.$el?.querySelector(".el-scrollbar__wrap");
  wrap.scrollLeft -= 150; // 왼쪽으로 스크롤
};

const scrollRight = () => {
  const wrap = scrollbarRef.value?.$el?.querySelector(".el-scrollbar__wrap");
  wrap.scrollLeft += 150; // 오른쪽으로 스크롤
}

const selectCategory = (id) => {
  emit("selectedCom", id);
}

// 신규 컴플라이언스
const NewComplianceVisible = ref(false);
const openCompliancepup = () => {
  selectComplianceData.value = null;
  NewComplianceVisible.value = true;
};

// 신규컴플라이언스 수정
const openDetail = (data) => {
  selectComplianceData.value = data;
  NewComplianceVisible.value = true;
}

// 로그데이터
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

const openDialog = () => {
  dialogVisible.value = true;
}
</script>
<style scoped src="@/assets/styles/pages/PolicyManagement.css"></style>