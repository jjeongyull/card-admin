<template>
  <!-- <div class="content-container"> -->
    <!-- 왼쪽: 데이터 리스트 -->
    <el-row :gutter="20" class="responsive-row">
      <el-col class="data-list" :xs="24" :sm="24" :md="4">
        <h4 class="mb-20">단위정책 탐색</h4>
        <el-input class="mb-15" v-model="search" placeholder="정책분야 조회" clearable />
        <el-scrollbar class="tree-container">
          <el-tree
            class="tree-list custom-tree"
            :data="formattedTreeData"
            :default-expand-all="false"
            highlight-current
            :props="treeProps"
            @node-click="handleNodeClick"
            :render-content="renderContent"
          />
        </el-scrollbar>
      </el-col>

      <!-- 오른쪽: 선택된 데이터 상세 -->
      <el-col class="data-details" :xs="24" :sm="24" :md="19" >
        <el-tabs v-model="activeTab" class="custom-tabs">
          <el-tab-pane label="전체" name="all"></el-tab-pane>
          <el-tab-pane label="관리" name="management"></el-tab-pane>
          <el-tab-pane label="기술" name="tech"></el-tab-pane>
          <el-tab-pane label="개인정보" name="privacy"></el-tab-pane>
        </el-tabs>

        <!-- 필터 옵션 -->
        <div class="filters">
          <el-select v-model="filter" placeholder="정책명" clearable>
            <el-option label="정책명1" value="정책명1" />
            <el-option label="정책명2" value="정책명2" />
            <el-option label="정책명3" value="정책명3" />
          </el-select>
          <el-input v-model="searchDetail" placeholder="정책명을 입력하세요" clearable />
          <el-select v-model="filter" placeholder="중요도" clearable>
            <el-option label="높음" value="high" />
            <el-option label="보통" value="medium" />
            <el-option label="낮음" value="low" />
          </el-select>
          <el-select v-model="filter" placeholder="위험등금" clearable>
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
          </el-select>
          <el-select v-model="filter" placeholder="대상구분" clearable>
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
          </el-select>
          <el-select v-model="filter" placeholder="태그" clearable>
            <el-option label="태그1" value="태그1" />
            <el-option label="태그2" value="태그2" />
            <el-option label="태그3" value="태그3" />
          </el-select>
          <el-select v-model="filter" placeholder="상태" clearable>
            <el-option label="상태1" value="상태1" />
            <el-option label="상태2" value="상태2" />
            <el-option label="상태3" value="상태3" />
          </el-select>
          
          <el-button class="black-button">
            <el-icon><Plus /></el-icon>
          </el-button>

          <el-button class="white-button">
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>

        <!-- 데이터 리스트 -->
        <div class="data-list-scroll">
          <ElcardDiv v-if="dataViewState === 0" :filteredDetails="filteredDetails"></ElcardDiv>
          <JiraTable v-else></JiraTable>
        </div>
      </el-col>
    </el-row>
    
  <!-- </div> -->
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue';
import { ElButton, ElIcon, ElMessage } from 'element-plus';
import { computed, ref, watch } from 'vue';

import JiraTable from '@/components/JiraTable.vue';
import ElcardDiv from './components/ElcardDiv.vue';

import policyData from '@/data/policy.json';
import policyDetailData from '@/data/policy_detail.json';

const search = ref('');
const searchDetail = ref('');
const activeTab = ref('all');
const filter = ref('');

// 탭버튼(보기 형식)
const dataViewState = ref(0);

watch(activeTab, (newValue) => {
  dataViewState.value = newValue === "privacy" ? 1 : 0;
});
const details = ref(policyDetailData);

const formatTree = (nodes) => {
  return nodes.map(node => ({
    label: node._custom?.value?.categoryName || node._custom?.value?.categoryName, // description이 없으면 categoryName 표시
    children: node._custom?.value?.children ? formatChildrenTree(node._custom.value.children) : []
  }))
}

const formatChildrenTree = (nodes) => {
  return nodes.map(node => ({
    label: node.categoryName || node.categoryName, // description이 없으면 categoryName 표시
    children: node?.children ? formatChildrenTree(node.children) : []
  }))
}

const formattedTreeData = computed(() => formatTree(policyData));
const treeProps = {
  children: 'children',
  label: 'label'
}

const selectedCategory = ref(null);


const filteredDetails = computed(() => {
  return details.value.filter(item =>
    (!filter.value || item.category === filter.value) &&
    (!searchDetail.value || item.title.includes(searchDetail.value))
  );
});

const handleNodeClick = (node) => {
  selectedCategory.value = node.label;
};
// 트리 노드 커스텀 렌더링 (수정 버튼 추가)
const renderContent = (h, { node, data }) => {
  return h('div', { class: 'tree-node' }, [
    h('span', node.label),
    h(ElButton, {
      type: 'text',
      icon: Edit,
      class: 'edit-btn',
      onClick: (event) => {
        event.stopPropagation();
        editNode(data);
      }
    })
  ]);
};

const editNode = (nodeData) => {
  ElMessage.info(`수정할 항목: ${nodeData.label}`);
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
  max-height: 600px; /* 높이 지정 (필요하면 조정 가능) */
  padding-right: 10px;
}
.mb-20{
  margin-bottom: 20px;
}
.mb-15{
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
    flex-wrap: wrap; /* 줄바꿈 허용 */
    /* 테이블과 차트 사이 여백 추가 */
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
<style>
.tree-list .tree-node{
  width: 100%;
  display: flex;
  align-items: center;
  color: #000;
  justify-content: space-between;
  font-weight: bold;
}
.tree-list .tree-node span{
  display: inline-block;
  max-width: 180px; /* 너비 지정 (조정 가능) */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.el-button+.el-button {
    margin-left: 0;
}
.custom-tree .el-tree-node__content {
  border-radius: 4px;
}
.custom-tree .el-tree-node__content:hover {
  background-color: #ECECEC !important;
}
.custom-tree .el-tree-node.is-current > .el-tree-node__content {
  background-color: #ECECEC !important;
}
.custom-tabs .el-tabs__item {
  color: #000 !important;
  font-weight: bold
}
.custom-tabs .el-tabs__item.is-active {
  color: #000 !important;
}
.custom-tabs .el-tabs__active-bar {
  background-color: #000 !important;
}
.black-button.el-button>span{
  color: #fff;
}
.el-card__body{
  padding: 10px 20px;
}
</style>
