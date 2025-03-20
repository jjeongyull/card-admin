<template>
  <div class="responsive-row">
    <el-row :gutter="20" class="responsive-row-inner">
    <!-- 왼쪽: 트리 데이터 리스트 -->
      <el-col :xs="24" :sm="24" :md="4">
        <div class="data-list">
          <h4 class="mb-20">단위정책 탐색</h4>
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
          <BaseButtonTab
            v-model="activeTab"
            :tabData="TabList"
          />

          <el-row :gutter="10" class="mb-10">
            <el-col :xs="24" :sm="24" :md="3">
              <BaseSelect
                v-model="filter.policyName"
                placeholder="정책명"
                :selectData="['정책명1', '정책명2', '정책명3']"
              />
            </el-col>
            <el-col :xs="24" :sm="24" :md="5">
              <el-input
                v-model="searchDetail"
                placeholder="정책명을 입력하세요"
              />
            </el-col>
            <el-col :xs="24" :sm="24" :md="3">
              <BaseSelect
                v-model="filter.priority"
                placeholder="중요도"
                :selectData="['높음', '보통', '낮음']"
              />
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <BaseSelect
                v-model="filter.priority"
                placeholder="위험등급"
                :selectData="['1', '2', '3']"
              />
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <BaseSelect
                v-model="filter.target"
                placeholder="대상구분"
                :selectData="['1', '2', '3']"
              />
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <BaseSelect
                v-model="filter.tag"
                placeholder="태그"
                :selectData="['1', '2', '3']"
              />
            </el-col>
            <el-col :xs="24" :sm="24" :md="2">
              <BaseSelect
                v-model="filter.status"
                placeholder="상태"
                :selectData="['상태1', '상태2', '상태3']"
              />
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
              <BaseButton class="white-button w-100" type="link">
                <el-icon><Operation /></el-icon>
              </BaseButton>
            </el-col>
          </el-row>

          <div>
            <!--  @update="openUpdatePop" -->
            <BaseList
              :filteredDetails="filteredDetails"
              @openPanel="openDetail"
            ></BaseList>
          </div>
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
  </div>


</template>

<script setup>
import menu from '@/data/menu.json';
import { ref, watch, computed } from 'vue';

import { ElMessage } from 'element-plus';
import policyDetailData from '@/data/policy_detail.json';
import PolicyAddPopup from "./components/PolicyAddPopup.vue"; // 정책분야 추가 팝업
import PolicyDataDialog from "./components/PolicyDataDialog.vue"; // 단위정책 추가 팝업


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
const activeTab = ref('전체');
const TabList = ref(["전체", "관리", "기술", "개인정보"]);
const filter = ref({
  policyName: '',
  priority: '',
  riskLevel: '',
  status: '',
  target: '',
  tag: '',
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

<style scoped src="@/assets/styles/pages/PolicyManagement.css"></style>
