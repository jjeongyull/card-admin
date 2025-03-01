<template>
  <el-row :gutter="20" class="responsive-row">
    <!-- 왼쪽: 트리 데이터 리스트 -->
    <el-col class="data-list" :xs="24" :sm="24" :md="4">
      <h4 class="mb-20">단위정책 탐색</h4>
      <!-- <el-input class="mb-15" v-model="search" placeholder="정책분야 조회" clearable /> -->
      
      <!-- TreeComponent 사용 -->
      <TreeComponent 
        :data="treeData" 
        @edit="editNode" 
        @add="addNode" 
        @delete="deleteNode" 
        @viewData="viewNodeData" 
      />
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

        <el-button class="black-button" type="link">
          <el-icon><Plus /></el-icon>
        </el-button>

        <el-button class="white-button" type="link">
          <el-icon><Delete/></el-icon>
        </el-button>
      </div>

      <!-- 데이터 리스트 -->
      <div class="data-list-scroll">
        <ElcardDiv v-if="dataViewState === 0" :filteredDetails="filteredDetails"></ElcardDiv>
        <JiraTable v-else></JiraTable>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { ElMessage } from 'element-plus';
import TreeComponent from '@/components/TreeComponent.vue'; // 트리 컴포넌트 import
import JiraTable from '@/components/JiraTable.vue';
import ElcardDiv from './components/ElcardDiv.vue';
import menu from '@/data/menu.json';
import policyDetailData from '@/data/policy_detail.json';

// 트리 데이터
const treeData = ref(menu);

// 필터 및 검색어 상태
const search = ref('');
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

// 선택된 노드 저장
const selectedCategory = ref(null);

// 트리 노드 클릭 (편집)
const editNode = (nodeData) => {
  selectedCategory.value = nodeData.menuName;
  ElMessage.info(`수정할 항목: ${nodeData.menuName}`);
};

// 트리 노드 추가
const addNode = (nodeData) => {
  ElMessage.success(`새로운 노드 추가됨: ${nodeData.menuName}`);
};

// 트리 노드 삭제
const deleteNode = (nodeData) => {
  ElMessage.warning(`노드 삭제됨: ${nodeData.menuName}`);
};

// 트리 노드 데이터 보기
const viewNodeData = (nodeData) => {
  ElMessage.info(`노드 정보: ${JSON.stringify(nodeData, null, 2)}`);
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
  padding: 20px 15px;
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
.white-button {
  background-color: #fff !important;
  color: #000 !important;
  border: 1px solid #000 !important;
}
</style>
