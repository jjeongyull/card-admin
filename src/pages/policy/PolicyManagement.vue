<template>
  <el-row class="responsive-row">
    <!-- 왼쪽: 트리 데이터 리스트 -->
    <el-col class="data-list" :xs="24" :sm="24" :md="4">
      <h4 class="mb-20">단위정책 탐색</h4>
      <!-- <el-input class="mb-15" v-model="search" placeholder="정책분야 조회" clearable /> -->
      
      <!-- TreeComponent 사용 -->
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
    </el-col>

    <!-- 오른쪽: 선택된 데이터 상세 -->
    <el-col class="data-details" :xs="24" :sm="24" :md="19">
      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane label="전체" name="all"></el-tab-pane>
        <el-tab-pane label="관리" name="management"></el-tab-pane>
        <el-tab-pane label="기술" name="tech"></el-tab-pane>
        <el-tab-pane label="개인정보" name="privacy"></el-tab-pane>
      </el-tabs>

      <!-- 필터 옵션 -->
      <div class="filters">
        <el-select v-model="filter.policyName" placeholder="정책명" clearable>
          <el-option label="정책명1" value="정책명1" />
          <el-option label="정책명2" value="정책명2" />
          <el-option label="정책명3" value="정책명3" />
        </el-select>
        <el-input v-model="searchDetail" placeholder="정책명을 입력하세요" clearable />
        <el-select v-model="filter.priority" placeholder="중요도" clearable>
          <el-option label="높음" value="high" />
          <el-option label="보통" value="medium" />
          <el-option label="낮음" value="low" />
        </el-select>
        <el-select v-model="filter.riskLevel" placeholder="위험등급" clearable>
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
        </el-select>
        <el-select v-model="filter.status" placeholder="상태" clearable>
          <el-option label="상태1" value="상태1" />
          <el-option label="상태2" value="상태2" />
          <el-option label="상태3" value="상태3" />
        </el-select>

        <el-button class="black-button" type="link" @click="openDataPop">
          단위정책 등록 &nbsp;<el-icon><Plus /></el-icon>
        </el-button>

        <el-button class="white-button" type="link">
          <el-icon><Delete/></el-icon>
        </el-button>
      </div>

      <!-- 데이터 리스트 -->
      <div class="data-list-scroll">
        <!--  @update="openUpdatePop" -->
        <ElcardDiv 
          v-if="dataViewState === 0" :filteredDetails="filteredDetails"
          @openPanel="openDetail"
        ></ElcardDiv>
        <JiraTable v-else></JiraTable>
      </div>
    </el-col>

    <!-- 정책분야 팝업 -->
    <PolicyAddPopup
      v-model="dialogVisible"
      :policyData="selectedPolicy"
      :policyType="policyType"
      @close="closePop"
      @submit="handleSubmit"
      @delete="handleDelete"
    />

    <!-- 단위정책 팝업 -->
    <PolicyDataDialog
      v-model="dataDialogVisible"
      @close="closeDataPop"
    />

     <!-- 상세 패널 -->
     <PolicyDetailPanel 
      :visible="detailVisible" 
      :selectedPolicy="selectedPanel"
      @close="detailVisible = false"
      @update="updateDetail"
      @delete="deleteDetail"
    />
  </el-row>
  
</template>

<script setup>
import menu from '@/data/menu.json';
import { ref, watch, computed } from 'vue';

import { ElMessage } from 'element-plus';
import TreeComponent from '@/components/TreeComponent.vue'; // 트리 컴포넌트 import
import JiraTable from '@/components/JiraTable.vue';
import ElcardDiv from './components/ElcardDiv.vue';
import policyDetailData from '@/data/policy_detail.json';
import PolicyAddPopup from "./components/PolicyAddPopup.vue"; // 정책분야 추가 팝업
import PolicyDataDialog from "./components/PolicyDataDialog.vue"; // 단위정책 추가 팝업
import PolicyDetailPanel from "./components/PolicyDetailPanel.vue"; // 단위정책 디테일 패널

// 트리 데이터
const treeData = ref(menu);

// 정책분야 팝업
const dialogVisible = ref(false);
const selectedPolicy = ref({});
const policyType = ref("");
const openAddPolicyPop = (type="", data=null) => {
  if(type === "parent"){
    policyType.value = type;
    selectedPolicy.value = data;
  }else{
    policyType.value = "";
    selectedPolicy.value = {};
  }
  dialogVisible.value = true;
};
const openUpdatePop = (data) => {
  policyType.value = "edit";
  selectedPolicy.value = data;
  dialogVisible.value = true;
}
const closePop = () => {
  dialogVisible.value = false;
};

// 트리 노드 삭제
const deleteNode = (nodeData) => {
  ElMessage.warning(`노드 삭제됨: ${nodeData.menuName}`);
};

// 트리 노드 데이터 보기
const viewNodeData = (nodeData) => {
  ElMessage.info(`노드 정보: ${JSON.stringify(nodeData, null, 2)}`);
};

// 필터 및 검색어 상태
const searchDetail = ref('');
const activeTab = ref('all');
const filter = ref({
  policyName: '',
  priority: '',
  riskLevel: '',
  status: '',
});

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


// 단위정책추가 팝업
const dataDialogVisible = ref(false);
const openDataPop = () => {
  dataDialogVisible.value = true;
};
const closeDataPop = () => {
  dataDialogVisible.value = false;
};


// 단위정책 패널
const detailVisible = ref(false);
const selectedPanel = ref({});
const openDetail = (row) => {
  selectedPanel.value = row;
  detailVisible.value = true;
};
const updateDetail = (updatedData) => {
  console.log("업데이트된 데이터:", updatedData);
};
const deleteDetail = (policy) => {
  console.log("삭제된 정책:", policy);
  detailVisible.value = false;
};

</script>

<style scoped>
.content-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100%;
}
.tree-container {
  max-height: 600px;
  padding-right: 10px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mb-15 {
  margin-bottom: 15px;
}
.data-list {
  background: #fff;
  padding: 25px 15px;
  border-radius: 8px;
  height: 100%;
}
.data-details {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px !important;
  border-radius: 8px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.data-list-scroll {
  width: 100%;
}
.responsive-row {
  justify-content: center;
  gap: 20px;
  height: 100%;
}
@media (max-width: 600px) {
  .responsive-row {
    flex-wrap: wrap;
    height: fit-content;
  }
}
.black-button {
  background-color: #000 !important;
  color: #fff !important;
  border: none !important;
}
.black-button .el-icon {
  color: #fff !important;
}
.white-button {
  background-color: #fff !important;
  color: #000 !important;
  border: 1px solid #000 !important;
  margin-left: 0;
}
.add-policy-button {
  text-align: left;
  padding: 10px;
  font-size: 14px;
  color: #8c8c8c; /* 연한 회색 */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.add-policy-button:hover {
  color: #000; /* 마우스 오버 시 검정색 */
}
</style>
<style>
.custom-tabs .el-tabs__header .el-tabs__item {
  font-weight: bold !important;
}
.custom-tabs .el-tabs__item.is-active, .el-tabs__item:hover {
  color: #000 !important;
}
.custom-tabs .el-tabs__active-bar{
  background-color: #000 !important;
}
</style>
